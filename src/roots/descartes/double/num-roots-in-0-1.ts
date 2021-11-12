import { eSturmChain as eSturmChain_ } from "../../../euclidean-division-related/expansion/e-sturm-chain.js"
import { signChanges as signChanges_ } from "./sign-changes.js";
import { eEvaluateAt1 as eEvaluateAt1_ } from "../../../evaluate/expansion/e-evaluate-at-1.js";
import { eSign as eSign_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEvaluateAt1 = eEvaluateAt1_;
const eSturmChain = eSturmChain_;
const signChanges = signChanges_;
const eSign = eSign_;


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
