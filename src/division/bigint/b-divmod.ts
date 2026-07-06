import { bDegree } from '../../basic/bigint/b-degree.js';
import { bPdivTrivial } from '../../euclidean-division-related/bigint/b-pdiv-trivial.js';


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

    const d = bDegree(a) - bDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a, m: 1n };
    }

    let m = b[0] ** BigInt(d);
    if (positiveMultiplier && m < 0n) {
        m = -m;
    }

    const { q, r } = bPdivTrivial(a, b, positiveMultiplier);

    return { q, r, m };
}


export { bDivmod };
