/**
 * Returns the result of multiplies a polynomial by a constant in double-double
 * precision.
 *
 * @param c a constant in double-double precision
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
declare function ddMultiplyByConst(c: number[], p: number[][]): number[][];
export { ddMultiplyByConst };
