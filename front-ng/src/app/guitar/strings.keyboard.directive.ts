import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appStringsKeyboard]'
})
export class StringsKeyboardDirective {

  @HostListener('keydown', ['$event.keyCode']) onKeyDown(keyCode) {

    if (!window.guitar) {
      return;
    }

    switch (keyCode) {
      case 80:
        window.guitar.playString(0);
        break;
      case 79:
        window.guitar.playString(1);
        break;
      case 73:
        window.guitar.playString(2);
        break;
      case 190:
        window.guitar.playString(3);
        break;
      case 188:
        window.guitar.playString(4);
        break;
      case 77:
        window.guitar.playString(5);
        break;

      case 38:
        window.guitar.playStringsAll({mode: 'up'});
        break;
      case 40:
        window.guitar.playStringsAll({mode: 'down'});
        break;

      case 32:
        window.guitar.muteStringsAll();
        break;

    }
  }
}
