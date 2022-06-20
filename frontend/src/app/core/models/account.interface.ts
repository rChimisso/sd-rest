import {Entity} from './entity.interface';

/**
 * Account bancario.
 *
 * @export
 * @interface Account
 * @typedef {Account}
 */
export interface Account extends Entity {
  /**
   * Nome del proprietario dell'Account.
   *
   * @type {string}
   */
  name: string;
  /**
   * Cognome del proprietario dell'Account.
   *
   * @type {string}
   */
  surname: string;
  /**
   * Saldo dell'Account.
   *
   * @type {number}
   */
  balance: number;
  /**
   * Se l'Account è stato eliminato.
   *
   * @type {boolean}
   */
  deleted: boolean;
}
