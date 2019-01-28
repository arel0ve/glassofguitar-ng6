import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventDefaultKeyboard]'
})
export class PreventDefaultKeyboardDirective {

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
  }

  @HostListener('keypress', ['$event']) onKeyPress(e) {
    e.preventDefault();
  }

  @HostListener('keyup', ['$event']) onKeyUp(e) {
    e.preventDefault();
  }
}
