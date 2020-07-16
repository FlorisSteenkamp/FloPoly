
//import { twoSum } from "big-float-ts";
import { EFTHorner as EFTHorner_ } from "./eft-horner";
import { HornerSum as HornerSum_ } from "./horner-sum";
import { HornerAbsSum as HornerAbsSum_ } from "./horner-abs-sum";
import { γs as γs_ } from "./gammas";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { twoSum } = bigFloatOperators;
const HornerSum = HornerSum_;
const EFTHorner = EFTHorner_;
const HornerAbsSum = HornerAbsSum_;
const γs = γs_;


const u = Number.EPSILON;


/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a dynamic check for faithfull rounding and a 
 * certified running error bound.
 * 
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
function compHornerIsFaithful(p: number[], x: number) {
	let n = p.length-1;
	
	let { r̂, pπ, pσ } = EFTHorner(p,x);
	let ĉ = HornerSum(pπ, pσ, x);
	let [e, r̄] = twoSum(r̂, ĉ);

	let b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
	let α̂  = (γs[2*n - 1] * b̂) / ((1 - 2*(n+1) * u));
	let β̂  = (α̂ + Math.abs(e)) / (1 - 2*u);

	return { 
		isFaithful: α̂  < (u/2) * Math.abs(r̄),
		errBound: β̂,
		r̄
	};
}


export { compHornerIsFaithful }
