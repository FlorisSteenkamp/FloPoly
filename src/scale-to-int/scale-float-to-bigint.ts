
import { exponent as exponent_ } from "big-float-ts";
import { bitLength as bitLength_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = exponent_;
const bitLength = bitLength_;


const b0 = 0n;  // temp until support is better otherwise test fails


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 * 
 * @param a a double precision floating point number
 */
function scaleFloatToBigint(a: number): bigint {
    if (a === 0) { return b0; }

    return BigInt(a*2**(-exponent(a) + bitLength(a) - 1));
}


export { scaleFloatToBigint }
