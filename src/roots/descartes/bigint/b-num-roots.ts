
import { bSturmChain as bSturmChain_ } from "../../../euclidean-division-related/bigint/b-sturm-chain";
import { bDegree as bDegree_ } from "../../../basic/bigint/b-degree";
import { bSignChanges as bSignChanges_ } from "./b-sign-changes";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bSturmChain = bSturmChain_;
const bDegree = bDegree_;
const bSignChanges = bSignChanges_;


/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞) 
 * of the given polynomial.
 * 
 * * From Wikipedia: "In the case of a non-square-free polynomial, 
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number 
 * of distinct real roots of P".
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example 
 * const p = [n1, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 */
function bNumRoots(p: bigint[]): number {
	const ps = bSturmChain(p);
	const as = ps.map(p => bDegree(p) % 2 === 0 ? p[0] : -p[0]);
	const bs = ps.map(p => p[0]);
	
	return bSignChanges(as) - bSignChanges(bs);
}


export { bNumRoots }
