import {ValidationErrors} from '@angular/forms';

import {Movement} from 'src/app/core/models/movement.type';
import {Transfer} from 'src/app/core/models/transfer.interface';

/**
 * Restituisce il messaggio di errore da mostrare per l'inserimento di un UUID non valido.
 *
 * @export
 * @param {ValidationErrors} errori di validazione.
 * @returns {string} messaggio di errore.
 */
export function getUUIDErrorMessage({required, pattern, minlength, maxlength}: ValidationErrors): string {
  if (required) {
    return 'L\'ID è richiesto.';
  }
  if (minlength || maxlength) {
    const lengthError = minlength || maxlength;
    return `L'ID inserito è lungo ${lengthError.actualLength} invece di ${lengthError.requiredLength}.`;
  }
  if (pattern) {
    return 'L\'ID deve essere composto unicamente da numeri e caratteri alfabetici tra la A e la F.';
  }
  return '';
}

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

/**
 * Filtra gli `accountIds` in base al valore passato.
 *
 * @export
 * @param {string} value valore su cui filtrare gli id.
 * @param {string[]} accountIds accountIds da filtrare.
 * @returns {string[]} accountIds filtrati.
 */
export function filterAccountIds(value: string, accountIds: string[]): string[] {
  return value ? accountIds.filter(accountId => accountId.toLowerCase().includes(value.toLowerCase())) : [...accountIds];
}
