import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './transfer.reducers';

/**
 * Feature key per lo store.
 *
 * @type {"transfer"}
 */
export const transferFeatureKey = 'transfer';

/**
 * Selettore dello {@link State Stato} dello store.
 */
export const selectTransferState = createFeatureSelector<State>(transferFeatureKey);

/**
 * Selettore della risposta della richiesta di Trasferimento.
 */
export const getTransferResult = createSelector(
  selectTransferState,
  (state: State) => state ? state.transferResult : null
);
