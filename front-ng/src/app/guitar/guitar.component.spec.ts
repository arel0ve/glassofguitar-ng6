import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarComponent } from './guitar.component';
import { Guitar } from './guitar';

describe('Guitar Component', () => {
  let fixture: ComponentFixture<GuitarComponent>;
  let component: GuitarComponent;
  let guitarElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ GuitarComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuitarComponent);
    component = fixture.componentInstance;
    guitarElement = fixture.nativeElement.querySelector('.wrapper');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Guitar', () => {

    it('should draw and hide capo', () => {
      component.guitar.capo = 5;
      fixture.detectChanges();
      expect(component.guitar.capo).toBe(5);

      component.guitar.capo = 5;
      fixture.detectChanges();
      expect(component.guitar.capo).toBe(0);
    });

    it('should set max and min speed', () => {
      component.guitar.speed = 100500;
      expect(component.guitar.speed).toBe(100);

      component.guitar.speed = -100500;
      expect(component.guitar.speed).toBe(0);
    });

    it('should set max and min volume', () => {
      component.guitar.volume = 100500;
      expect(component.guitar.volume).toBe(100);

      component.guitar.volume = -100500;
      expect(component.guitar.volume).toBe(0);
    });

    it('translating between capo numbers and charCodes', () => {
      expect(Guitar.getLetterByNum(9)).toBe('9');
      expect(Guitar.getLetterByNum(12)).toBe('c');
      expect(Guitar.getLetterByNum(21)).toBe('~');

      expect(Guitar.getNumByLetter('2')).toBe(2);
      expect(Guitar.getNumByLetter('f')).toBe(15);
      expect(Guitar.getNumByLetter('~')).toBe(21);
    });

  });

});
