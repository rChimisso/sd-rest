/**
 * Response Body.
 *
 * @export
 * @interface ResponseBody
 * @typedef {ResponseBody}
 * @template T extends string
 */
export interface ResponseBody<T extends string = ''> {
  /**
   * Messaggio da poter mostrare all'utente.
   *
   * @type {T}
   */
  message: T;
}
