import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';

import {State} from './root.reducers';

export interface RootState {
  root: State;
}

export const rootFeatureKey = 'root';

export const selectRootState = createFeatureSelector<State>(rootFeatureKey);

export const getAccount = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.account : null
);

export const getHistory = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.history : null
);

export const getSortedHistory = createSelector(
  getHistory,
  (state: Nullable<Movement[]>) => state ? [...state].sort((a, b) => a.date.getTime() - b.date.getTime()) : null
);
