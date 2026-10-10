/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * eDeflate([[1], [-5], [8], [-4]], 2); //=> [[1], [-3], [2]]
 * ```
 *
 * @doc
 */
declare function eDeflate(p: number[][], t: number): number[][];
export { eDeflate };
