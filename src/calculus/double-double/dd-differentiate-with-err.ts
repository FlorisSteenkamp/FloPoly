import { γγ } from '../../error-analysis/gamma';
import { ddMultDouble2 as ddMultDouble2_ } from "double-double";
import { eEstimate as eEstimate_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ddMultDouble2 = ddMultDouble2_;
const eEstimate = eEstimate_;
const γγ3 = γγ(3);


/**
 * Returns the result (and resulting coefficient-wise error bound) of 
 * differentiating the given polynomial (with coefficients given in 
 * double-double precision) in double-double precision.
 * 
 * @param pWithErr an object with 2 properties: `p`: a polynomial with 
 * coefficients given densely as an array of double-double precision floating 
 * point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]` represents 
 * the polynomial `5x^2 - 3x` **and** `pE`: the coefficient-wise error bound of 
 * the input polynomial
 * 
 * @doc
 */
function ddDifferentiateWithError(
		pWithErr: { p: number[][], pE: number[] }): { p: number[][], pE: number[] } {

	const { p, pE } = pWithErr;

	const dp: number[][] = [];
    const dpE: number[] = [];

    const d = p.length - 1;
    for (let i=0; i<d; i++) {
		const deg = d-i;
		const c = ddMultDouble2(deg, p[i]);
		dp.push(c);

        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
		const extraErr = (deg & deg-1) === 0 ? 0 : γγ3;
		
		const $c = eEstimate(c);
        dpE.push(
			//deg * (pE[i] + Math.abs($c)*extraErr)
			deg*pE[i] + Math.abs($c)*extraErr
		);
    }

    return { p: dp, pE: dpE };
}


export { ddDifferentiateWithError }
