import {ResponseBody} from './response-body.interface';

/**
 * Response Body per un movimento.
 *
 * @export
 * @interface MovementResponseBody
 * @typedef {MovementResponseBody}
 * @template T extends string
 * @extends {ResponseBody<T>}
 */
export interface MovementResponseBody<T extends string> extends ResponseBody<T> {
  /**
   * Id del movimento.
   *
   * @type {string}
   */
  id: string;
}
