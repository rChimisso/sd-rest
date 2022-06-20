import * as fromAppOverlay from 'src/app/features/app-overlay/redux/app-overlay.reducers';
import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

import {Nullable} from '../models/nullable.type';

export interface State {
  root: Nullable<fromRoot.State>;
  transfer: Nullable<fromTransfer.State>;
  transaction: Nullable<fromTransfer.State>;
  appOverlay: Nullable<fromAppOverlay.State>;
}
