import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State} from './transfer.reducers';

export const transferFeatureKey = 'transfer';

export const selectTransferState = createFeatureSelector<State>(transferFeatureKey);

export const getTransferResult = createSelector(
  selectTransferState,
  (state: State) => state ? state.transferResult : null
);
