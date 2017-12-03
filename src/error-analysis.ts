
import coreOperators from './core-operators';


const { evaluate } = coreOperators;


/**
 * <p>
 * Approximate condition number for polynomial evaluation multiplied by the 
 * exact value of the polynomial evaluation.
 * </p>
 * <p>
 * See <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">Compensated Horner Scheme - paragraph 1.1</a>
 * </p>
 * @ignore
 * @param p - The polynomial
 * @param x - The evaluation point
 */
function conditionNumber(p: number[], x: number): number {
	let d = p.length-1;
	let res = 0;
	
	for (let i=0; i<d; i++) {
		res += Math.abs(p[i] * Math.pow(x,d-i));
	}
	
	return res;
}


/**
 * <p>
 * Classic rule of thumb approximate error bound when using Horner's 
 * method to evaluate polynomials. 
 * </p>
 * <p>
 * See for instance <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">compensated horner evaluation</a>
 * </p>
 * @param p - The polynomial
 * @param x - Value at which polynomial is evaluated. 
  * @example
 * hornerErrorBound([1.1,2.2,-3.3], 1.5); //=> 5.1292303737682235e-15 
 */
function hornerErrorBound(p: number[], x: number): number {
	const δ = Number.EPSILON;
	
	let d = p.length-1;
	return 2*d*δ * conditionNumber(p, x)
}


let errorAnalysis = {
	hornerErrorBound		
}


export default errorAnalysis;
