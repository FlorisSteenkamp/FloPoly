import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";
/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is
 * returned.
 *
 * * the result is exact (no round-off can occur)
 * * subnormal numbers are handled correctly
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
function scaleFloatToInt(a) {
    if (a === 0) {
        return 0;
    }
    return multByPow2(a, -lsbExponent(a));
}
export { scaleFloatToInt };
//# sourceMappingURL=scale-float-to-int.js.map