/**
 * Returns a deflated version of the given polynomial *approximately* by
 * removing a factor (x - t). Also returns an coefficient-wise absolute error
 * bound.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pE the coefficient-wise absolute error of the input polynomial that
 * still need to be multiplied by γγ3, i.e. it is `γγ3` times too big.
 * @param t an evaluation point of the polynomial.
 *
 * @doc
 */
declare function ddDeflateWithRunningError(p: number[][], pE: number[], t: number): {
    coeffs: number[][];
    errBound: number[];
};
export { ddDeflateWithRunningError };
