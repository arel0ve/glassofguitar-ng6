import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { ServiceModule } from './api/service.module';
import { environment } from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient, location: Location) {
  // Make sure translation location complies with APP_BASE_HREF
  return new TranslateHttpLoader(http, location.prepareExternalUrl('assets/i18n/'), '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, Location]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
