import {FormControl} from '@angular/forms';

/**
 * Struttura del FormGroup.
 *
 * @export
 * @interface FormInterface
 * @typedef {FormInterface}
 */
export interface FormInterface {
  /**
   * UUID dell'Account.
   *
   * @type {FormControl<string>}
   */
  accountId: FormControl<string>;
  /**
   * Ammontare coinvolto.
   *
   * @type {FormControl<string>}
   */
  amount: FormControl<string>;
}
