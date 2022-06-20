import {Entity} from './entity.interface';

/**
 * Dati rilevanti di un Account bancario al seguito di un movimento che ne modifica il saldo.
 *
 * @export
 * @interface MovementActor
 * @typedef {MovementActor}
 */
export interface MovementActor extends Entity {
  /**
   * Nuovo saldo.
   *
   * @type {number}
   */
  newBalance: number;
}
