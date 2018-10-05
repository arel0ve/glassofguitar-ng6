import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Guitar} from './guitar';

@Directive({
  selector: '[appGuitarMouse]'
})
export class GuitarMouseDirective {

  @ViewChild('guitar') guitarRef: ElementRef;

  @HostListener('mousedown', ['$event.offsetX', '$event.offsetY', '$event.button']) onMouseDown(x, y, btn) {
    const downInfo = window.guitar.getStringAndChordByXY(x, y);

    if (downInfo.mode.indexOf('none') !== -1) {
      return;
    }

    if (downInfo.mode === 'string') {
      window.guitar.playString(downInfo.string);
    }

    if (downInfo.mode === 'chord') {
      switch (btn) {
        case 0:
          window.guitar.standFingerOnBoard(downInfo.string, downInfo.chord);
          break;
        case 1:
          window.guitar.playString(downInfo.string, '000000');
          break;
        case 2:
          window.guitar.standFingerOnBoard(downInfo.string, downInfo.chord, true);
          const c = window.guitar.capo;
          let tempChord = `${c}${c}${c}${c}${c}${c}`;
          tempChord = tempChord.slice(0, downInfo.string) + Guitar.getLetterByNum(downInfo.chord - c) +
            tempChord.slice(downInfo.string + 1, 6);
          window.guitar.playString(downInfo.string, tempChord);
          break;
      }
    }

    this.guitarRef.nativeElement.focus();

  }

  @HostListener('mousemove', ['$event.offsetX', '$event.offsetY', '$event.buttons', '$event.movementY']) onMouseMove(x, y, btns, m) {
    if (!btns || Math.abs(m) < window.guitar.guitarHeight / 30) {
      return;
    }

    const downInfo = window.guitar.getStringAndChordByXY(x, y);

    if (downInfo.mode === 'string') {
      window.guitar.playString(downInfo.string);
    }

    this.guitarRef.nativeElement.focus();
  }

  @HostListener('wheel', ['$event.offsetX', '$event.offsetY', '$event.deltaY']) onWheel(x, y, delta) {
    const wheelInfo = window.guitar.getStringAndChordByXY(x, y);

    switch (wheelInfo.mode) {

      case 'up-none':
        window.guitar.volume -= Math.round(delta / 20);
        break;

      case 'down-none':
        window.guitar.speed -= Math.round(delta / 20)
        break;

      case 'string':
        if (delta > 0) {
          window.guitar.playStringsAll({mode: 'down'});
        } else {
          window.guitar.playStringsAll({mode: 'up'});
        }
        break;

      case 'chord':
        window.guitar.capo = wheelInfo.chord;
        window.guitar.drawStrings()
          .then(() => {
            return window.guitar.drawCapo();
          })
          .then(() => {
            window.guitar.drawChord();
          });
        break;
    }
  }

}
