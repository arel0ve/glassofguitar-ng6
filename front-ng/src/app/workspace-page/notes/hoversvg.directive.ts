import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appHoversvg]'
})
export class HoversvgDirective implements OnInit {

  animationOnProgress: boolean;

  @HostBinding('style.stroke-width') strokeWidth = 2.5;

  @HostBinding('style.stroke') stroke = 'rgb(255, 255, 255)';

  constructor() { }

  ngOnInit() {
    this.animationOnProgress = false;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.animationOnProgress) {
      return;
    }

    this.animationOnProgress = true;
    const self = this;
    let down = true;
    let strokeRed = 255;

    window.requestAnimationFrame(function twist() {
      self.strokeWidth = down ? self.strokeWidth - .2 : self.strokeWidth + .2;
      strokeRed = down ? strokeRed - 20 : strokeRed + 20;
      self.stroke = `rgb(${strokeRed}, 255, 255)`;

      if (self.strokeWidth <= 0.2) {
        down = false;
      }

      if (self.strokeWidth <= 3) {
        window.requestAnimationFrame(twist);
      } else {
        self.strokeWidth = 3;
        strokeRed = 255;
        self.animationOnProgress = false;
      }
    });
  }
}
