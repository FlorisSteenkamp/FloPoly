/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 */
declare function eEvaluateAt0(p: number[][]): number[];
export { eEvaluateAt0 };
