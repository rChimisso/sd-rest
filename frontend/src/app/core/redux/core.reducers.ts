import * as fromRoot from 'src/app/features/root/redux/root.reducers';
import * as fromTransfer from 'src/app/features/transfer/redux/transfer.reducers';

export interface State {
  root: fromRoot.State;
  transfer: fromTransfer.State;
}
