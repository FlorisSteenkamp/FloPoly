import { bPdivTrivial }from '../../euclidean-division-related/bigint/b-pdiv-trivial.js';


/**
 * Returns quotient and remainder of trivial pseudo-division of `a` by `b`.
 *
 * The result satisfies `m*a = b*q + r` with `degree(r) < degree(b)`, where
 * `m = leadingCoeff(b)^(deg(a)-deg(b)+1)` (or its absolute value if
 * `positiveMultiplier === true`).
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 * @param positiveMultiplier if true, force a non-negative multiplier `m`
 */
function bDivmod(
        a: bigint[],
        b: bigint[],
        positiveMultiplier = false): { q: bigint[]; r: bigint[]; m: bigint; } {

    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }

    // (`bPdivTrivial` returns `m === 1n`, `q === []` and `r === a` if
    // `degree(a) < degree(b)`)
    return bPdivTrivial(a, b, positiveMultiplier);
}


export { bDivmod };
