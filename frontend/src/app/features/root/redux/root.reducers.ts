import {createReducer, on} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

import {saveAccount, saveHistory} from './root.actions';

interface State {
  account: Account | null;
  history: Movement[] | null;
  accountIds: string[];
}

const INITIAL_STATE: State = {
  account: null,
  history: null,
  accountIds: []
};

const rootReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccount, (state, {account}) => ({
    ...state,
    account
  })),
  on(saveHistory, (state, {history}) => ({
    ...state,
    history
  })),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  }))
);

export {State, rootReducer};
