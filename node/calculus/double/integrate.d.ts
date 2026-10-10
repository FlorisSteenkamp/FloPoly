/**
 * Returns the result of integrating the given polynomial in double precision.
 *
 * * leading zero coefficients (e.g. if the zero polynomial is integrated
 *   with a zero constant of integration) are removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([3, 2, 1], 5); //=> [1, 1, 1, 5]
 * integrate([], 0);        //=> []
 * ```
 *
 * @doc
 */
declare function integrate(p: number[], c: number): number[];
export { integrate };
