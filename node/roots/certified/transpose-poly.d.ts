/**
 * Transposes the given polynomial (given with multi-precision coefficients)
 * into multiple polynomials with each consecutive polynomial 'adjusting'
 * the prior one to higher precision.
 *
 * @internal
 *
 * @param p
 */
declare function transposePoly(p: number[][]): number[][];
export { transposePoly };
