import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from 'src/app/shared/shared.module';

import {BannerComponent} from './components/banner/banner.component';
import {ErrorDialogComponent} from './components/error-dialog/error-dialog.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AppOverlayContainerComponent} from './container/app-overlay-container.component';
import {appOverlayFeatureKey} from './redux';
import {appOverlayReducer} from './redux/app-overlay.reducers';

@NgModule({
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(appOverlayFeatureKey, appOverlayReducer),
    EffectsModule.forFeature([])
  ],
  declarations: [
    AppOverlayContainerComponent,
    LoaderComponent,
    BannerComponent,
    ErrorDialogComponent
  ],
  exports: [AppOverlayContainerComponent]
})
export class AppOverlayModule {}
