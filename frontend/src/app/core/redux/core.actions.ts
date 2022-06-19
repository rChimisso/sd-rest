import {createAction, props} from '@ngrx/store';

export const clearData = createAction('[Core] Clear Data');

export const retrieveAccountIds = createAction('[Core] Retrieve Account Ids');

export const saveAccountIds = createAction(
  '[Core] Save Account Ids',
  props<{accountIds: string[]}>()
);
