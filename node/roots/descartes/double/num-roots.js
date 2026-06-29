import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
import { bNumRoots } from "../bigint/b-num-roots.js";
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function numRoots(p) {
    return bNumRoots(scaleFloatsToBigints(p));
}
export { numRoots };
//# sourceMappingURL=num-roots.js.map