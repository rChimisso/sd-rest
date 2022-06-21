import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractFormContainer} from 'src/app/abstract/containers/abstract-form-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';
import {State} from 'src/app/core/redux/core.reducers';

import {FormInterface} from '../models/form.interface';
import {getAccount, getSortedHistory} from '../redux';
import {retrieveAccountHistory} from '../redux/root.actions';

/**
 * Container per la richiesta di visualizzazione dello storico di un {@link Account}.
 *
 * @export
 * @class RootContainerComponent
 * @typedef {RootContainerComponent}
 * @extends {AbstractFormContainer<FormInterface>}
 */
@Component({
  selector: 'root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.scss']
})
export class RootContainerComponent extends AbstractFormContainer<FormInterface> {
  /**
   * Observable dell'{@link Account} selezionato.
   *
   * @public
   * @type {Observable<Nullable<Account>>}
   */
  public account$: Observable<Nullable<Account>> = this.appState$.select(getAccount);

  /**
   * Observable dello storico dell'{@link Account} selezionato.
   *
   * @public
   * @type {Observable<Nullable<Movement[]>>}
   */
  public history$: Observable<Nullable<Movement[]>> = this.appState$.select(getSortedHistory);

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   */
  public constructor(appState$: Store<State>) {
    super(
      'root',
      new FormGroup({
        accountId: new FormControl(
          '',
          {
            nonNullable: true,
            validators: UUID_VALIDATORS
          }
        )
      }),
      appState$
    );
  }

  /**
   * Dispatcha la action {@link retrieveAccountHistory} per attivare la richiesta di recupero dello storico.
   *
   * @public
   */
  public research() {
    this.appState$.dispatch(retrieveAccountHistory({accountId: this.formGroup.controls.accountId.value}));
  }
}
