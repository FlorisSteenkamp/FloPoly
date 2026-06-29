import { eEstimate } from "big-float-ts";


/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of Shewchuk
 * expansions (with intermediate calculations (and the final result) done in 
 * double precision).
 * 
 * @param p an array of Shewchuk expansions; can represent an array of polynomial 
 * coefficients
 * 
 * @doc
 */
function eP2Norm(p: number[][]): number {
    let s = 0;
    for (let i=0; i<p.length; i++) {
        s += eEstimate(p[i])**2;
    }
    
    return Math.sqrt(s);
}


export { eP2Norm }
