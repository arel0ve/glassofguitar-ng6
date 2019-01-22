import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin: boolean;

  public browserLang: string;

  constructor(
      public translate: TranslateService
  ) { }

  ngOnInit() {
    Window.prototype.guitar = null;
    this.isLogin = false;

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.browserLang = this.translate.getBrowserLang();
    this.translate.use(this.browserLang.match(/en|ru/) ? this.browserLang : 'en');

    window.addEventListener('deviceorientation', e => {
      console.log(e);
    }, true);
  }
}
