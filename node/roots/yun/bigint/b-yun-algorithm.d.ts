/**
 * * see e.g. [Yun's algorithm](https://en.wikipedia.org/wiki/Square-free_polynomial)
 *
 * @param a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @returns square-free factors paired with their multiplicities
 */
declare function bYunsAlgorithm(p: bigint[]): {
    factor: bigint[];
    multiplicity: number;
}[];
export { bYunsAlgorithm };
