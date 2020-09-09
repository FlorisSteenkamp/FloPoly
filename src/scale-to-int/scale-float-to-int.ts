
import { exponent as exponent_ } from "big-float-ts";
import { bitLength as bitLength_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = exponent_;
const bitLength = bitLength_;


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is 
 * returned.
 * 
 * * the result is exact (no round-off can occur)
 * 
 * @param a a double precision floating point number
 */
function scaleFloatToInt(a: number): number {
    if (a === 0) { return 0; }
    
    return a*2**(-exponent(a) + bitLength(a) - 1);
}


export { scaleFloatToInt }
