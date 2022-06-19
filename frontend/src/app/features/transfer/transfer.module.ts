import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from 'src/app/shared/shared.module';

import {TransferFormComponent} from './components/transfer-form/transfer-form.component';
import {TransferResultDialogComponent} from './components/transfer-result-dialog/transfer-result-dialog.component';
import {TransferContainerComponent} from './container/transfer-container.component';
import {transferFeatureKey} from './redux';
import {TransferEffects} from './redux/transfer.effects';
import {transferReducer} from './redux/transfer.reducers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(transferFeatureKey, transferReducer),
    EffectsModule.forFeature([TransferEffects])
  ],
  declarations: [
    TransferContainerComponent,
    TransferResultDialogComponent,
    TransferFormComponent
  ]
})
export class TransferModule {}
