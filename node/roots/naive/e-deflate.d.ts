/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @doc
 */
declare function eDeflate(p: number[][], t: number): number[][];
export { eDeflate };
