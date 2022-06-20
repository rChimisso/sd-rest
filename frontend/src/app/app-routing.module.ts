import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountsListContainerComponent} from './features/accounts-list/container/accounts-list-container.component';
import {HomeContainerComponent} from './features/home/container/home-container.component';
import {RootContainerComponent} from './features/root/container/root-container.component';
import {TransactionContainerComponent} from './features/transaction/container/transaction-container.component';
import {TransferContainerComponent} from './features/transfer/container/transfer-container.component';

/**
 * Routes dell'applicazione.
 *
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '',
    component: RootContainerComponent
  },
  {
    path: 'accounts-list',
    component: AccountsListContainerComponent
  },
  {
    path: 'transfer',
    component: TransferContainerComponent
  },
  {
    path: 'transaction',
    component: TransactionContainerComponent
  },
  {
    path: 'home',
    component: HomeContainerComponent
  },
  {
    path: '**',
    component: HomeContainerComponent
  }
];

/**
 * App Routing Module.
 *
 * @export
 * @class AppRoutingModule
 * @typedef {AppRoutingModule}
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
