import {Account} from '../account.interface';
import {Movement} from '../movement.type';
import {ResponseBody} from './response-body.interface';

/**
 * Dati della risposta di una richiesta dello storico di un {@link Account} bancario.
 *
 * @export
 * @interface AccountHistory
 * @typedef {AccountHistory}
 */
export interface AccountHistory extends ResponseBody {
  /**
   * Account di cui è stato richiesto lo storico.
   *
   * @type {Account}
   */
  account: Account;
  /**
   * Cronologia dei movimenti.
   *
   * @type {(Movement & {date: string})[]}
   */
  history: (Movement & {date: string})[];
}
