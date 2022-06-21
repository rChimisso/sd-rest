import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';

import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {HomeContainerComponent} from './container/home-container.component';

/**
 * Home Module.
 *
 * @export
 * @class HomeModule
 * @typedef {HomeModule}
 */
@NgModule({
  imports: [SharedModule],
  declarations: [HomeContainerComponent, MenuItemComponent]
})
export class HomeModule {}
