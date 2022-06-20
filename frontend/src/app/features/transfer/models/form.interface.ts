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
   * UUID del mittente.
   *
   * @type {FormControl<string>}
   */
  senderId: FormControl<string>;
  /**
   * UUID del destinatario.
   *
   * @type {FormControl<string>}
   */
  recipientId: FormControl<string>;
  /**
   * Ammontare del Trasferimento.
   *
   * @type {FormControl<string>}
   */
  amount: FormControl<string>;
}
