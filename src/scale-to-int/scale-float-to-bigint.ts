import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 *
 * * subnormal numbers are handled correctly
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
function scaleFloatToBigint(a: number): bigint {
    if (a === 0) { return 0n; }

    return BigInt(multByPow2(a, -lsbExponent(a)));
}


export { scaleFloatToBigint }
