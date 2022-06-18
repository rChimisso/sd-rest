import {Component, Input} from '@angular/core';

import {MenuItem} from '../../models/menu-item.interface';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input()
  public menuItem!: MenuItem;
}
