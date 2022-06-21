/**
 * Possibili stili per formattare un valore monetario.
 *
 * @export
 * @typedef {CurrencyStyle}
 */
export type CurrencyStyle = 'positive' | 'neutral' | 'negative';

/**
 * Possibili tipi di valori monetari.
 *
 * @export
 * @typedef {CurrencyType}
 */
export type CurrencyType = 'balance' | 'amount';

/**
 * Possibili classi CSS per la stilizzazione di un valore monetario.
 *
 * @export
 * @typedef {CurrencyClass}
 */
export type CurrencyClass = `xsb-${CurrencyType}-${CurrencyStyle}`;
