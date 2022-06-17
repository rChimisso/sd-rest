import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';

import {reducer, State} from './transfer.reducers';

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

export const getAccountIds = createSelector(
  getTransferState,
  (state: Nullable<State>) => state ? state.accountIds : []
);
