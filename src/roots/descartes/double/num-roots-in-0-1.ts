import { eSturmChain } from "../../../euclidean-division-related/expansion/e-sturm-chain.js"
import { signChanges } from "./sign-changes.js";
import { eEvaluateAt1 } from "../../../evaluate/expansion/e-evaluate-at-1.js";
import { eSign } from "big-float-ts";


/**
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (0,1) of the given polynomial - subject to floating point 
 * underflow / overflow of intermediate calculations.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function numRootsIn01(p: number[]): number {
    const p_ = p.map(c => [c]);
    const ps = eSturmChain(p_);
    const as = ps.map(p_ => eSign(p_[p_.length-1])); // evaluate at 0
    const bs = ps.map(p_ => eSign(eEvaluateAt1(p_))); // evaluate at 1
    
    return signChanges(as) - signChanges(bs);
}


export { numRootsIn01 }
