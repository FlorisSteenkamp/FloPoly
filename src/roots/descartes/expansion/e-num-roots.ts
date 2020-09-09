
import { eSign as eSign_ } from "big-float-ts";
import { eSturmChain as eSturmChain_ } from "../../../euclidean-division-related/expansion/e-sturm-chain";
import { signChanges as signChanges_ } from "../double/sign-changes";
import { eDegree as eDegree_ } from "../../../basic/expansion/e-degree";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const signChanges = signChanges_;
const eSign = eSign_;
const eDegree = eDegree_;
const eSturmChain = eSturmChain_;


/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞) 
 * of the given polynomial - subject to floating point underflow / overflow of 
 * intermediate calculations.
 * 
 * * From Wikipedia: "In the case of a non-square-free polynomial, 
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number 
 * of distinct real roots of P".
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example 
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRoots(p); //=> 4
 */
function eNumRoots(p: number[][]): number {
	const ps = eSturmChain(p);
	const as = ps.map(p => eDegree(p) % 2 === 0 ? eSign(p[0]) : -eSign(p[0]));
	const bs = ps.map(p => eSign(p[0]));
	
	return signChanges(as) - signChanges(bs);
}


export { eNumRoots }
