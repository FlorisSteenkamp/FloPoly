/**
 * Divides a polynomial by a constant in double-double precision.
 *
 * * leading zero coefficients (possible due to underflow) are removed from
 *   the result
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-double precision
 *
 * @doc
 */
declare function ddDivideByConst(p: number[][], c: number[]): number[][];
export { ddDivideByConst };
