
import { pInfNorm as pInfNorm_ } from "../../norm/double/p-inf-norm";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const pInfNorm = pInfNorm_;


/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem 
 * with k = n. 
 * 
 * * fast but the bound is not very tight
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 */
function rootMagnitudeUpperBound_rouche(p: number[]): number {
    if (p.length <= 1) {
		return 0;
    }
    
    return 1 + (pInfNorm(p.slice(1)) / p[0]);
}


export { rootMagnitudeUpperBound_rouche }
