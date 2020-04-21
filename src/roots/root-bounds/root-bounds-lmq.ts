
import { negate } from "../../basic/negate";
import { upperToLowerBound } from "./upper-to-lower-bound";
import { positiveToNegativeBound } from "./positive-to-negative-bound";


const POWERS = [
	1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768, 
	65536,131072,262144,524288,1048576,2097152
];
/**
 * Returns an upper bound for the positive real roots of the given 
 * polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * @param p a polynomial
 * @example
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p: number[]): number {
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

			// Table lookup is about 70% faster but both are
			// extemely fast anyway. 
			// Result is at https://www.measurethat.net/Benchmarks/ShowResult/6610
			let pow = timesUsed[k];
			let powres;
			if (pow > 20) {
				powres = Math.pow(2, pow);
			} else {
				powres = POWERS[pow];
			}
			let temp = Math.pow(
					-p[m] / (p[k] / powres),
					1/(m-k)
			);
			
			timesUsed[k]++;
			
			if (tempub > temp) { tempub = temp; }
			
			any = true;
		}
		
		if (any && ub < tempub)  
			ub = tempub;
	}
	
	return ub;
}


/** Returns a positive lower bound of the roots of the given polynomial */
let positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);
/** 
 * Returns a negative upper (upper here means further from zero) bound of the 
 * roots of the given polynomial .
 */
let negativeRootUpperBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);
/** 
 * Returns a negative lower (lower here means closer to zero) bound of the roots 
 * of the given polynomial.
 */
let negativeRootLowerBound_LMQ = upperToLowerBound(negativeRootUpperBound_LMQ);


export { 
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ
}
