import {createReducer, on} from '@ngrx/store';

import {clearData, saveAccountIds} from 'src/app/core/redux/core.actions';

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

export {State, transferReducer};
