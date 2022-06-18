import {createFeatureSelector} from '@ngrx/store';

import {State} from './transfer.reducers';

export interface TransferState {
  transfer: State;
}

export const transferFeatureKey = 'transfer';

export const selectTransferState = createFeatureSelector<State>(transferFeatureKey);
