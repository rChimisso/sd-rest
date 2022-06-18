import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {HomeContainerComponent} from './container/home-container.component';

@NgModule({
  imports: [BrowserAnimationsModule],
  declarations: [HomeContainerComponent, MenuItemComponent]
})
export class HomeModule {}
