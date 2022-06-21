import {createAction, props} from '@ngrx/store';

import {Account} from 'src/app/core/models/account.interface';

/**
 * Attiva il recupero degli {@link Account}.
 */
export const retrieveAccounts = createAction(
  '[AccountsList] Retrieve Accounts',
  props<{showDeleted: boolean}>()
);

/**
 * Attiva il salvataggio della lista degli {@link Account}.
 */
export const saveAccounts = createAction(
  '[AccountsList] Save Accounts',
  props<{accounts: Account[]}>()
);

/**
 * Attiva l'aggiornamento della flag che indica se mostrare o meno gli {@link Account} eliminati.
 */
export const updateShowDeleted = createAction(
  '[AccountsList] Update Show Deleted',
  props<{showDeleted: boolean}>()
);
