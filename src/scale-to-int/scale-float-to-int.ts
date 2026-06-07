import { exponent } from "big-float-ts";
import { bitLength } from "big-float-ts";


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is 
 * returned.
 * 
 * * the result is exact (no round-off can occur)
 * 
 * @param a a double precision floating point number
 * 
 * @doc
 */
function scaleFloatToInt(a: number): number {
    if (a === 0) { return 0; }
    
    return a*2**(-exponent(a) + bitLength(a) - 1);
}


export { scaleFloatToInt }
