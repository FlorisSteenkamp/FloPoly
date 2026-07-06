/**
 * Returns `true` if the polynomial `b` divides the polynomial `a`, i.e. if
 * there exists a polynomial `r` such that `a = b*r`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
declare function bDivides(b: bigint[], a: bigint[]): boolean;
export { bDivides };
