import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginService } from '../../api/todo/login/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiLoginService;
  let nativeElement;

  beforeEach(async(() => {
    apiLoginService = jasmine.createSpyObj('LoginService', ['doLogin']);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: LoginService, useValue: apiLoginService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be untouched', async () => {
    expect(component.form.touched).toBeFalsy();
  });

  it('password should be wrong', async () => {
    const passField: HTMLInputElement = nativeElement.querySelector('#password');
    passField.value = 'asd';

    await fixture.whenStable();
    expect(passField.validity.valid).toBeFalsy();
  });

  it('password should be right', async () => {
    const passField: HTMLInputElement = nativeElement.querySelector('#password');
    passField.value = 'asd123';

    await fixture.whenStable();
    expect(passField.validity.valid).toBeTruthy();
  });

  it('should send data to server', async () => {
    component.form.setValue({
      login: 'arel0ve',
      password: 'asd123'
    });
    fixture.detectChanges();

    const loginBtn = nativeElement.querySelector('#authoBtn');
    loginBtn.click();
    await fixture.whenStable();

    expect(apiLoginService.doLogin).toHaveBeenCalledWith({
      login: 'arel0ve',
      password: 'asd123'
    });
  });
});
