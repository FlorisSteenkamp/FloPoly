
//import { exponent, bitLength } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { exponent, bitLength } = bigFloatOperators;


/**
 * Returns the result of scaling the given floats by a power of two such that
 * all floats become integers - can be used to scale floating point expansions
 * and polynomials
 * @param a a floating point number
 */
function scaleFloatsToInts(as: number[]) {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        let a = as[i];
        let scaleFactor = -exponent(a) + bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }

    return as.map(a => a*2**e);
}


export { scaleFloatsToInts }
