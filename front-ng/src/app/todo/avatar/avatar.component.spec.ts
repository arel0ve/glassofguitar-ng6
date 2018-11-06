import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { AvatarComponent } from './avatar.component';
import { AvatarService } from '../../api/todo/avatar/avatar.service';
import { of } from 'rxjs';

const avatarServiceStub = {
  getAvatar() {
    const avatar = 'wewewewewe';
    return of( avatar );
  },

  postAvatar(formData) {
    return of ('ok');
  }
};

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let apiAvatarService;

  beforeEach(async(() => {
    apiAvatarService = jasmine.createSpyObj('AvatarService', ['getAvatar', 'postAvatar']);

    TestBed.configureTestingModule({
      declarations: [ AvatarComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: AvatarService, useValue: avatarServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAvatar method', () => {
    const input = fixture.nativeElement.querySelector('input');
    const spy = spyOn(component, 'loadAvatar');
    input.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
