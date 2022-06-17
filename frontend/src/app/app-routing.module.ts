import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RootComponent} from './root/container/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
