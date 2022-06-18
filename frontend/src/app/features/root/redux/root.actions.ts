import {createAction, props} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';

export const retrieveAccountData = createAction(
  '[Root] Retrieve Account Data',
  props<{accountId: string}>()
);

export const saveAccount = createAction(
  '[Root] Save Account',
  props<{account: Account}>()
);

export const saveHistory = createAction(
  '[Root] Save History',
  props<{history: Movement[]}>()
);
