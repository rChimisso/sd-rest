import {HttpErrorResponse} from '@angular/common/http';
import {createReducer, on} from '@ngrx/store';

import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

import {Nullable} from '../models/nullable.type';
import {clearData, clearError, handleError, updateLoader} from './core.actions';

interface State {
  root: Nullable<fromRoot.State>;
  transfer: Nullable<fromTransfer.State>;
  error: Nullable<HttpErrorResponse>;
  showLoader: boolean;
}

const INITIAL_STATE: State = {
  root: null,
  transfer: null,
  error: null,
  showLoader: false
};

const coreReducer = createReducer(
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
  on(updateLoader, (state, {showLoader}) => ({
    ...state,
    showLoader
  }))
);

export {State, coreReducer};
