import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appCapoKeyboard]'
})
export class CapoKeyboardDirective {

  @HostListener('keydown', ['$event.keyCode']) onKeyDown(keyCode) {

    if (!window.guitar) {
      return;
    }

    if (keyCode === 192 || keyCode === 96) {
      window.guitar.capo = 0;
    } else if (keyCode > 48 && keyCode < 58) {
      window.guitar.capo = keyCode - 48;
    } else if (keyCode === 48) {
      window.guitar.capo = 10;
    } else if (keyCode === 45 || keyCode === 173 || keyCode === 189) {
      window.guitar.capo = 11;
    } else if (keyCode === 61 || keyCode === 187) {
      window.guitar.capo = 12;
    }

    if (keyCode > 47 && keyCode < 58 ||
      keyCode === 192 || keyCode === 96 ||
      keyCode === 45 || keyCode === 173 || keyCode === 189 ||
      keyCode === 61 || keyCode === 187) {
      window.guitar.drawStrings()
        .then(() => {
          return window.guitar.drawCapo();
        })
        .then(() => {
          window.guitar.drawChord();
        });
    }
  }
}
