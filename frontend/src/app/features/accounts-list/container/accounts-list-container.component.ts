import {Component} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractSmartContainer} from 'src/app/abstract/containers/abstract-smart-container';
import {Account} from 'src/app/core/models/account.interface';
import {State} from 'src/app/core/redux/core.reducers';

import {getAccounts, getShowDeleted} from '../redux';
import {retrieveAccounts, updateShowDeleted} from '../redux/accounts-list.actions';

/**
 * Container per la visualizzazione degli {@link Account}.
 *
 * @export
 * @class AccountsListContainerComponent
 * @typedef {AccountsListContainerComponent}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'accounts-list-container',
  templateUrl: './accounts-list-container.component.html',
  styleUrls: ['./accounts-list-container.component.scss']
})
export class AccountsListContainerComponent extends AbstractSmartContainer {
  /**
   * Observable della lista degli {@link Account}.
   *
   * @public
   * @type {Observable<Account[]>}
   */
  public accounts$: Observable<Account[]> = this.appState$.select(getAccounts);

  /**
   * Observable della flag che indica se mostrare gli {@link Account} eliminati.
   *
   * @public
   * @type {Observable<boolean>}
   */
  public showDeleted$: Observable<boolean> = this.appState$.select(getShowDeleted);

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   */
  public constructor(appState$: Store<State>) {
    super(appState$);
    this.showDeleted$.pipe(this.takeUntil()).subscribe(showDeleted => this.appState$.dispatch(retrieveAccounts({showDeleted})));
  }

  /**
   * Dispatcha la action {@link updateShowDeleted} per attivare l'aggiornamento della flag per mostrare o meno gli {@link Account} eliminati.
   *
   * @public
   * @param {MatCheckboxChange} event
   */
  public updateShowDeleted(event: MatCheckboxChange) {
    this.appState$.dispatch(updateShowDeleted({showDeleted: event.checked}));
  }
}
