import {createAction, props} from '@ngrx/store';

import {TransferResponseBody} from 'src/app/core/models/responses/transfer-response-body.interface';

/**
 * Attiva la richiesta di Trasferimento.
 */
export const performTransfer = createAction(
  '[Transfer] Perform Transfer',
  props<{from: string; to: string; amount: number}>()
);

/**
 * Attiva il salvataggio della risposta della richiesta di Trasferimento.
 */
export const saveTransferResult = createAction(
  '[Transfer] Save Transfer Result',
  props<TransferResponseBody>()
);
