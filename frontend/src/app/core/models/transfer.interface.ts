import {Movement} from './movement.interface';

/**
 * Trasferimento bancario da un Account bancario a un altro.
 *
 * @export
 * @interface Transfer
 * @typedef {Transfer}
 */
export interface Transfer extends Movement {
  /**
   * Id del mittente.
   *
   * @type {string}
   */
  sender: string;
  /**
   * Id del destinatario.
   *
   * @type {string}
   */
  recipient: string;
}
