/**
 * **In-place** remove leading zero coefficients.
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
