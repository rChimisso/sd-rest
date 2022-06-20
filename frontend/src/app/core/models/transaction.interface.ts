import {Movement} from './movement.interface';

/**
 * Transazione bancaria su singolo Account bancario, ovvero un prelievo o un versamento.
 *
 * @export
 * @interface Transaction
 * @typedef {Transaction}
 */
export interface Transaction extends Movement {
  /**
   * ID dell'Account bancario che ha effettuato la Transazione.
   *
   * @type {string}
   */
  accountId: string;
}
