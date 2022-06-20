import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from 'src/app/shared/shared.module';

import {TransactionFormComponent} from './components/transaction-form/transaction-form.component';
import {TransactionResultDialogComponent} from './components/transaction-result-dialog/transaction-result-dialog.component';
import {TransactionContainerComponent} from './container/transaction-container.component';
import {transactionFeatureKey} from './redux';
import {TransactionEffects} from './redux/transaction.effects';
import {transactionReducer} from './redux/transaction.reducers';

/**
 * Transaction Module.
 *
 * @export
 * @class TransactionModule
 * @typedef {TransactionModule}
 */
@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(transactionFeatureKey, transactionReducer),
    EffectsModule.forFeature([TransactionEffects])
  ],
  declarations: [
    TransactionContainerComponent,
    TransactionFormComponent,
    TransactionResultDialogComponent
  ]
})
export class TransactionModule {}
