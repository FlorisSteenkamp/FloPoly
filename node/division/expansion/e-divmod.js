import { eAbs, eIntPow } from 'big-float-ts';
import { eDegree } from '../../basic/expansion/e-degree.js';
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
function eDivmod(a, b, positiveMultiplier = false) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    const d = eDegree(a) - eDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a, m: [1] };
    }
    let m = eIntPow(b[0], d);
    if (positiveMultiplier) {
        m = eAbs(m);
    }
    const { q, r } = ePdivTrivial(a, b, positiveMultiplier);
    return { q, r, m };
}
export { eDivmod };
//# sourceMappingURL=e-divmod.js.map