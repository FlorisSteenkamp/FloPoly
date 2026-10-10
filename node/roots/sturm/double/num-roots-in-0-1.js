import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
import { bNumRootsIn01 } from "../bigint/b-num-roots-0-1.js";
/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function numRootsIn01(p) {
    return bNumRootsIn01(scaleFloatsToBigints(p));
}
export { numRootsIn01 };
//# sourceMappingURL=num-roots-in-0-1.js.map