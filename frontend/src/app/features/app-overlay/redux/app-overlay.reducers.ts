import {HttpErrorResponse} from '@angular/common/http';
import {createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData} from 'src/app/core/redux/core.actions';
import {handleError, clearError, updateLoader} from 'src/app/features/app-overlay/redux/app-overlay.actions';

interface State {
  error: Nullable<HttpErrorResponse>;
  loading: boolean;
}

const INITIAL_STATE: State = {
  error: null,
  loading: false
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
  on(updateLoader, (state, {loading}) => ({
    ...state,
    loading
  }))
);

export {State, appOverlayReducer};
