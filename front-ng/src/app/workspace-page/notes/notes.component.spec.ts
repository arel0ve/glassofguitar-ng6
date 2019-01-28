import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NotesComponent } from './notes.component';
import { SaveSongService } from '../../api/save-song/save-song.service';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let nativeElement;
  let apiSaveSong;

  beforeEach(async(() => {
    apiSaveSong = jasmine.createSpyObj('SaveSongService', ['saveSong']);
    TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: SaveSongService, useValue: apiSaveSong
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    component.song = {
      id: '0',
      artist: 'Metallica',
      title: 'Unforgiven',
      author: 'Valerii',
      size: '2/2',
      speed: '60',
      notes: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change icon to pause and back when click play', async () => {
    const playBtn = nativeElement.querySelector('.play-menu').children[1];
    playBtn.click();
    await fixture.whenStable();
    expect(playBtn.innerText).toBe('pause_circle_filled');
    playBtn.click();
    await fixture.whenStable();
    expect(playBtn.innerText).toBe('play_circle_filled');
  });

  it('should select first column after click stop', async () => {
    const playBtn = nativeElement.querySelector('.play-menu').children[1];
    const stopBtn = nativeElement.querySelector('.play-menu').children[2];

    playBtn.click();
    stopBtn.click();

    expect(component.selectedColumn).toBe(0);
  });

  it('should create one notes bar = 16 notes columns', async () => {
    const plusBtn = nativeElement.querySelector('.plus-btn');
    plusBtn.click();
    await fixture.whenStable();
    expect(component.notes.length).toBe(16);
  });

});
