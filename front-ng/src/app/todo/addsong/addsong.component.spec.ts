import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import { AddsongComponent } from './addsong.component';
import { AddSongService } from '../../api/todo/add-song/add-song.service';

describe('AddsongComponent', () => {
  let component: AddsongComponent;
  let fixture: ComponentFixture<AddsongComponent>;
  let apiAddSongService;

  beforeEach(async(() => {
    apiAddSongService = jasmine.createSpyObj('AddSongService', ['addSong']);
    TestBed.configureTestingModule({
      declarations: [ AddsongComponent ],
      providers: [
        {
          provide: AddSongService, useValue: apiAddSongService
        }
      ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send data to server', async () => {
    const sendBtn = fixture.nativeElement.querySelector('#createBtn');

    component.form.setValue({
      artist: 'Metallica',
      song: 'Unforgiven'
    });
    fixture.detectChanges();

    sendBtn.click();
    await fixture.whenStable();

    expect(apiAddSongService.addSong).toHaveBeenCalledWith({
      artist: 'Metallica',
      song: 'Unforgiven'
    });
  });
});
