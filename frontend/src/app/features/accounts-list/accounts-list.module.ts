import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from 'src/app/shared/shared.module';

import {AccountsTableComponent} from './components/accounts-table/accounts-table.component';
import {AccountsListContainerComponent} from './container/accounts-list-container.component';
import {accountListFeatureKey} from './redux';
import {AccountsListEffects} from './redux/accounts-list.effects';
import {accountsListReducer} from './redux/accounts-list.reducers';

/**
 * Account List Module.
 *
 * @export
 * @class AccountListModule
 * @typedef {AccountListModule}
 */
@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    StoreModule.forFeature(accountListFeatureKey, accountsListReducer),
    EffectsModule.forFeature([AccountsListEffects])
  ],
  declarations: [AccountsListContainerComponent, AccountsTableComponent]
})
export class AccountListModule {}
