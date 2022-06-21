import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';

/**
 * Attiva la gestione di un errore HTTP.
 */
export const handleError = createAction(
  '[AppOverlay] Handle Error',
  props<{ error: HttpErrorResponse }>()
);

/**
 * Attiva la pulizia del precedente errore HTTP.
 */
export const clearError = createAction('[AppOverlay] Clear Error');

/**
 * Attiva l'aumento del contatore delle chiamate HTTP in pending.
 */
export const incrementPendingCalls = createAction('[AppOverlay] Increment Pending Calls');

/**
 * Attiva la diminuzione del contatore delle chiamate HTTP in pending.
 */
export const decrementPendingCalls = createAction('[AppOverlay] Decrement Pending Calls');
