import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RegistrationComponent } from './registration.component';
import { RegistrationService } from '../../api/todo/registration/registration.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let nativeElement;
  let apiRegistrationService;

  beforeEach(async(() => {
    apiRegistrationService = jasmine.createSpyObj('RegistrationService', ['doReg']);
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: RegistrationService, useValue: apiRegistrationService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email field should be invalid', () => {
    const email: HTMLInputElement = nativeElement.querySelector('#email');
    expect(email.validity.valid).toBeFalsy();
  });

  it('passwords should be the same data should be not send to server', async () => {
    component.form.setValue({
      login: 'asd',
      password: 'asdasdasd',
      passwordRepeat: 'asdas13123123121',
      email: 'asdasd@we.co',
      tag: '',
      name: 'asd',
      birthday: '',
      place: '',
      country: '',
      hatColor: ''
    });

    fixture.detectChanges();
    await fixture.whenStable();
    const regBtn: HTMLButtonElement = nativeElement.querySelector('#regBtn');
    regBtn.click();

    await fixture.whenStable();
    expect(component.message).toBe('Passwords are different!');
    expect(apiRegistrationService.doReg).toHaveBeenCalledTimes(0);
  });

  it('should send data to server', async () => {
    component.form.setValue({
      login: 'asd',
      password: 'asd123',
      passwordRepeat: 'asd123',
      email: 'asdasd@we.com',
      tag: '',
      name: 'asd',
      birthday: '',
      place: 'Zaporizhzhia',
      country: 'UA',
      hatColor: '#8fbaa6'
    });

    fixture.detectChanges();
    await fixture.whenStable();
    const regBtn: HTMLButtonElement = nativeElement.querySelector('#regBtn');
    regBtn.click();

    await fixture.whenStable();
    expect(apiRegistrationService.doReg).toHaveBeenCalledWith({
      login: 'asd',
      password: 'asd123',
      email: 'asdasd@we.com',
      tag: '',
      name: 'asd',
      birthday: '',
      place: 'Zaporizhzhia',
      country: 'UA',
      hatColor: '#8fbaa6'
    });
  });
});
