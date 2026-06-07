import { exponent } from "big-float-ts";
import { bitLength } from "big-float-ts";


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 * 
 * @param a a double precision floating point number
 * 
 * @doc
 */
function scaleFloatToBigint(a: number): bigint {
    if (a === 0) { return 0n; }

    return BigInt(a*2**(-exponent(a) + bitLength(a) - 1));
}


export { scaleFloatToBigint }
