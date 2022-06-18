import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HomeContainerComponent} from './container/home-container.component';

@NgModule({
  imports: [BrowserAnimationsModule],
  declarations: [HomeContainerComponent]
})
export class HomeModule {}
