import {Component, OnDestroy, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AddsongComponent} from './addsong/addsong.component';
import {InfoComponent} from './info/info.component';
import {TodoDirective} from './todo.directive';
import {AvatarComponent} from './avatar/avatar.component';
import {Location} from '@angular/common';
import {UsernameComponent} from './username/username.component';

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
      private location: Location,
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

  ngOnInit() {
    if (window['cordova'] && window['cordova'].platformId === 'android' && window['StatusBar']) {
      window['StatusBar'].backgroundColorByHexString('#362A31');
    }
    if (window['cordova']) {
      screen.orientation.lock('portrait-primary');
    }
  }

  initialiseInvites() {
    this.route.params.subscribe(value => {
      this.mode = value.mode;
      switch (this.mode) {
        case 'login':
          this.todoTitle = 'authorization';
          this.currentComponent = LoginComponent;
          break;
        case 'username':
          this.todoTitle = 'username';
          this.currentComponent = UsernameComponent;
          break;
        case 'logout':
          this.todoTitle = 'quit';
          this.currentComponent = LogoutComponent;
          break;
        case 'addsong':
          this.todoTitle = 'create';
          this.currentComponent = AddsongComponent;
          break;
        case 'info':
          this.todoTitle = 'how_to_play';
          this.currentComponent = InfoComponent;
          break;
        case 'avatar':
          this.todoTitle = 'avatar';
          this.currentComponent = AvatarComponent;
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
    if (window['cordova']) {
      screen.orientation.unlock();
    }
  }

  close() {
    if (this.todoTitle === 'Registration') {
      this.location.back();
      this.location.back();
    } else {
      this.location.back();
    }
  }

}
