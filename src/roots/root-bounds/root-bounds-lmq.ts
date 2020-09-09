
import { negate as negate_ } from "../../basic/double/negate";
import { upperToLowerBound as upperToLowerBound_ } from "./upper-to-lower-bound";
import { positiveToNegativeBound as positiveToNegativeBound_ } from "./positive-to-negative-bound";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const negate = negate_;
const upperToLowerBound = upperToLowerBound_;
const positiveToNegativeBound = positiveToNegativeBound_;


/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p: number[]): number {
	if (p.length <= 1) {
		return 0;
	}

	let deg = p.length-1;
	if (deg < 1) { return 0; }
	
	if (p[0] < 0) { p = negate(p); }
	
	let timesUsed = [];
	for (let i=0; i<deg; i++) {
		timesUsed.push(1);
	}
	
	let ub = 0;
	
	for (let m=0; m<=deg; m++) {
		if (p[m] >= 0) { continue; }
		
		let tempub = Number.POSITIVE_INFINITY;
		let any = false;
		
		for (let k=0; k<m; k++) {
			if (p[k] <= 0) { continue; }

			let temp = (-p[m] / (p[k] / 2**timesUsed[k]))**(1/(m-k));
			
			timesUsed[k]++;
			
			if (tempub > temp) { tempub = temp; }
			
			any = true;
		}
		
		if (any && ub < tempub)  
			ub = tempub;
	}
	
	return ub;
}


/** 
 * Returns a positive lower bound of the real roots of the given polynomial
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 */
let positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);


/** 
 * Returns a negative lower (further from zero) bound of the real roots of the 
 * given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 */
let negativeRootLowerBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);


/** 
 * Returns a negative upper (closer to zero) bound of the real roots of the 
 * given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 */
let negativeRootUpperBound_LMQ = upperToLowerBound(negativeRootLowerBound_LMQ);

export { 
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ
}
