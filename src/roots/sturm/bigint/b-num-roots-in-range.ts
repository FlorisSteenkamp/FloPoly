import { bSturmChain } from "../../../euclidean-division-related/bigint/b-sturm-chain.js";
import { bHorner } from "../../../evaluate/bigint/b-horner.js";
import { bSignChanges } from "./b-sign-changes.js";
import { bDeflate } from '../../../roots/deflate/b-deflate.js';


/** 
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 * 
 * @example
 * ```typescript 
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20n,-11n);  //=> 0
 * bNumRootsInRange(p,-11n,-9n);   //=> 1
 * bNumRootsInRange(p,-11n,5n);    //=> 4
 * ```
 * 
 * @doc
 */ 
function bNumRootsInRange(
        p: bigint[], 
        a: bigint, 
        b: bigint): number {

    // Check for root at `a`
    let numRootsAtA = 0;
    while (p.length > 0 && bHorner(p,a) === 0n) {
        p = bDeflate(p, a);
        numRootsAtA++;
    }

    const ps = bSturmChain(p);
    const as = ps.map(p => bHorner(p,a));
    const bs = ps.map(p => bHorner(p,b));

    return bSignChanges(as) - bSignChanges(bs) + numRootsAtA;
}


export { bNumRootsInRange }
