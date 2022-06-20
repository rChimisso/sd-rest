import {ActionReducer, createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {TransactionResponseBody} from 'src/app/core/models/responses/transaction-response-body.interface';
import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

import {saveTransactionResult} from './transaction.actions';

/**
 * Stato.
 *
 * @interface State
 * @typedef {State}
 */
interface State {
  /**
   * Lista degli account id.
   *
   * @type {string[]}
   */
  accountIds: string[];
  /**
   * Risposta della richiesta di Transazione.
   *
   * @type {Nullable<TransactionResponseBody>}
   */
  transactionResult: Nullable<TransactionResponseBody>;
}

/**
 * Stato iniziale.
 *
 * @type {State}
 */
const INITIAL_STATE: State = {
  accountIds: [],
  transactionResult: null
};

/**
 * Reducer per l'intercettazione delle action e il salvataggio del loro payload sullo store.
 *
 * @type {ActionReducer<State>}
 */
const transactionReducer: ActionReducer<State> = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  })),
  on(saveTransactionResult, (state, transactionResult) => ({
    ...state,
    transactionResult
  }))
);

export {State, transactionReducer};
