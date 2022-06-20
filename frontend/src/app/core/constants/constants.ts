import {ValidatorFn, Validators} from '@angular/forms';

/**
 * Lunghezza di uno Short UUID.
 *
 * @type {20}
 */
export const SHORT_UUID_LENGTH = 20;
/**
 * Lunghezza di uno Standard UUID.
 *
 * @type {32}
 */
export const STANDARD_UUID_LENGTH = 32;
/**
 * Regex sottoforma di stringa per la validazione di uno UUID.
 *
 * @type {"[a-fA-F0-9]+"}
 */
export const UUID_REGEX = '[a-fA-F0-9]+';

/**
 * {@link Validators Validatori} per un FormControl contenente uno UUID.
 *
 * @type {ValidatorFn[]}
 */
export const UUID_VALIDATORS: ValidatorFn[] = [
  Validators.minLength(SHORT_UUID_LENGTH),
  Validators.maxLength(SHORT_UUID_LENGTH),
  Validators.pattern(UUID_REGEX),
  Validators.required
];

/**
 * Tasti speciali per l'inserimento in un input.
 *
 * @type {string[]}
 */
export const specialKeys: string[] = [
  'Backspace',
  'Tab',
  'End',
  'Home',
  'ArrowLeft',
  'ArrowRight',
  'Del',
  'Delete'
];
