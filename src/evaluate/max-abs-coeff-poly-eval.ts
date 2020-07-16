
import { absCoeff as absCoeff_ } from "../basic/abs-coeff";
import { Horner as Horner_ } from "./horner";
import { γ as γ_ } from "../error-analysis/gamma";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as polyOperators } from "../index";
const γ = γ_;
const Horner = Horner_;
const absCoeff = absCoeff_;
const γ1 = γ(1);


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
