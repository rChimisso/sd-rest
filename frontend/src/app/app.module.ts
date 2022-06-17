import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './core/services/api-service.service';
import {RootModule} from './root/root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RootModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
