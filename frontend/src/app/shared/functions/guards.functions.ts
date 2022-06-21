import {Movement} from 'src/app/core/models/movement.type';
import {Transfer} from 'src/app/core/models/transfer.interface';

/**
 * Controlla se il {@link Movement movimento} passato è un {@link Transfer trasferimento}.
 *
 * @export
 * @param {Movement} movement movimento.
 * @returns {movement is Transfer} valore del controllo.
 */
export function isTransfer(movement: Movement): movement is Transfer {
  return !!('sender' in movement && movement.sender && 'recipient' in movement && movement.recipient);
}
