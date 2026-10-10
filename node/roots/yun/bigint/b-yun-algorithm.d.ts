/**
 * Returns the square-free factorization of the given polynomial.
 *
 * * see e.g. [Yun's algorithm](https://en.wikipedia.org/wiki/Square-free_polynomial)
 *
 * * **note:** the implementation uses the (simpler) repeated-gcd method
 *   (Musser's algorithm) which gives the same result as Yun's algorithm in
 *   characteristic 0
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
