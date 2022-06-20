import {MovementActor} from '../movement-actor.interface';
import {MovementResponseBody} from './movement-response-body.interface';

/**
 * Dati della risposta di una richiesta di Trasferimento.
 *
 * @export
 * @interface TransferResponseBody
 * @typedef {TransferResponseBody}
 * @extends {MovementResponseBody<Messages>}
 */
export interface TransferResponseBody extends MovementResponseBody<Messages> {
  /**
   * MovementActor mittente.
   *
   * @type {MovementActor}
   */
  from: MovementActor;
  /**
   * MovementActor destinatario.
   *
   * @type {MovementActor}
   */
  to: MovementActor;
}

/**
 * Possibli messaggi da poter mostrare all'utente.
 *
 * @export
 * @enum {number}
 */
export enum Messages {
  SUCCESS = 'Trasferimento eseguito con successo.',
  FAILURE = 'Trasferimento non eseguito: il bilancio è inferiore a quanto richiesto.'
}
