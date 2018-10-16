import {Component, OnDestroy, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegistrationComponent} from './registration/registration.component';
import {VerifyComponent} from './verify/verify.component';
import {AddsongComponent} from './addsong/addsong.component';
import {InfoComponent} from './info/info.component';
import {TodoDirective} from './todo.directive';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  mode: string;
  todoTitle: string;
  navigationSubscription;
  currentComponent: any;
  @ViewChild(TodoDirective) adHost: TodoDirective;

  constructor(
      private route: ActivatedRoute,
      private exitRouter: Router,
      private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.navigationSubscription = this.exitRouter.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {  }

  initialiseInvites() {
    this.route.params.subscribe(value => {
      this.mode = value.mode;
      switch (this.mode) {
        case 'login':
          this.todoTitle = 'Authorization';
          this.currentComponent = LoginComponent;
          break;
        case 'logout':
          this.todoTitle = 'Quit';
          this.currentComponent = LogoutComponent;
          break;
        case 'reg':
          this.todoTitle = 'Registration';
          this.currentComponent = RegistrationComponent;
          break;
        case 'verify':
          this.todoTitle = 'Verification';
          this.currentComponent = VerifyComponent;
          break;
        case 'addsong':
          this.todoTitle = 'New Song';
          this.currentComponent = AddsongComponent;
          break;
        case 'info':
          this.todoTitle = 'How to play';
          this.currentComponent = InfoComponent;
          break;
        default:
          this.todoTitle = '';
          break;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentComponent);
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(componentFactory);
    });
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  close() {
    this.exitRouter.navigateByUrl('/');
  }

}
