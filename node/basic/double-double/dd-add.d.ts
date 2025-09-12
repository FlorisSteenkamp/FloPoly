/**
 * Returns the result of adding two polynomials in double-double precision.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial
 *
 * @doc
 */
declare function ddAdd(p1: number[][], p2: number[][]): number[][];
export { ddAdd };
