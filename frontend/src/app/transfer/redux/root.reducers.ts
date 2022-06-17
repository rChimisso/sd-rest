import {Action, createReducer, on} from '@ngrx/store';

import {clearData} from 'src/app/core/redux/core.actions';

interface State {}

const INITIAL_STATE: State = {};

const transferReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE)
);

function reducer(state: State = INITIAL_STATE, action: Action): State {
  return transferReducer(state, action);
}

export {State, reducer};
