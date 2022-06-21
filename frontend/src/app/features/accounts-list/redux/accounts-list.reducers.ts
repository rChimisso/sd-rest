import {ActionReducer, createReducer, on} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {clearData} from 'src/app/core/redux/core.actions';

import {saveAccounts, updateShowDeleted} from './accounts-list.actions';

/**
 * Stato.
 *
 * @interface State
 * @typedef {State}
 */
interface State {
  /**
   * Lista degli {@link Account} da mostrare.
   *
   * @type {Account[]}
   */
  accounts: Account[];
  /**
   * Se mostrare anche gli {@link Account} eliminati.
   *
   * @type {boolean}
   */
  showDeleted: boolean;
}

/**
 * Stato iniziale.
 *
 * @type {State}
 */
const INITIAL_STATE: State = {
  accounts: [],
  showDeleted: false
};

/**
 * Reducer per l'intercettazione delle action e il salvataggio del loro payload sullo store.
 *
 * @type {ActionReducer<State>}
 */
const accountsListReducer: ActionReducer<State> = createReducer(
  INITIAL_STATE,
  on(clearData, state => ({
    ...INITIAL_STATE,
    showDeleted: state.showDeleted
  })),
  on(saveAccounts, (state, {accounts}) => ({
    ...state,
    accounts
  })),
  on(updateShowDeleted, (state, {showDeleted}) => ({
    ...state,
    showDeleted
  }))
);

export {State, accountsListReducer};
