import { eMultiply as eMultiply_ } from "../../../basic/expansion/e-multiply.js";
import { eNegativeOf as eNegativeOf_ } from "big-float-ts";
import { eToDd as eToDd_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eMultiply = eMultiply_;
const eNegativeOf = eNegativeOf_;
const eToDd = eToDd_;


/**
 * Constructs a double-double precision polynomial from the given roots by 
 * multiplying out the factors (x - root1)(x - root2) in infinite precision 
 * (bar overflow) and rounding back to double-double precision; also returns
 * a coefficient-wise error polynomial and a function that returns the exact
 * polynomial.
 * 
 * * mostly for testing purposes. 
 * 
 * @param roots an array of roots
 * 
 * @doc
 */
function eFromRoots(
		roots: number[][]): {
			pDd: number[][],
			pE: number[],
			getPExact: () => number[][]
		} {

	let p = [[1]];
	for (let i=0; i<roots.length; i++) {
		p = eMultiply(p, [[1], eNegativeOf(roots[i])]);
	}
	
	const pE = p.map(c => Math.abs(c[c.length-1]*Number.EPSILON));

	const getPExact = () => p;

	return {
		pDd: p.map(eToDd),
		pE,
		getPExact
	}
}


export { eFromRoots }
