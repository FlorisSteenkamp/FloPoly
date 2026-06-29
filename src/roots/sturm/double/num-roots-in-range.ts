import { bNumRootsInRange } from '../bigint/b-num-roots-in-range.js';
import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";


/** 
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (a,b) of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 * 
 * @example
 * ```typescript 
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1  
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 * ```
 * 
 * @doc
 */ 
function numRootsInRange(
        p: number[],
        a: number,
        b: number): number {

    return bNumRootsInRange(
        scaleFloatsToBigints(p),
        BigInt(a), BigInt(b)
    );
}


export { numRootsInRange }
