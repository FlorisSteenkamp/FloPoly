
import { maxAbsCoeffPolyEval } from "./max-abs-coeff-poly-eval";
import { γ } from '../error-analysis/gamma';


/**
 * Classic rule of thumb error bound when using Horner's method to evaluate 
 * polynomials. 
 * see for instance compensated horner evaluation http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf"
 * @param p The polynomial
 * @param x Value at which polynomial is evaluated. 
 */
function hornerErrorBound(p: number[], x: number): number {
	let n = p.length;
	return γ(2*n) * maxAbsCoeffPolyEval(p, x);
}


export { hornerErrorBound }
