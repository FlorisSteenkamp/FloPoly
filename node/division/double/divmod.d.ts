/**
 * Returns the quotient and remainder of Euclidean long division of `a` by `b`
 * over double coefficients, i.e. `a = b*q + r` with `degree(r) < degree(b)`.
 *
 * * the leading term of the running remainder is eliminated explicitly at
 *   each step (it is not relied upon to cancel exactly in floating point)
 *
 * * leading zero coefficients of `a` and `b` are ignored
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 */
declare function divmod(a: number[], b: number[]): {
    q: number[];
    r: number[];
};
export { divmod };
