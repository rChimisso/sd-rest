import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './core/services/api-service.service';
import {RootModule} from './root/root.module';

registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [AppComponent],
  imports: [
    RootModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'it-IT'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR'
    },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
