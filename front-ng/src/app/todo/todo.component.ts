import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  mode: string;
  todoTitle: string;
  navigationSubscription;

  constructor(private route: ActivatedRoute, private exitRouter: Router) {
    this.navigationSubscription = this.exitRouter.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {  }

  initialiseInvites() {
    // @ts-ignore
    this.mode = this.route.url.value[1] ? this.route.url.value[1].path : 'login';
    switch (this.mode) {
      case 'login':
        this.todoTitle = 'Authorization';
        break;
      case 'logout':
        this.todoTitle = 'Quit';
        break;
      case 'reg':
        this.todoTitle = 'Registration';
        break;
      case 'verify':
        this.todoTitle = 'Verification';
        break;
      default:
        this.todoTitle = '';
        break;
    }
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
