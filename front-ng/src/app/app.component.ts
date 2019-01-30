import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public browserLang: string;

  constructor(
      public translate: TranslateService,
      private location: Location,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    Window.prototype.guitar = null;

    this.authService.checkAuth();

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.browserLang = this.translate.getBrowserLang();
    this.translate.use(this.browserLang.match(/en|ru/) ? this.browserLang : 'en');

    if (this.authService.isAuth.value === true) {
      setTimeout(() => {
        this.authService.updateToken();
      }, 1000);
    }

    setInterval(() => {
      this.authService.updateToken();
    }, 1000000);

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
