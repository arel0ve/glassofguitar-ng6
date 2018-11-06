import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { AppComponent } from './app.component';
import { Sound } from './sound';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`isLogin should be false`, async(() => {
    expect(component['isLogin']).toEqual(false);
  }));

  it('window.guitar should be not undefined', async(() => {
    expect(window.guitar).not.toBeUndefined();
  }));

  // testing sound.ts
  describe('Sound', () => {

    let sound: Sound;

    beforeEach(() => {
      sound = new Sound('1.mp3');
      fixture.detectChanges();
    });

    it('should append sound element to document.body', () => {
      const lastEl = document.body.lastChild;
      expect(lastEl['tagName']).toBe('AUDIO');
    });

    it('should change sound volume', () => {
      sound.volume = .25;
      expect(sound.volume).toBe(.25);
    });

  });

});
