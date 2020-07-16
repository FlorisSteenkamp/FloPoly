
//import { exponent, bitLength } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { exponent, bitLength } = bigFloatOperators;


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer - the smallest such integer is returned.
 * @param a a floating point number
 */
function scaleFloatToInt(a: number) {
    return a*2**(-exponent(a) + bitLength(a) - 1);
}


export { scaleFloatToInt }
