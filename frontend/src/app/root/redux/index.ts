import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';

import {reducer, State} from './root.reducers';

export interface RootState {
  root: State;
}

export const reducers: ActionReducerMap<RootState> = {root: reducer};

export const rootFeatureKey = 'root';

export const selectRootState = createFeatureSelector<RootState>(rootFeatureKey);

export const getRootState = createSelector(
  selectRootState,
  (state: RootState) => state ? state.root : null
);

export const getAccount = createSelector(
  getRootState,
  (state: Nullable<State>) => state ? state.account : null
);

export const getHistory = createSelector(
  getRootState,
  (state: Nullable<State>) => state ? state.history : null
);

export const getSortedHistory = createSelector(
  getHistory,
  (state: Nullable<Movement[]>) => state ? [...state].sort((a, b) => a.date.getTime() - b.date.getTime()) : null
);

export const getAccountIds = createSelector(
  getRootState,
  (state: Nullable<State>) => state ? state.accountIds : []
);
