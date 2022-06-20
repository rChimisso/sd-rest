import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from 'src/environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {getItalianPaginatorIntl} from './core/paginator-intls/italian-paginator-intl';
import {CoreEffects} from './core/redux/core.effects';
import {ApiService} from './core/services/api-service.service';
import {AccountListModule} from './features/accounts-list/accounts-list.module';
import {AppOverlayModule} from './features/app-overlay/app-overlay.module';
import {HomeModule} from './features/home/home.module';
import {RootModule} from './features/root/root.module';
import {TransactionModule} from './features/transaction/transaction.module';
import {TransferModule} from './features/transfer/transfer.module';

registerLocaleData(localeIt, 'it-IT');

/**
 * App Module.
 *
 * @export
 * @class AppModule
 * @typedef {AppModule}
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    RootModule,
    TransferModule,
    TransactionModule,
    AccountListModule,
    AppOverlayModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([CoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
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
