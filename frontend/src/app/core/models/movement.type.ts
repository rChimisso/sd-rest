import {Transaction} from './transaction.interface';
import {Transfer} from './transfer.interface';

/**
 * Movimento bancario.
 *
 * @export
 * @typedef {Movement}
 */
export type Movement = Transaction | Transfer;
