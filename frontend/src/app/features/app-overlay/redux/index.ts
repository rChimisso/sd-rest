import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './app-overlay.reducers';

export const appOverlayFeatureKey = 'appOverlay';

export const selectAppOverlayState = createFeatureSelector<State>(appOverlayFeatureKey);

export const getError = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.error : null
);

export const getActiveCalls = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.activeCalls : 0
);

export const getShowLoader = createSelector(
  getActiveCalls,
  (state: number) => state > 0
);
