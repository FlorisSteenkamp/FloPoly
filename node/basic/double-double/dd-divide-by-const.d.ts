/**
 * Divides a polynomial by a constant in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-doulbe precision
 *
 * @doc
 */
declare function ddDivideByConst(p: number[][], c: number[]): number[][];
export { ddDivideByConst };
