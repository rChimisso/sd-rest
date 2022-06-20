import {createAction, props} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';

export const retrieveAccounts = createAction(
  '[AccountsList] Retrieve Accounts',
  props<{showDeleted: boolean}>()
);

export const saveAccounts = createAction(
  '[AccountsList] Save Accounts',
  props<{accounts: Account[]}>()
);

export const updateShowDeleted = createAction(
  '[AccountsList] Update Show Deleted',
  props<{showDeleted: boolean}>()
);
