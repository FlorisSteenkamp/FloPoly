/**
 * Returns quotient and remainder of trivial pseudo-division of `a` by `b`.
 *
 * The result satisfies `m*a = b*q + r` with `degree(r) < degree(b)`, where
 * `m = leadingCoeff(b)^(deg(a)-deg(b)+1)` (or `abs(m)` if
 * `positiveMultiplier === true`).
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 * @param positiveMultiplier if true, force a non-negative multiplier `m`
 */
declare function eDivmod(a: number[][], b: number[][], positiveMultiplier?: boolean): {
    q: number[][];
    r: number[][];
    m: number[];
};
export { eDivmod };
