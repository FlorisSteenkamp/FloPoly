
import { EFTHorner } from "./eft-horner";
import { HornerSum } from "./horner-sum";
import { twoSum, twoProduct } from "flo-numerical";
import { HornerAbsSum } from "./horner-abs-sum";
import { γs } from "./gammas";


let u = Number.EPSILON / 2;


/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound.
 * 
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
 * 
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
function compHornerWithRunningError(p: number[], x: number) {
	let n = p.length-1;
	
	let { r̂, pπ, pσ } = EFTHorner(p,x);
	// inlined
	//let pπ: number[] = []; let pσ: number[] = []; let σ: number; let r̂ = p[0];	for (let i=1; i<p.length; i++) { let [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
	let ĉ = HornerSum(pπ, pσ, x);
	let [e, r̄] = twoSum(r̂, ĉ);

	let b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
	let α̂  = (γs[2*n - 1] * b̂) / ((1 - 2*(n+1) * u));
	let β̂  = (α̂ + Math.abs(e)) / (1 - 2*u);

	return [r̄, β̂ ];
}


export { compHornerWithRunningError }
