import {ValidationErrors} from '@angular/forms';

import {Movement} from 'src/app/core/models/movement.type';
import {Transfer} from 'src/app/core/models/transfer.interface';

export function getUUIDErrorMessage({required, pattern, minlength, maxlength}: ValidationErrors) {
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

export function isTransfer(movement: Movement): movement is Transfer {
  return !!('sender' in movement && movement.sender && 'recipient' in movement && movement.recipient);
}

export function filterAccountIds(value: string, accountIds: string[]) {
  return value ? accountIds.filter(accountId => accountId.toLowerCase().includes(value.toLowerCase())) : [...accountIds];
}
