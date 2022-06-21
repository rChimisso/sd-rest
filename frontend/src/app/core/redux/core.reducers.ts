import * as fromAccountsList from 'src/app/features/accounts-list/redux/accounts-list.reducers';
import * as fromAppOverlay from 'src/app/features/app-overlay/redux/app-overlay.reducers';
import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

import {Nullable} from '../models/nullable.type';

/**
 * Stato.
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  /**
   * Stato per root.
   *
   * @type {Nullable<fromRoot.State>}
   */
  root: Nullable<fromRoot.State>;
  /**
   * Stato per accountsList.
   *
   * @type {Nullable<fromAccountsList.State>}
   */
  accountsList: Nullable<fromAccountsList.State>;
  /**
   * Stato per transfer.
   *
   * @type {Nullable<fromTransfer.State>}
   */
  transfer: Nullable<fromTransfer.State>;
  /**
   * Stato per transaction.
   *
   * @type {Nullable<fromTransfer.State>}
   */
  transaction: Nullable<fromTransfer.State>;
  /**
   * Stato per appOverlay.
   *
   * @type {Nullable<fromAppOverlay.State>}
   */
  appOverlay: Nullable<fromAppOverlay.State>;
}
