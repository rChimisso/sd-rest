import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './app-overlay.reducers';

export const appOverlayFeatureKey = 'appOverlay';

export const selectAppOverlayState = createFeatureSelector<State>(appOverlayFeatureKey);

export const getError = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.error : null
);

export const getShowLoader = createSelector(
  selectAppOverlayState,
  (state: State) => state ? state.showLoader : true
);
