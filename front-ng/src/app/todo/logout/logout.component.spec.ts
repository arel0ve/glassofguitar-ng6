import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoutComponent } from './logout.component';
import { LogoutService } from '../../api/logout/logout.service';


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let nativeElement;
  let apiLogoutService;

  beforeEach(async(() => {
    apiLogoutService = jasmine.createSpyObj('LogoutService', ['doLogout']);
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: LogoutService, useValue: apiLogoutService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be question message after created', () => {
    expect(component.message).toBe('Are you sure want to quit from your account?');
  });

  it('should send data to server', async () => {
    const logoutBtn = nativeElement.querySelector('#logout');
    logoutBtn.click();
    await fixture.whenStable();
    expect(apiLogoutService.doLogout).toHaveBeenCalled();
  });
});
