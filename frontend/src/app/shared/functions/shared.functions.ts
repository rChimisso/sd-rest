import {ValidationErrors} from '@angular/forms';

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
