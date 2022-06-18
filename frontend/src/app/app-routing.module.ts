import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RootComponent} from './features/root/container/root.component';
import {TransferComponent} from './features/transfer/container/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
