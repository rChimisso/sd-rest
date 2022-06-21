import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MenuItem} from '../models/menu-item.interface';

/**
 * Contenitore del menù per la navigazione.
 *
 * @export
 * @class HomeContainerComponent
 * @typedef {HomeContainerComponent}
 */
@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
  /**
   * Items del menù per la navigazione.
   *
   * @public
   * @readonly
   * @type {MenuItem[]}
   */
  public readonly menuItems: MenuItem[] = [
    {
      route: 'accounts-list',
      label: 'Elenco Account'
    },
    {
      route: '',
      label: 'Storico Account'
    },
    {
      route: 'transfer',
      label: 'Trasferimento'
    },
    {
      route: 'transaction',
      label: 'Transazione'
    }
  ];

  /**
   * @constructor
   * @public
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  public constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  /**
   * Naviga verso la `route` specificata.
   *
   * @public
   * @param {string} route
   */
  public navigate(route: string) {
    this.router.navigate([route], {relativeTo: this.route.root});
  }
}
