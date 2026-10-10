import { bNumRootsInRange } from '../bigint/b-num-roots-in-range.js';
import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
import { commonScalePower } from "../../../scale-to-int/common-scale-power.js";
import { bScale, bInvScale } from '../../../change-variables/bigint/b-scale.js';
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
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 * ```
 *
 * @doc
 */
function numRootsInRange(p, a, b) {
    // The endpoints are scaled by the same power of two, `2**e`, such that
    // they become integers, i.e. `A === a*2**e` and `B === b*2**e` (exactly).
    const [A, B] = scaleFloatsToBigints([a, b]);
    const e = commonScalePower([a, b]);
    // The polynomial's roots must be scaled by the same power of two, i.e.
    // `p(x) -> p(x / 2**e)` (which is then made integral again).
    const d = p.length;
    let pB = scaleFloatsToBigints(p);
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
export { numRootsInRange };
//# sourceMappingURL=num-roots-in-range.js.map