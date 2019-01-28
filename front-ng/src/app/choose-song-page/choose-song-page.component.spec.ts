import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSongPageComponent } from './choose-song-page.component';

describe('ChooseSongPageComponent', () => {
  let component: ChooseSongPageComponent;
  let fixture: ComponentFixture<ChooseSongPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSongPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
