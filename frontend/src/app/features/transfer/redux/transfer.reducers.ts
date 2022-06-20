import {ActionReducer, createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {TransferResponseBody} from 'src/app/core/models/responses/transfer-response-body.interface';
import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

import {saveTransferResult} from './transfer.actions';

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
   * Risposta della richiesta di Trasferimento.
   *
   * @type {Nullable<TransferResponseBody>}
   */
  transferResult: Nullable<TransferResponseBody>;
}

/**
 * Stato iniziale.
 *
 * @type {State}
 */
const INITIAL_STATE: State = {
  accountIds: [],
  transferResult: null
};

/**
 * Reducer per l'intercettazione delle action e il salvataggio del loro payload sullo store.
 *
 * @type {ActionReducer<State>}
 */
const transferReducer: ActionReducer<State> = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  })),
  on(saveTransferResult, (state, transferResult) => ({
    ...state,
    transferResult
  }))
);

export {State, transferReducer};
