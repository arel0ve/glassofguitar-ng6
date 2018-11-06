import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appStringsKeyboard]'
})
export class StringsKeyboardDirective {

  @HostListener('keydown', ['$event.code']) onKeyDown(code) {

    if (!window.guitar) {
      return;
    }

    switch (code) {
      case 'KeyP':
        window.guitar.playString(0);
        break;
      case 'KeyO':
        window.guitar.playString(1);
        break;
      case 'KeyI':
        window.guitar.playString(2);
        break;
      case 'Period':
        window.guitar.playString(3);
        break;
      case 'Comma':
        window.guitar.playString(4);
        break;
      case 'KeyM':
        window.guitar.playString(5);
        break;

      case 'ArrowUp':
        window.guitar.playStringsAll({mode: 'up'});
        break;
      case 'ArrowDown':
        window.guitar.playStringsAll({mode: 'down'});
        break;

      case 'Space':
        window.guitar.muteStringsAll();
        break;

    }
  }
}
