import {MovementActor} from '../movement-actor.interface';
import {MovementResponseBody} from './movement-response-body.interface';

/**
 * Dati della risposta di una richiesta di Transazione.
 *
 * @export
 * @interface TransactionResponseBody
 * @typedef {TransactionResponseBody}
 * @extends {MovementResponseBody<Messages>}
 */
export interface TransactionResponseBody extends MovementResponseBody<Messages> {
  /**
   * MovementActor.
   *
   * @type {MovementActor}
   */
  movementActor: MovementActor;
}

/**
 * Possibli messaggi da poter mostrare all'utente.
 *
 * @export
 * @enum {string}
 */
export enum Messages {
  SUCCESS = 'Transazione eseguita con successo.',
  FAILURE = 'Transazione non eseguita: il bilancio è inferiore a quanto richiesto.'
}
