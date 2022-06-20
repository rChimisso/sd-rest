import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';

import {State} from './accounts-list.reducers';

export const accountListFeatureKey = 'accountList';

export const selectRootState = createFeatureSelector<State>(accountListFeatureKey);

export const getAccounts = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.accounts : []
);

export const getShowDeleted = createSelector(
  selectRootState,
  (state: Nullable<State>) => state ? state.showDeleted : false
);
