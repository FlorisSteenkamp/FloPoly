
import { bSturmChain as bSturmChain_ } from "../../../euclidean-division-related/bigint/b-sturm-chain";
import { bSignChanges as bSignChanges_ } from "./b-sign-changes";
import { bEvaluateAt1 as bEvaluateAt1_ } from "../../../evaluate/bigint/b-evaluate-at-1";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bSturmChain = bSturmChain_;
const bSignChanges = bSignChanges_;
const bEvaluateAt1 = bEvaluateAt1_;


/**
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (0,1) of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 */
function bNumRootsIn01(p: bigint[]): number {
	const ps = bSturmChain(p);
	const as = ps.map(p => p[p.length-1]); // evaluate at 0
	const bs = ps.map(p => bEvaluateAt1(p)); // evaluate at 1
	
	return bSignChanges(as) - bSignChanges(bs);
}


export { bNumRootsIn01 }
