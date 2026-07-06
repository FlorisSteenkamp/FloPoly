declare const eChangeVariablesTranslateX: typeof eTaylorShift;
/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk expansion
 * floating point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
declare function eTaylorShift(p: number[][], h: number): number[][];
export { eTaylorShift, eChangeVariablesTranslateX };
