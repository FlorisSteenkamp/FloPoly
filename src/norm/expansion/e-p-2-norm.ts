
import { eEstimate as eEstimate_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEstimate = eEstimate_;


/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of Shewchuk
 * expansions (with intermediate calculations (and the final result) done in 
 * double precision).
 * 
 * @param p an array of Shewchuk expansions; can represent an array of polynomial 
 * coefficients
 */
function eP2Norm(p: number[][]): number {
    let s = 0;
    for (let i=0; i<p.length; i++) {
        s += eEstimate(p[i])**2;
    }
    
    return Math.sqrt(s);
}


export { eP2Norm }
