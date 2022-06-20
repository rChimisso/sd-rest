import {Entity} from './entity.interface';

/**
 * Generico movimento bancario.
 *
 * @export
 * @interface Movement
 * @typedef {Movement}
 */
export interface Movement extends Entity {
  /**
   * Data in cui è stato effettuato il movimento.
   *
   * @type {Date}
   */
   date: Date;
   /**
    * Ammontare coinvolto.
    *
    * @type {number}
    */
   amount: number;
}
