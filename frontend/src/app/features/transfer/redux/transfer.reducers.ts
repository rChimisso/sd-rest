import {createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

import {TransferResult} from '../models/transfer-result.interface';
import {saveTransferResult} from './transfer.actions';

interface State {
  accountIds: string[];
  transferResult: Nullable<TransferResult>;
}

const INITIAL_STATE: State = {
  accountIds: [],
  transferResult: null
};

const transferReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  })),
  on(saveTransferResult, (state, transferResult) => ({
    ...state,
    transferResult
  }))
);

export {State, transferReducer};
