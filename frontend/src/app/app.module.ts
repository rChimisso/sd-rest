import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {getItalianPaginatorIntl} from './core/paginator-intls/italian-paginator-intl';
import {CoreEffects} from './core/redux/core.effects';
import {ApiService} from './core/services/api-service.service';
import {HomeModule} from './features/home/home.module';
import {RootModule} from './features/root/root.module';
import {TransferModule} from './features/transfer/transfer.module';

registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    RootModule,
    TransferModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([CoreEffects]),
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
    {
      provide: MatPaginatorIntl,
      useValue: getItalianPaginatorIntl()
    },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
