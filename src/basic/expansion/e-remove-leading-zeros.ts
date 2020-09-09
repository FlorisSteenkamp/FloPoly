
import { eSign as eSign_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eSign = eSign_;


/**
 * If the highest power coefficient of the given polynomial is 0 then 
 * removeLeadingZeros can be called to remove all such highest terms so that 
 * the returned array is a valid presentation of a polynomial.
 * 
 * @internal
 * 
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * eRemoveLeadingZeros([[1e-18], [1e-10], [1e-1]]); //=> [[1e-18], [1e-10], [1e-1]]
 * eRemoveLeadingZeros([[0], [1e-10], [1e-1]]); //=> [[1e-10], [1e-1]]
 */
function eRemoveLeadingZeros(p: number[][]): number[][] {
	let lzCount = 0;
	for (let i=0; i<=p.length-1; i++) {
		if (eSign(p[i]) !== 0) {
			break;
		}
		lzCount++;
	}

	if (lzCount !== 0) { 
		p = p.slice(lzCount);
	}

	return p;
}


export { eRemoveLeadingZeros }
