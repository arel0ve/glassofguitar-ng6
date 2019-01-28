import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appChordKeyboard]'
})
export class ChordKeyboardDirective {

  @HostListener('keydown', ['$event']) onKeyDown(e) {

    if (!window.guitar) {
      return;
    }

    if (e.code === 'Delete' || e.code === 'Backspace') {
      window.guitar.chord = null;
      window.guitar.drawChord();
    }

    if (e.code === 'KeyA' || e.code === 'KeyB' || e.code === 'KeyC'
        || e.code === 'KeyD' || e.code === 'KeyE' || e.code === 'KeyF' || e.code === 'KeyG') {
      let tempChord = e.code[3];

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

  @HostListener('keyup', ['$event.code']) onKeyUp(code) {
    if (code === 'KeyA' || code === 'KeyB' || code === 'KeyC'
        || code === 'KeyD' || code === 'KeyE' || code === 'KeyF' || code === 'KeyG') {
      window.guitar.chord = null;

      window.guitar.drawChord();
    }
  }
}
