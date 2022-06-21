import {Component, OnDestroy} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Account} from 'src/app/core/models/account.interface';
import {clearData} from 'src/app/core/redux/core.actions';
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
export class AccountsListContainerComponent implements OnDestroy {
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
  public constructor(private readonly appState$: Store<State>) {
    this.showDeleted$.subscribe(showDeleted => this.appState$.dispatch(retrieveAccounts({showDeleted})));
  }

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce la distruzione del componente.
   *
   * @public
   */
  public ngOnDestroy() {
    this.appState$.dispatch(clearData());
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
