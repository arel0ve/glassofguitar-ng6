import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WorkspacePageComponent } from './workspace-page.component';
import { GetUserService } from '../api/get-user/get-user.service';

describe('WorkspacePageComponent', () => {
  let component: WorkspacePageComponent;
  let fixture: ComponentFixture<WorkspacePageComponent>;
  let apiGetUser;

  beforeEach(async(() => {
    apiGetUser = jasmine.createSpyObj('GetUserService', ['getUser']);
    TestBed.configureTestingModule({
      declarations: [ WorkspacePageComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: GetUserService, useValue: apiGetUser
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default color should be #123546', () => {
    expect(component.user.hatColor).toBe('#123456');
  });
});
