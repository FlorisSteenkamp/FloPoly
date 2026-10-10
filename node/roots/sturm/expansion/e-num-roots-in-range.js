import { bNumRootsInRange } from "../bigint/b-num-roots-in-range.js";
import { scaleFloatssToBigintss } from '../../../scale-to-int/scale-floatss-to-bigintss.js';
import { commonScalePower } from "../../../scale-to-int/common-scale-power.js";
import { bInvScale, bScale } from "../../../change-variables/bigint/b-scale.js";
import { eCompress } from "big-float-ts";
import { bSum } from "../../../util/bigint/b-sum.js";
/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound given as a Shewchuk expansion
 * @param b an upper bound given as a Shewchuk expansion
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRootsInRange(p,[-20],[-11]); //=> 0
 * eNumRootsInRange(p,[-11],[-9]);  //=> 1
 * eNumRootsInRange(p,[-11],[3.5]); //=> 3
 * eNumRootsInRange(p,[-11],[5]);   //=> 4
 * ```
 *
 * @doc
 */
function eNumRootsInRange(p, a, b) {
    a = eCompress(a);
    b = eCompress(b);
    // The endpoints are scaled by the same power of two, `2**e`, such that
    // all their components become integers, i.e. `A === a*2**e` and
    // `B === b*2**e` (exactly).
    const [A, B] = scaleFloatssToBigintss([a, b]).map(bSum);
    const e = commonScalePower([...a, ...b]);
    // The polynomial's roots must be scaled by the same power of two, i.e.
    // `p(x) -> p(x / 2**e)` (which is then made integral again).
    const d = p.length;
    let pB = scaleFloatssToBigintss(p).map(bSum);
    if (e > 0) {
        const S = 2n ** BigInt(e);
        pB = pB.map(c => c * (S ** BigInt(d)));
        pB = bInvScale(pB, S); // exact division
    }
    else if (e < 0) {
        pB = bScale(pB, 2n ** BigInt(-e));
    }
    return bNumRootsInRange(pB, A, B);
}
export { eNumRootsInRange };
//# sourceMappingURL=e-num-roots-in-range.js.map