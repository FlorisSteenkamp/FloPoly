/**
 * Returns a deflated version of the given polynomial *approximately* by
 * removing a factor (x - t). Also returns an coefficient-wise absolute error
 * bound.
 *
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ the coefficient-wise absolute error bound of the input
 * polynomial that still needs to be multiplied by `γγ3`, i.e. the actual
 * absolute error bound of the coefficient of `xⁱ` is `pDd_[i]*γγ3`.
 * @param t an evaluation point of the polynomial.
 *
 * @doc
 */
declare function ddDeflateWithRunningError(pDd: number[][], pDd_: number[], t: number): {
    coeffs: number[][];
    errBound: number[];
};
export { ddDeflateWithRunningError };
