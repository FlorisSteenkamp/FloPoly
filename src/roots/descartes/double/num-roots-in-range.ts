import { sturmChain as sturmChain_ } from "../../../euclidean-division-related/double/sturm-chain.js";
import { eHorner as eHorner_ } from "../../../evaluate/expansion/e-horner";
import { eSignChanges as eSignChanges_ } from '../expansion/e-sign-changes';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sturmChain = sturmChain_;
const eHorner = eHorner_;
const eSignChanges = eSignChanges_;


/** 
 * Returns the *exact* number of *distinct* real roots in the open 
 * interval (a,b) of the given polynomial - subject to floating point 
 * underflow / overflow of intermediate calculations.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 * 
 * @example
 * ```typescript 
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1  
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 * ```
 * 
 * @doc
 */ 
function numRootsInRange(
		p: number[], a: number, b: number): number {

	const ps = sturmChain(p);
	const as = ps.map(p => eHorner(p,a));
	const bs = ps.map(p => eHorner(p,b));
	
	return eSignChanges(as) - eSignChanges(bs);
}


export { numRootsInRange }
