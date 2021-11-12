import { twoSum as twoSum_ } from "big-float-ts";
import { EFTHorner as EFTHorner_ } from "./eft-horner.js";import { EFTHorner as EFTHorner_ } from "./eft-horner.jsimport { EFTHorner as EFTHorner_ } from "./eft-horner.jsimport { EFTHorner as EFTHorner_ } from "./eft-horner.js
import { HornerSum as HornerSum_ } from "./horner-sum";
import { HornerAbsSum as HornerAbsSum_ } from "./horner-abs-sum";
import { γs as γs_ } from "./gammas";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const twoSum = twoSum_;
const EFTHorner = EFTHorner_;
const HornerSum = HornerSum_;
const HornerAbsSum = HornerAbsSum_;

const γs = γs_;


const u = Number.EPSILON / 2;


/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound as an array in the 
 * form: [result, absolute error].
 * 
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
 * 
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is the same as using
 * double-double precision in a normal Horner evaluation
 * 
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function compHornerWithRunningError(p: number[], x: number): number[] {
	const n = p.length-1;
	
	const { r̂, pπ, pσ } = EFTHorner(p,x);
	// inlined
	//const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];	for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
	const ĉ = HornerSum(pπ, pσ, x);
	const [e, r̄] = twoSum(r̂, ĉ);

	const b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
	const α̂  = (γs(2*n - 1) * b̂) / ((1 - 2*(n+1) * u));
	const β̂  = (α̂ + Math.abs(e)) / (1 - 2*u);

	return [r̄, β̂ ];
}


export { compHornerWithRunningError }
