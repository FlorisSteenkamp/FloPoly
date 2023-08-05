/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r),
 * where r is a root of the polynomial.
 *
 * * **non-exact:** the deflation is done in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pE the coefficient-wise absolute error of the input polynomial
 * @param t an evaluation point of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], [0,2]); //=> [[0,1], [0,-3], [0,2]]
 * ddDeflate([[0,1], [0,-3], [0,2], [0,2]);          //=> [[0,1], [0,-1]]
 * ddDeflate([[0,1], [0,-1]], [0,1]);                //=> [[0,1]]
 * ```
 *
 * @doc
 */
declare function ddDeflateWithRunningError(p: number[][], pE: number[], t: number): {
    coeffs: number[][];
    errBound: number[];
};
export { ddDeflateWithRunningError };
