/**
 * Removes leading zero coefficients (that are not certifiably non-zero).
 *
 * * the given arrays are **not** modified - new arrays are returned if
 *   anything changed (if the leading coefficient is certifiably non-zero the
 *   given arrays are returned as is)
 *
 * * if the leading coefficient is not certifiably non-zero the exact
 *   polynomial is consulted; the returned `pDd` is then the exact polynomial
 *   rounded to double-double precision and `pDd_` the corresponding error bound
 *
 * * `p` and `getPExact()` *must* be of same length
 *
 * @internal
*/
declare function removeLeadingZeroCoeffs(pDd: number[][], pDd_: number[], getPExact: () => number[][], errorMultiplier: number): {
    pDd: number[][];
    pDd_: number[];
    pExact: number[][] | undefined;
};
export { removeLeadingZeroCoeffs };
