import { eSign } from "big-float-ts";
import { eSturmChain } from "../../../euclidean-division-related/expansion/e-sturm-chain.js";
import { signChanges } from "../double/sign-changes.js";
import { eEvaluateAt1 } from "../../../evaluate/expansion/e-evaluate-at-1.js";


/**
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (0,1) of the given polynomial - subject to floating point 
 * underflow / overflow of intermediate calculations.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Schewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function eNumRootsIn01(p: number[][]): number {
    const ps = eSturmChain(p);
    const as = ps.map(p => eSign(p[p.length-1])); // evaluate at 0
    const bs = ps.map(p => eSign(eEvaluateAt1(p))); // evaluate at 1
    
    return signChanges(as) - signChanges(bs);
}


export { eNumRootsIn01 }
