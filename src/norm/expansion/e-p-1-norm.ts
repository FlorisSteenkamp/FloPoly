
import { eEstimate as eEstimate_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEstimate = eEstimate_;


/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute 
 * values of the given array of Shewchuk expansions (with intermediate 
 * calculations (and the final result) done in double precision).
 * 
 * * if the array of expansions represent polynomial coefficients then the p-1 
 * norm is known as the `length` of the polynomial
 * 
 * @param p an array of Shewchuk expansions
 */
function eP1Norm(p: number[][]): number {
    let s = 0;
    for (let i=0; i<p.length; i++) {
        s += Math.abs(eEstimate(p[i]));
    }
    
    return s;
}


export { eP1Norm }
