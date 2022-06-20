import {HttpErrorResponse} from '@angular/common/http';
import {createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData} from 'src/app/core/redux/core.actions';
import {handleError, clearError, incrementActiveCalls, decrementActiveCalls} from 'src/app/features/app-overlay/redux/app-overlay.actions';

interface State {
  error: Nullable<HttpErrorResponse>;
  activeCalls: number;
}

const INITIAL_STATE: State = {
  error: null,
  activeCalls: 0
};

const appOverlayReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(handleError, (state, {error}) => ({
    ...state,
    error
  })),
  on(clearError, state => ({
    ...state,
    error: null
  })),
  on(incrementActiveCalls, state => ({
    ...state,
    activeCalls: state.activeCalls + 1
  })),
  on(decrementActiveCalls, state => ({
    ...state,
    activeCalls: state.activeCalls - 1
  }))
);

export {State, appOverlayReducer};
