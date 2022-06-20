import * as fromAppOverlay from 'src/app/features/app-overlay/redux/app-overlay.reducers';
import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

import {Nullable} from '../models/nullable.type';

/**
 * 
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  /**
   * 
   *
   * @type {Nullable<fromRoot.State>}
   */
  root: Nullable<fromRoot.State>;
  /**
   * 
   *
   * @type {Nullable<fromTransfer.State>}
   */
  transfer: Nullable<fromTransfer.State>;
  /**
   * 
   *
   * @type {Nullable<fromTransfer.State>}
   */
  transaction: Nullable<fromTransfer.State>;
  /**
   * 
   *
   * @type {Nullable<fromAppOverlay.State>}
   */
  appOverlay: Nullable<fromAppOverlay.State>;
}
