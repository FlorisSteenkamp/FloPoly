/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function eNumRootsIn01(p: number[][]): number;
export { eNumRootsIn01 };
