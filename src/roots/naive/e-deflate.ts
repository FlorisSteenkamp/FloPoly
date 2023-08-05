import { eMultDouble2 } from "big-float-ts";
import { eAdd } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const emd = eMultDouble2;
const eae = eAdd;


/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 * 
 * @doc
 */
function eDeflate(p: number[][], t: number): number[][] {
	const d = p.length-1;
	const bs = [p[0]];
	for (let i=1; i<d; i++) {
		bs.push(
			// p[i] + root*bs[i-1]
			eae(p[i],emd(t,bs[i-1]))
		);
	}

	return bs;
}


export { eDeflate }
