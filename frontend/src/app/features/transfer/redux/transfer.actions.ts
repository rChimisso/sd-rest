import {createAction, props} from '@ngrx/store';

import {TransferResult} from '../models/transfer-result.interface';

export const performTransfer = createAction(
  '[Transfer] Perform Transfer',
  props<{from: string; to: string; amount: number}>()
);

export const saveTransferResult = createAction(
  '[Transfer] Save Transfer Result',
  props<TransferResult>()
);
