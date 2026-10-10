import { scaleFloatssToBigintss } from "../../scale-to-int/scale-floatss-to-bigintss.js";
import { bSum } from "../../util/bigint/b-sum.js";
import { bIsRationalMultipleOf } from "../bigint/b-is-rational-multiple-of.js";
/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * * the coefficients are scaled (exactly) to bigints first so that overflow
 *   cannot occur
 *
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function eIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // scaling each polynomial by a (possibly different) power of two preserves
    // the 'is a rational multiple of' relation
    return bIsRationalMultipleOf(scaleFloatssToBigintss(a).map(bSum), scaleFloatssToBigintss(b).map(bSum));
}
export { eIsRationalMultipleOf };
//# sourceMappingURL=e-is-rational-multiple-of.js.map