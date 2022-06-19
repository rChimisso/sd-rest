import {Validators} from '@angular/forms';

export const SHORT_UUID_LENGTH = 20;
export const STANDARD_UUID_LENGTH = 32;
export const UUID_REGEX = '[a-fA-F0-9]+';

export const UUID_VALIDATORS = [
  Validators.minLength(SHORT_UUID_LENGTH),
  Validators.maxLength(SHORT_UUID_LENGTH),
  Validators.pattern(UUID_REGEX),
  Validators.required
];

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
