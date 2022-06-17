import {createAction, props} from '@ngrx/store';

export const retrieveAccountIds = createAction('[Root] Retrieve Account Ids');

export const saveAccountIds = createAction(
  '[Transfer] Save Account Ids',
  props<{accountIds: string[]}>()
);

export const performTranfer = createAction(
  '[Transfer] Perform Transfer',
  props<{from: string; to: string; amount: number}>()
);

export const saveTransferResult = createAction(
  '[Transfer] Save Transfer Result',
  props<{isError: boolean; message: string}>()
);
