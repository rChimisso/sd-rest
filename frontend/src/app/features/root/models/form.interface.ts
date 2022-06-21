import {FormControl} from '@angular/forms';

/**
 * Struttura del FromGroup.
 *
 * @export
 * @interface FormInterface
 * @typedef {FormInterface}
 */
export interface FormInterface {
  /**
   * UUID dell'account di cui prelevare lo storico.
   *
   * @type {FormControl<string>}
   */
  accountId: FormControl<string>;
}
