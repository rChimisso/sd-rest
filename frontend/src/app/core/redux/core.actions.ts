import {createAction, props} from '@ngrx/store';

/**
 * Attiva la pulizia dello store.
 */
export const clearData = createAction('[Core] Clear Data');

/**
 * Attiva il recupero degli accountIds.
 */
export const retrieveAccountIds = createAction('[Core] Retrieve Account Ids');

/**
 * Attiva il salvataggio sullo store degli accountIds.
 */
export const saveAccountIds = createAction(
  '[Core] Save Account Ids',
  props<{accountIds: string[]}>()
);
