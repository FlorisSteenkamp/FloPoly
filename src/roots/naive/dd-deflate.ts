import { ddMultDouble2 } from "double-double";
import { ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qmd = ddMultDouble2;
const qaq = ddAddDd;


/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r), 
 * where r is a root of the polynomial.
 * 
 * * **non-exact:** the deflation is done in double-double precision - it is not 
 * possible to deflate a root exactly in most cases and round-off will thus
 * occur - use only if approximate deflation is acceptable
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 * 
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2 
 * ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], [0,2]); //=> [[0,1], [0,-3], [0,2]] 
 * ddDeflate([[0,1], [0,-3], [0,2], [0,2]);          //=> [[0,1], [0,-1]] 
 * ddDeflate([[0,1], [0,-1]], [0,1]);                //=> [[0,1]]
 * ```
 * 
 * @doc
 */
function ddDeflate(p: number[][], root: number): number[][] {
	const d = p.length-1;
	const bs = [p[0]];
	for (let i=1; i<d; i++) {
		bs.push(
			// p[i] + root*bs[i-1]
			qaq(p[i],qmd(root,bs[i-1]))
		);
	}

	return bs;
}


export { ddDeflate }
