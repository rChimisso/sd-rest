import {createAction, props} from '@ngrx/store';

import {TransactionResponseBody} from 'src/app/core/models/responses/transaction-response-body.interface';

/**
 * Attiva la richiesta di Transazione.
 */
export const performTransaction = createAction(
  '[Transaction] Perform Transaction',
  props<{accountId: string; amount: number}>()
);

/**
 * Salva la risposta della richiesta di Transazione.
 */
export const saveTransactionResult = createAction(
  '[Transaction] Save Transaction Result',
  props<TransactionResponseBody>()
);
