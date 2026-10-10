/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * the calculations are exact (bar overflow / underflow)
 *
 * * see also [[eTaylorShift]] where `h` is a double
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount (given as a Shewchuk floating point expansion)
 *
 * @doc
 */
declare function eeTaylorShift(p: number[][], h: number[]): number[][];
export { eeTaylorShift };
