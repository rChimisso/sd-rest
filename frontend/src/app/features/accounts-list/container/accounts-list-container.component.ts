import {Component, OnDestroy} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Account} from 'src/app/core/models/account.interface';
import {clearData} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

import {getAccounts, getShowDeleted} from '../redux';
import {retrieveAccounts, updateShowDeleted} from '../redux/accounts-list.actions';

@Component({
  selector: 'accounts-list-container',
  templateUrl: './accounts-list-container.component.html',
  styleUrls: ['./accounts-list-container.component.scss']
})
export class AccountsListContainerComponent implements OnDestroy {
  public accounts$: Observable<Account[]> = this.appState$.select(getAccounts);

  public showDeleted$: Observable<boolean> = this.appState$.select(getShowDeleted);

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

  public updateShowDeleted(event: MatCheckboxChange) {
    this.appState$.dispatch(updateShowDeleted({showDeleted: event.checked}));
  }
}
