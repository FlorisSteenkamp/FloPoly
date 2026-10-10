/**
 * Applies the error-free transformation `EFTHorner` recursively to a depth of
 * `K - 1` and returns the `2**(K-1) - 1` internal node results (`hs`) and the
 * `2**(K-1)` leaf polynomials (`ps`) that still need to be evaluated.
 *
 * * **precondition:** `1 <= K <= p.length`
 *
 * @param p
 * @param x
 * @param K
 *
 * @internal
 */
declare function EFTHornerK(p: number[], x: number, K: number): {
    hs: number[];
    ps: number[][];
};
export { EFTHornerK };
