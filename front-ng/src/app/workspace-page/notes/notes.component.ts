import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Guitar } from '../guitar/guitar';
import { Animation } from '../../animation';
import {ActivatedRoute, Router} from '@angular/router';
import {SongApiService} from '../../api/song-api/song-api.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FullscreenService} from '../../services/fullscreen/fullscreen.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() song;

  @ViewChild('notesBlock') notesRef: ElementRef;
  @ViewChild('playBtn') playRef: ElementRef;

  guitar: Guitar;
  user: string;
  songId: string;
  imgSrc: string;

  notes: string[];
  speed: number;
  numerator: number;
  denominator: number;
  barLength: number;
  selectedColumn: number;
  columns: HTMLDivElement[];
  successfulSaving: boolean;
  fullscreen: boolean;

  ws: WebSocket;

  private unsubscribe: Subject<void> = new Subject();

  private __delayBeforeNextNote: number;
  private __timerPlay;

  constructor(
      private exitRouter: Router,
      private router: ActivatedRoute,
      private songApiService: SongApiService,
      private fullscreenService: FullscreenService
  ) { }

  ngOnInit() {
    this.guitar = window.guitar;
    this.notes = [];
    this.speed = 60;
    this.numerator = 2;
    this.denominator = 2;
    this.barLength = 16 / this.denominator * this.numerator;
    this.successfulSaving = null;
    this.imgSrc = 'assets/icons/main-logo.png';

    this.fullscreen = this.fullscreenService.guitar$.value;
    this.fullscreenService.notes$.subscribe(isFullscreen => {
      this.fullscreen = isFullscreen;
      if (this.fullscreen) {
        if (window['cordova'] && window['cordova'].platformId === 'android' && window['AndroidFullScreen']) {
          // window['StatusBar'].hide();
          window['AndroidFullScreen'].isImmersiveModeSupported(
              () => {
                window['AndroidFullScreen'].immersiveMode();
              },
              () => {
                window['AndroidFullScreen'].leanMode();
              }
          );
        }
      } else {
        if (window['cordova'] && window['cordova'].platformId === 'android' && window['AndroidFullScreen']) {
          // window['StatusBar'].show();
          window['AndroidFullScreen'].showSystemUI();
        }
      }
      setTimeout(() => {
        this.guitar.drawGuitar();
      }, 15);
    });
  }

  ngOnChanges() {
    console.log(this.song);
    if (this.song && this.song.notes) {
      this.songId = this.song._id;
      this.notes = this.song.notes;
      this.speed = this.song.speed;
      this.numerator = +this.song.size.slice(0, this.song.size.indexOf('/'));
      this.denominator = +this.song.size.slice(this.song.size.indexOf('/') + 1);

      this.barLength = 16 / this.denominator * this.numerator;
      this.selectedColumn = 0;
      this.__delayBeforeNextNote = Math.round(60000 / (this.speed * 4));

      if (this.song.author.photoUrl !== null) {
        this.imgSrc = this.song.author.photoUrl ? this.song.author.photoUrl : 'assets/photos/no-photo.png';
      }

      this.giveParams();
    }
  }

  ngAfterViewChecked() {
    this.columns = this.notesRef.nativeElement.querySelectorAll('.column');
  }

  addSong() {
    this.exitRouter.navigate([`/todo/addsong`]);
  }

  play() {
    const playBtn = this.playRef.nativeElement;
    let tempNote: string;

    if (playBtn.innerHTML.indexOf('pause') !== -1) {
      clearInterval(this.__timerPlay);
      playBtn.innerHTML = 'play_circle_filled';
      this.__timerPlay = null;
      return;
    }

    playBtn.innerHTML = 'pause_circle_filled';

    tempNote = this.notes[this.selectedColumn];
    tempNote = tempNote[5] + tempNote[4] + tempNote[3] + tempNote[2] + tempNote[1] + tempNote[0];

    window.guitar.playStringsByNotes(tempNote);

    this.__timerPlay = setInterval(() => {
      this.selectedColumn++;
      if (this.selectedColumn < this.notes.length) {
        if (this.selectedColumn % this.barLength === 0) {
          window.guitar.clearFingerBoard();
        }

        tempNote = this.notes[this.selectedColumn];
        tempNote = tempNote[5] + tempNote[4] + tempNote[3] + tempNote[2] + tempNote[1] + tempNote[0];

        window.guitar.playStringsByNotes(tempNote);
        this.selectColumn();

      } else {
        clearInterval(this.__timerPlay);
        playBtn.innerHTML = 'play_circle_filled';
        this.selectedColumn = 0;
        this.__timerPlay = null;
        this.defaultSelection();
      }
    }, this.__delayBeforeNextNote);
  }

  stop() {
    const playBtn = this.playRef.nativeElement;
    clearInterval(this.__timerPlay);
    playBtn.innerHTML = 'play_circle_filled';
    this.selectedColumn = 0;
    this.__timerPlay = null;
    this.defaultSelection();
  }

  plusColumns() {
    for (let i = 0; i < this.barLength; i++) {
      this.notes.push('------');
    }

    setTimeout(() => {
      this.columns = this.notesRef.nativeElement.querySelectorAll('.column');
    }, 0);
  }

  changeSpeed(e) {
    this.speed = +e.target.innerHTML;
  }

  changeSize(e, isNumerator: boolean) {
    if (isNumerator) {
      this.numerator = +e.target.innerHTML;
    } else {
      this.denominator = +e.target.innerHTML;
    }
    this.barLength = 16 / this.denominator * this.numerator;

    while (this.notes.length % this.barLength !== 0) {
      this.notes.push('------');
    }

    setTimeout(() => {
      this.columns = this.notesRef.nativeElement.querySelectorAll('.column');
    }, 0);
  }

  selectionClick(num: number) {
    this.selectedColumn = num;
    this.defaultSelection();
  }

  changeNote(e, i: number, j: number) {
    let value = e.target.value;
    e.target.value = '';
    value = value === '' || value === '-' ? '-' : Guitar.getLetterByNum(+value);
    this.notes[i] = this.notes[i].slice(0, j) + value + this.notes[i].slice(j + 1);
  }

  private defaultSelection(num = this.selectedColumn) {
    setTimeout(() => {
      for (const column of this.columns) {
        column.style.background = 'rgba(0, 0, 0, .0)';
      }
      window.guitar.clearFingerBoard();
      this.selectColumn(num);
    }, this.__delayBeforeNextNote + 1);

  }

  private selectColumn(number = this.selectedColumn) {
    Animation.animate({
      duration: this.__delayBeforeNextNote,
      timing: Animation.linearTiming,
      draw: (progress) => {
        const step = Math.round(progress * 100);

        if (number > 0) {
          this.columns[number - 1].style.background =
            `linear-gradient(to right, rgba(0, 0, 0, .0) ${step}%, rgba(27, 127, 42, .3))`;
        }

        this.columns[number].style.background =
          `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(27, 127, 42, .6) ${step}%, rgba(27, 127, 42, .3))`;

        if (number < this.columns.length) {
          this.columns[number].style.background =
            `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(0, 0, 0, .0) ${step}%)`;
        }
      },
      complete: () => {
        if (number > 0) {
          this.columns[number - 1].style.background = 'rgba(0, 0, 0, .0)';
          if (number === this.columns.length - 1) {
            this.columns[number].style.background = 'rgba(0, 0, 0, .0)';
            this.selectColumn(0);
          }
        }
      }
    });
  }

  giveParams() {
    this.router.params.pipe(takeUntil(this.unsubscribe)).subscribe(value => {
      this.user = value.user || '0';
      window.guitar.user = this.user;
    });
  }

  saveAllNotes() {
    if (this.songId) {
      this.songApiService.saveSong({
        songId: this.songId,
        speed: this.speed,
        size: `${this.numerator}/${this.denominator}`,
        notes: this.notes
      }).subscribe(
          () => this.successfulSaving = true,
          err => {
            this.successfulSaving = false;
            console.log(err.error);
          }
      );
    }
  }

  streamStart() {
    this.ws = new WebSocket('ws://localhost:40510');

    this.ws.onopen = () => {
      this.ws.send(
          JSON.stringify({
            mode: 'stream',
            user: this.user
          })
      );
      window.guitar.ws = {
        type: 'play',
        ws: this.ws
      };
    };
  }

  streamPlay() {
    this.ws = new WebSocket('ws://localhost:40510');

    this.ws.onopen = () => {
      this.ws.send(
          JSON.stringify({
            mode: 'watch',
            user: this.user
          })
      );
      window.guitar.ws = {
        type: 'listen',
        ws: this.ws
      };
    };
  }

  streamStop() {
    this.ws.close(1000, JSON.stringify({user: this.user}));
    this.ws = null;
    window.guitar.ws = {
      type: '',
      ws: this.ws
    };
  }

  showHelp() {
    this.exitRouter.navigate(['/todo/info']);
  }

  goFullscreenGuitar() {
    this.fullscreenService.guitar$.next(true);
  }

  goFullscreenNotes() {
    this.fullscreenService.notes$.next(true);
  }

  exitFullscreenNotes() {
    this.fullscreenService.notes$.next(false);
  }

  showArtistSongs() {
    this.exitRouter.navigate([`songs/${this.song.artist}`]);
  }

  showSongVersions() {
    this.exitRouter.navigate([`songs/${this.song.artist}/${this.song.title}`]);
  }

  showAuthor() {
    if (this.song.author.login) {
      this.exitRouter.navigate([`user/${this.song.author.login}`]);
    }
  }
}
