import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorDialogComponent} from './core/components/error-dialog/error-dialog.component';
import {getItalianPaginatorIntl} from './core/paginator-intls/italian-paginator-intl';
import {CoreEffects} from './core/redux/core.effects';
import {coreReducer} from './core/redux/core.reducers';
import {ApiService} from './core/services/api-service.service';
import {HomeModule} from './features/home/home.module';
import {RootModule} from './features/root/root.module';
import {TransferModule} from './features/transfer/transfer.module';

registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [AppComponent, ErrorDialogComponent],
  imports: [
    HomeModule,
    RootModule,
    TransferModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({core: coreReducer}),
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
