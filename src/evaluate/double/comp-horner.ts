
import { EFTHorner as EFTHorner_ } from "./eft-horner";
import { HornerSum as HornerSum_ } from "./horner-sum";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const EFTHorner = EFTHorner_;
const HornerSum = HornerSum_;


/** 
 * Returns a result of evaluating a univariate polynomial using once compensated
 * Horner's method. 
 * 
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is equivalent as using
 * double-double precision in a normal Horner evaluation
 * 
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function compHorner(p: number[], x: number): number {
	const { r̂, pπ, pσ } = EFTHorner(p,x);
	const ĉ = HornerSum(pπ, pσ, x);

	return r̂ + ĉ;
}


export { compHorner }
