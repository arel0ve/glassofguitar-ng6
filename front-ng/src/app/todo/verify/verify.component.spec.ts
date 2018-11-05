import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { VerifyComponent } from './verify.component';
import { VerifyService } from '../../api/todo/verify/verify.service';

describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;
  let nativeElement;
  let apiVerifyService;

  beforeEach(async(() => {
    apiVerifyService = jasmine.createSpyObj('VerifyService', ['doVerify']);
    TestBed.configureTestingModule({
      declarations: [ VerifyComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: VerifyService, useValue: apiVerifyService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send data to server', async () => {
    component.form.setValue({
      login: 'asd',
      password: 'asd123',
      verifyCode: 'd6f3'
    });
    fixture.detectChanges();

    const verifyBtn = nativeElement.querySelector('#verifyBtn');
    verifyBtn.click();
    await fixture.whenStable();
    expect(apiVerifyService.doVerify).toHaveBeenCalledWith({
      login: 'asd',
      password: 'asd123',
      verifyCode: 'd6f3'
    });
  });
});
