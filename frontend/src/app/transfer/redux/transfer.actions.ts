import {createAction, props} from '@ngrx/store';

export const retrieveAccountIds = createAction('[Root] Retrieve Account Ids');

export const saveAccountIds = createAction(
  '[Transfer] Save Account Ids',
  props<{accountIds: string[]}>()
);
