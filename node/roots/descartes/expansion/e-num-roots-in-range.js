import { bSum } from "../../../util/bigint/b-sum.js";
import { bNumRootsInRange } from "../bigint/b-num-roots-in-range.js";
import { scaleFloatssToBigintss } from '../../../scale-to-int/scale-floatss-to-bigintss.js';
import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval `(a,b)` of the given polynomial.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial, if
 * neither a nor b is a multiple root of p, then V(a) − V(b) is the number of
 * distinct real roots of P".
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
 * eNumRootsInRange(p,-20,-11); //=> 0
 * eNumRootsInRange(p,-11,-9);  //=> 1
 * eNumRootsInRange(p,-11,3.5); //=> 3
 * eNumRootsInRange(p,-11,5);   //=> 4
 * ```
 *
 * @doc
 */
function eNumRootsInRange(p, a, b) {
    return bNumRootsInRange(scaleFloatssToBigintss(p).map(bSum), bSum(scaleFloatsToBigints(a)), bSum(scaleFloatsToBigints(b)));
}
export { eNumRootsInRange };
//# sourceMappingURL=e-num-roots-in-range.js.map