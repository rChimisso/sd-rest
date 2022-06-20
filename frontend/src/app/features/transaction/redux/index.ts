import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './transaction.reducers';

/**
 * Feature key per lo store.
 *
 * @type {"transaction"}
 */
export const transactionFeatureKey = 'transaction';

/**
 * Selettore dello {@link State Stato} dello store.
 */
export const selectTransactionState = createFeatureSelector<State>(transactionFeatureKey);

/**
 * Selettore della risposta della richiesta di Transazione.
 */
export const getTransactionResult = createSelector(
  selectTransactionState,
  (state: State) => state ? state.transactionResult : null
);
