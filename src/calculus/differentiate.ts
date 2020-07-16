
//import { scaleExpansion, eEstimate } from "big-float-ts";
//import { ddMultDouble2 } from 'double-double';
import { γγ as γγ_ } from '../error-analysis/gamma';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as ddOperators } from "double-double";
import { operators as bigFloatOperators } from "big-float-ts";
const { ddMultDouble2 } = ddOperators;
const { scaleExpansion, eEstimate } = bigFloatOperators;
const γγ = γγ_;
const γγ3 = γγ(3);


/**  
 * Returns the approximate result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiate(p: number[]): number[] {
	
	let result = [];
	
	let d = p.length - 1;
	for (let i=0; i<d; i++) {
		result.push((d-i) * p[i]);
	}
	
	return result;
}


/**  
 * Returns the result of differentiating the given polynomial in quad precision.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiateQuad(p: number[][]): number[][] {
	let result: number[][] = [];
	
	let d = p.length - 1;
	for (let i=0; i<d; i++) {
		result.push(ddMultDouble2((d-i), p[i]));
	}
	
	return result;
}


/**
 * * precondition: max degree of p === 9
 * @param p a quad precision polynomial
 * @param pE 
 */
function differentiateQuadWithError(
		{p,pE}: { p: number[][], pE: number[] }) {

	let dp: number[][] = [];
    let dpE: number[] = [];

    let d = p.length - 1;
    for (let i=0; i<d; i++) {
		let deg = d-i;
		let c = ddMultDouble2(deg, p[i]);
		dp.push(c);

        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
		let extraErr = (deg & deg-1) === 0 ? 0 : γγ3;
		
		let $c = eEstimate(c);
        dpE.push(
			//deg * (pE[i] + Math.abs($c)*extraErr)
			deg*pE[i] + Math.abs($c)*extraErr
		);
    }

    return { p: dp, pE: dpE };
}


/**  
 * Returns the exact result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 */
function differentiateExact(p: number[][]): number[][] {
	
	let result: number[][] = [];
	
	let d = p.length - 1;
	for (let i=0; i<d; i++) {
		result.push(scaleExpansion(p[i], d-i));
	}
	
	return result;
}


export { differentiate, differentiateQuad, differentiateExact, differentiateQuadWithError }
