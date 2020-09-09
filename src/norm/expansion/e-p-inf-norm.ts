
import { eEstimate as eEstimate_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEstimate = eEstimate_;


/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value 
 * within the given array of numbers / coefficients (with intermediate 
 * calculations (and the final result) done in double precision).
 * 
 * @param p an array of numbers; can represent an array of polynomial 
 * coefficients
 */
function ePInfNorm(p: number[][]): number {
    let max = 0;
    for (let i=0; i<p.length; i++) {
        let v = Math.abs(eEstimate(p[i]));
        if (v > max) { 
            max = v; 
        }
    }
    
    return max;
}


export { ePInfNorm }
