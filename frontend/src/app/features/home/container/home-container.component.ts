import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MenuItem} from '../models/menu-item.interface';

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
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

  public constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  public navigate(route: string) {
    this.router.navigate([route], {relativeTo: this.route.root});
  }
}
