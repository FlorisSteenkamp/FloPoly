/**
 * **In-place** remove leading zero coefficients.
 *
 * * `p` and `getPExact()` *must* be of same length
*/
declare function removeLeadingZeroCoeffs(p: number[][], pE: number[], getPExact: () => number[][]): {
    p: number[][];
    pE: number[];
    pExact: number[][] | undefined;
};
export { removeLeadingZeroCoeffs };
