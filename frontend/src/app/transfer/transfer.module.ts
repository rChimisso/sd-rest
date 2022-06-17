import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {rootFeatureKey} from '../root/redux';
import {RootEffects} from '../root/redux/root.effects';
import {TransferComponent} from './container/transfer.component';
import {reducers} from './redux';

@NgModule({
  imports: [StoreModule.forFeature(rootFeatureKey, reducers), EffectsModule.forFeature([RootEffects])],
  declarations: [TransferComponent]
})
export class TransferModule {}
