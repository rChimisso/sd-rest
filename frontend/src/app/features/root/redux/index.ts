import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';

import {State} from './root.reducers';

/**
 * Feature key per lo store.
 *
 * @type {"root"}
 */
export const rootFeatureKey = 'root';

/**
 * Selettore dello {@link State Stato} dello store.
 */
export const selectRootState = createFeatureSelector<State>(rootFeatureKey);

/**
 * Selettore dell'Account di cui è stato richiesto lo storico.
 */
export const getAccount = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.account : null
);

/**
 * Selettore dello storico dei movimenti dell'Account.
 */
export const getHistory = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.history : null
);

/**
 * Selettore dello storico dei movimenti dell'Account ordinati in ordine decrescente, ovvero dal più recente al più vecchio.
 */
export const getSortedHistory = createSelector(
  getHistory,
  (state: Nullable<Movement[]>) => state ? [...state].sort((a, b) => a.date.getTime() - b.date.getTime()) : null
);
