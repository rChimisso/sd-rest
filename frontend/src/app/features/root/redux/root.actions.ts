import {createAction, props} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';

/**
 * Attiva il salvataggio dell'{@link Account}.
 */
export const saveAccount = createAction(
  '[Root] Save Account',
  props<{account: Account}>()
);

/**
 * Attiva il recupero dello storico di un {@link Account}.
 */
export const retrieveAccountHistory = createAction(
  '[Root] Retrieve Account Data',
  props<{accountId: string}>()
);

/**
 * Attiva il salvataggio dello storico.
 */
export const saveHistory = createAction(
  '[Root] Save History',
  props<{history: Movement[]}>()
);
