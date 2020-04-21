
import { scaleExpansion, qMultDouble2, estimate } from "flo-numerical";
import { γγ3, γ1 } from '../error-analysis/gamma';


const abs = Math.abs;


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
		result.push(qMultDouble2((d-i), p[i]));
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
		let c = qMultDouble2(deg, p[i]);
		dp.push(c);

        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
		let extraErr = (deg & deg-1) === 0 ? 0 : γγ3;
		
		let $c = estimate(c);
        dpE.push(
			//deg * (pE[i] + Math.abs($c)*extraErr)
			deg*pE[i] + abs($c)*extraErr
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
