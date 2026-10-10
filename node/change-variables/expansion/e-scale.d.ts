declare const eChangeVariablesScale: typeof eScale;
/**
 * Returns the polynomial `f(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 */
declare function eScale(p: number[][], s: number): number[][];
export { eScale, eChangeVariablesScale };
