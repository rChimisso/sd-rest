/**
 * Item del menù per la navigazione.
 *
 * @export
 * @interface MenuItem
 * @typedef {MenuItem}
 */
export interface MenuItem {
  /**
   * Percorso relativo alla root della pagina verso cui navigare.
   *
   * @type {string}
   */
  route: string;
  /**
   * Label da mostrare.
   *
   * @type {string}
   */
  label: string;
}
