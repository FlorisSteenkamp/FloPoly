/**
 * Returns the next representable floating-point number less than
 * `n` toward `-Infinity`.
 *
 * * identical to `nextdown2` but with different implementation
 *
 * * For most numbers, this subtracts one unit in the last place (ulp) from the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Number.MAX_VALUE`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `-Number.MIN_VALUE`,
 *   - `+0` => `-Number.MIN_VALUE`,
 *   - `-Infinity` => `-Infinity`
 *   - `Number.MIN_VALUE => +0 (since `getUlp(5e-324)/2 === 0`)
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
declare function nextdown(n: number): number;
declare function nextdown2(x: number): number;
export { nextdown, nextdown2 };
