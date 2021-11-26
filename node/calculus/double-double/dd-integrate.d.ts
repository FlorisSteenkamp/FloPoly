/**
 * Returns the result of integrating the given polynomial in double-double
 * precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest
 * power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([[0,3], [0,2], [0,1]]); //=> [[0,1], [0,1], [0,1], [0,c]]
 * ```
 *
 * @doc
 */
declare function ddIntegrate(p: number[][], c: number[]): number[][];
export { ddIntegrate };
