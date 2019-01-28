import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventDefaultMouse]'
})
export class PreventDefaultMouseDirective {

  @HostListener('mousedown', ['$event']) onMouseDown(e) {
    e.preventDefault();
  }

  @HostListener('mouseup', ['$event']) onMouseUp(e) {
    e.preventDefault();
  }

  @HostListener('click', ['$event']) onClick(e) {
    e.preventDefault();
  }

  @HostListener('contextmenu', ['$event']) onContextMenu(e) {
    e.preventDefault();
  }

  @HostListener('dblclick', ['$event']) onDblClick(e) {
    e.preventDefault();
  }

  @HostListener('wheel', ['$event']) onWheel(e) {
    e.preventDefault();
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e) {
    e.preventDefault();
  }
}
