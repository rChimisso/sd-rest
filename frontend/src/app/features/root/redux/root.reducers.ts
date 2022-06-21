import {ActionReducer, createReducer, on} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

import {saveAccount, saveHistory} from './root.actions';

/**
 * Stato.
 *
 * @interface State
 * @typedef {State}
 */
interface State {
  /**
   * Account di cui è stato richiesto lo storico.
   *
   * @type {Nullable<Account>}
   */
  account: Nullable<Account>;
  /**
   * Storico dei movimenti dell'Account.
   *
   * @type {Nullable<Movement[]>}
   */
  history: Nullable<Movement[]>;
  /**
   * Lista degli ID degli Account validi.
   *
   * @type {string[]}
   */
  accountIds: string[];
}

/**
 * Stato iniziale.
 *
 * @type {State}
 */
const INITIAL_STATE: State = {
  account: null,
  history: null,
  accountIds: []
};

/**
 * Reducer per l'intercettazione delle action e il salvataggio del loro payload sullo store.
 *
 * @type {ActionReducer<State>}
 */
const rootReducer: ActionReducer<State> = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccount, (state, {account}) => ({
    ...state,
    account
  })),
  on(saveHistory, (state, {history}) => ({
    ...state,
    history
  })),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  }))
);

export {State, rootReducer};
