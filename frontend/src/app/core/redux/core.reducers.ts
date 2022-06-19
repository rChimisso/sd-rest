import {createReducer, on} from '@ngrx/store';

import * as fromAppOverlay from 'src/app/features/app-overlay/redux/app-overlay.reducers';
import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

import {Nullable} from '../models/nullable.type';
import {clearData} from './core.actions';

interface State {
  root: Nullable<fromRoot.State>;
  transfer: Nullable<fromTransfer.State>;
  appOverlay: Nullable<fromAppOverlay.State>;
}

const INITIAL_STATE: State = {
  root: null,
  transfer: null,
  appOverlay: null
};

const coreReducer = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE)
);

export {State, coreReducer};
