import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Guitar } from './guitar';

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {

  @ViewChild('guitar') guitarRef: ElementRef;
  @ViewChild('guitarCanv') guitarCanvRef: ElementRef;
  @ViewChild('stringsCanv') stringsCanvRef: ElementRef;
  @ViewChild('infoCanv') infoCanvRef: ElementRef;

  guitar: Guitar;

  constructor() { }

  ngOnInit() {
    this.guitar = new Guitar(this.guitarCanvRef.nativeElement, this.stringsCanvRef.nativeElement, this.infoCanvRef.nativeElement);

    this.guitar.drawGuitar();
    this.guitarRef.nativeElement.focus();

    window.guitar = this.guitar;

    window.addEventListener('resize', () => {
      this.guitar.drawGuitar();
    });
  }
}
