
import { eNegativeOf as eNegativeOf_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eNegativeOf = eNegativeOf_;


/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e. 
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * eReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 */
function eReflectAboutYAxis(p: number[][]): number[][] {
	let d = p.length-1;

	if (d < 0) { return []; }

	let result = p.slice();
	for (let i=0; i<d+1; i++) {
		if (i % 2) {
			result[i] = eNegativeOf(result[i]); 
		}
	}
	
	return result;
}


export { eReflectAboutYAxis }
