import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appCapoKeyboard]'
})
export class CapoKeyboardDirective {

  @HostListener('keydown', ['$event.code']) onKeyDown(code) {

    if (!window.guitar) {
      return;
    }

    if (code === 'Backquote') {
      window.guitar.capo = 0;
    } else if (code === 'Digit0') {
      window.guitar.capo = 10;
    } else if (code.includes('Digit')) {
      window.guitar.capo = +code[5];
    } else if (code === 'Minus') {
      window.guitar.capo = 11;
    } else if (code === 'Equal') {
      window.guitar.capo = 12;
    }

    if (code.includes('Digit') ||
      code === 'Backquote' ||
      code === 'Minus' ||
      code === 'Equal') {
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
