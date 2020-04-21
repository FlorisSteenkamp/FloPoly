
import { pInfNorm } from "../../norm/p-inf-norm";


/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem with 
 * k = n. 
 * 
 * This function is fast but the bound is not tight.
 * @param p a polynomial.
 */
function rootMagnitudeUpperBound_rouche(p: number[]): number {
    return 1 + (pInfNorm(p.slice(1)) / p[0]);
}


export { rootMagnitudeUpperBound_rouche }
