import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';

import {State} from './accounts-list.reducers';

/**
 * Feature key per lo store.
 *
 * @type {"accountList"}
 */
export const accountListFeatureKey = 'accountList';

/**
 * Selettore dello {@link State Stato} dello store.
 */
export const selectRootState = createFeatureSelector<State>(accountListFeatureKey);

/**
 * Selettore degli Account da mostrare.
 */
export const getAccounts = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.accounts : []
);

/**
 * Selettore del flag che indica se mostrare anche gli Account eliminati.
 */
export const getShowDeleted = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.showDeleted : false
);
