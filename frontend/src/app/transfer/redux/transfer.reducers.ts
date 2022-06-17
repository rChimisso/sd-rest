import {Action, createReducer, on} from '@ngrx/store';

import {clearData} from 'src/app/core/redux/core.actions';

import {saveAccountIds} from './transfer.actions';

interface State {
  accountIds: string[];
}

const INITIAL_STATE: State = {accountIds: []};

const transferReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(saveAccountIds, (state, {accountIds}) => ({
    ...state,
    accountIds
  }))
);

function reducer(state: State = INITIAL_STATE, action: Action): State {
  return transferReducer(state, action);
}

export {State, reducer};
