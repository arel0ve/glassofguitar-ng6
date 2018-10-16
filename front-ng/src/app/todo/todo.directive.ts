import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAdTodo]',
})
export class TodoDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
