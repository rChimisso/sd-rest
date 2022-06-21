import {Component, Input} from '@angular/core';

import {MenuItem} from '../../models/menu-item.interface';

/**
 * Componente per la navigazione verso una pagina dell'applicazione.
 *
 * @export
 * @class MenuItemComponent
 * @typedef {MenuItemComponent}
 */
@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  /**
   * Item del menù per la navigazione verso una pagina dell'applicazione.
   *
   * @public
   * @type {!MenuItem}
   */
  @Input()
  public menuItem!: MenuItem;
}
