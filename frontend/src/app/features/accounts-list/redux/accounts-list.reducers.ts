import {createReducer, on} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {clearData} from 'src/app/core/redux/core.actions';

import {saveAccounts, updateShowDeleted} from './accounts-list.actions';

interface State {
  accounts: Account[];
  showDeleted: boolean;
}

const INITIAL_STATE: State = {
  accounts: [],
  showDeleted: false
};

const accountListReducer = createReducer(
  INITIAL_STATE,
  on(clearData, state => ({
    ...INITIAL_STATE,
    showDeleted: state.showDeleted
  })),
  on(saveAccounts, (state, {accounts}) => ({
    ...state,
    accounts
  })),
  on(updateShowDeleted, (state, {showDeleted}) => ({
    ...state,
    showDeleted
  }))
);

export {State, accountListReducer};
