/**
 * Returns the result of integrating the given polynomial in double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([3, 2, 1]); //=> [1, 1, 1, c]
 * ```
 *
 * @doc
 */
declare function integrate(p: number[], c: number): number[];
export { integrate };
