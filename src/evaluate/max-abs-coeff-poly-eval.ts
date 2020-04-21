
import { absCoeff } from "../basic/abs-coeff";
import { Horner } from "./horner";
import { γ1 } from "../error-analysis/gamma";


/**
 * Returns an upper bound of evaluating the given polynomial (using Horner's 
 * Algorithm) where all coefficients are made positive.
 * @param p a polynomial
 * @param x an evaluation point
 */
function maxAbsCoeffPolyEval(p: number[], x: number): number {
	p = absCoeff(p);

	return Horner(p, Math.abs(x)) * (1 + γ1);
}


export { maxAbsCoeffPolyEval }
