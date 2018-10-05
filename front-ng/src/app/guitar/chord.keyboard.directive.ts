import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appChordKeyboard]'
})
export class ChordKeyboardDirective {

  @HostListener('keydown', ['$event']) onKeyDown(e) {

    if (!window.guitar) {
      return;
    }

    if (e.keyCode === 8 || e.keyCode === 46) {
      window.guitar.chord = null;
      window.guitar.drawChord();
    }

    if (e.keyCode > 64 && e.keyCode < 72) {
      let tempChord = String.fromCharCode(e.keyCode);

      if (e.shiftKey) {
        tempChord = tempChord + 'd';
      }

      if (e.ctrlKey || e.metaKey) {
        tempChord = tempChord + 'm';
      }

      if (e.altKey) {
        tempChord = tempChord + '7';
      }

      window.guitar.chord = tempChord;
      window.guitar.drawChord();
    }
  }

  @HostListener('keyup', ['$event.keyCode']) onKeyUp(keyCode) {
    if (keyCode > 64 && keyCode < 72) {
      window.guitar.chord = null;

      window.guitar.drawChord();
    }
  }
}
