import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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
      public translate: TranslateService,
      private location: Location,
      private router: Router
  ) { }

  ngOnInit() {
    Window.prototype.guitar = null;
    this.isLogin = false;

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.browserLang = this.translate.getBrowserLang();
    this.translate.use(this.browserLang.match(/en|ru/) ? this.browserLang : 'en');

    document.addEventListener('backbutton', (e) => {
      try {
        if (window.history.length > 1) {
          this.location.back();
        } else {
          this.router.initialNavigation();
        }
      } catch (err) {
        console.log('backButton', err);
        this.router.initialNavigation();
      }
      e.preventDefault();
    });
  }
}
