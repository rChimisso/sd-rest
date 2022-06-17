import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import {reducer, State} from './root.reducers';

export interface TransferState {
  transfer: State;
}

export const reducers: ActionReducerMap<TransferState> = {transfer: reducer};

export const transferFeatureKey = 'transfer';

export const selectTransferState = createFeatureSelector<TransferState>(transferFeatureKey);

export const getTransferState = createSelector(
  selectTransferState,
  (state: TransferState) => state ? state.transfer : null
);
