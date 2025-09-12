/**
 * Returns the result of subtracting the second polynomial from the first in
 * double-double precision; (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of double-double floating point numbers
 * from highest to lowest power
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @doc
 */
declare function ddSubtract(p1: number[][], p2: number[][]): number[][];
export { ddSubtract };
