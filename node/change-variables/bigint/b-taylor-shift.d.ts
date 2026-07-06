declare const bChangeVariablesTranslateX: typeof bTaylorShift;
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 *
 * @doc
 */
declare function bTaylorShift(p: bigint[], h: bigint): bigint[];
export { bTaylorShift, bChangeVariablesTranslateX };
