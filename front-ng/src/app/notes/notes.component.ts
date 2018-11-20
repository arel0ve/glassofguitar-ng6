import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Guitar } from '../guitar/guitar';
import { Animation } from '../animation';
import {ActivatedRoute, Router} from '@angular/router';
import {SaveSongService} from '../api/save-song/save-song.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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

  notes: string[];
  speed: number;
  numerator: number;
  denominator: number;
  barLength: number;
  selectedColumn: number;
  columns: HTMLDivElement[];
  successfulSaving: boolean;

  private unsubscribe: Subject<void> = new Subject();

  __delayBeforeNextNote: number;
  __timerPlay;

  constructor(
      private exitRouter: Router,
      private router: ActivatedRoute,
      private saveSongService: SaveSongService,
  ) { }

  ngOnInit() {
    this.guitar = window.guitar;
    this.notes = [];
    this.speed = 60;
    this.numerator = 2;
    this.denominator = 2;
    this.barLength = 16 / this.denominator * this.numerator;
    this.successfulSaving = null;
  }

  ngOnChanges() {
    if (this.song && this.song.notes) {
      this.notes = this.song.notes.notes;
      this.speed = this.song.notes.speed;
      this.numerator = +this.song.notes.size.slice(0, this.song.notes.size.indexOf('/'));
      this.denominator = +this.song.notes.size.slice(this.song.notes.size.indexOf('/') + 1);

      this.barLength = 16 / this.denominator * this.numerator;
      this.selectedColumn = 0;
      this.__delayBeforeNextNote = Math.round(60000 / (this.speed * 4));

      this.giveParams();
    }
  }

  ngAfterViewChecked() {
    this.columns = this.notesRef.nativeElement.querySelectorAll('.column');
  }

  addSong() {
    this.exitRouter.navigateByUrl(`/todo/addsong`);
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
    this.speed = +e.target.innerHTNL;
    this.saveAllNotes();
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
      this.saveAllNotes();
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
    this.saveAllNotes();
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
      this.songId = value.song || '0';
    });
  }

  saveAllNotes() {
    this.unsubscribe.next();
    this.giveParams();

      this.saveSongService.saveSong({
        user: this.user,
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

  stream() {
    const ws = new WebSocket('ws://localhost:40510');

    ws.onopen = e => {
      console.log(e);
      ws.send(this.user);
    };
  }
}
