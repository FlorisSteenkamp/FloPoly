
import { exponent, bitLength } from "flo-numerical";


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer - the smallest such integer is returned.
 * @param a a floating point number
 */
function scaleFloatToInt(a: number) {
    return a*2**(-exponent(a) + bitLength(a) - 1);
}


export { scaleFloatToInt }
