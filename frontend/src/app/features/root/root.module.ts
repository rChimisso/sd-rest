import {NgModule} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from 'src/app/shared/shared.module';

import {AccountFormComponent} from './components/account-form/account-form.component';
import {HistoryTableComponent} from './components/history-table/history-table.component';
import {RootContainerComponent} from './container/root-container.component';
import {rootFeatureKey} from './redux';
import {RootEffects} from './redux/root.effects';
import {rootReducer} from './redux/root.reducers';

/**
 * Root Module.
 *
 * @export
 * @class RootModule
 * @typedef {RootModule}
 */
@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    StoreModule.forFeature(rootFeatureKey, rootReducer),
    EffectsModule.forFeature([RootEffects])
  ],
  declarations: [
    RootContainerComponent,
    HistoryTableComponent,
    AccountFormComponent
  ]
})
export class RootModule {}
