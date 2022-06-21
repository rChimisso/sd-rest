import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './app-overlay.reducers';

/**
 * Feature key per lo store.
 *
 * @type {"appOverlay"}
 */
export const appOverlayFeatureKey = 'appOverlay';

/**
 * Selettore dello {@link State Stato} dello store.
 */
export const selectAppOverlayState = createFeatureSelector<State>(appOverlayFeatureKey);

/**
 * Selettore dell'Eventuale Errore HTTP dell'ultima chiamata HTTP effettuata.
 */
export const getError = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.error : null
);

/**
 * Selettore del numero di chiamate HTTP attualmente in pending.
 */
export const getPendingCalls = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.pendingCalls : 0
);

/**
 * Selettore del flag che indica se mostrare o meno il loader.
 */
export const getShowLoader = createSelector(
  getPendingCalls,
  (state: number) => state > 0
);
