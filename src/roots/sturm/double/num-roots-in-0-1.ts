import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
import { bNumRootsIn01 } from "../bigint/b-num-roots-0-1.js";


/**
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (0,1) of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function numRootsIn01(
        p: number[]): number {

    return bNumRootsIn01(scaleFloatsToBigints(p));
}


export { numRootsIn01 }
