import { ePdivTrivial } from '../../euclidean-division-related/expansion/e-pdiv-trivial.js';


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
function eDivmod(
        a: number[][],
        b: number[][],
        positiveMultiplier = false): { q: number[][]; r: number[][]; m: number[]; } {

    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }

    // (`ePdivTrivial` returns `m === [1]`, `q === []` and `r === a` if 
    // `degree(a) < degree(b)`)
    return ePdivTrivial(a, b, positiveMultiplier);
}


export { eDivmod };
