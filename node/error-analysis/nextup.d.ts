/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup2` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - -Number.MIN_VALUE => -0 (since `getUlp(5e-324)/2 === 0`)
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
declare function nextup(n: number): number;
/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - `Number.MAX_VALUE => Infinity`
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
declare function nextup2(x: number): number;
export { nextup, nextup2 as nextUp2 };
