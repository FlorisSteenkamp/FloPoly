
import { 
	removeLeadingZeros as removeLeadingZeros_, 
	expRemoveLeadingZeros as expRemoveLeadingZeros_
} from "./remove-leading-zeros";
//import { fastExpansionSum } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { fastExpansionSum } = bigFloatOperators;
const removeLeadingZeros = removeLeadingZeros_;
const expRemoveLeadingZeros = expRemoveLeadingZeros_;


/**
 * Returns the approximate result of adding two polynomials.
 * @param p1 a polynomial
 * @param p2 another polynomial
 * @example
 * add([1,2,3],[3,4]); //=> [1,5,7]
 */
function add(p1: number[], p2: number[]): number[] {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = Δd < 0 ? +Δd : 0;
	let Δd2 = Δd > 0 ? -Δd : 0;
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1] || 0;
		let c2 = p2[i+Δd2] || 0;
		result.push(c1 + c2);  
	}
	
	// Ensure the result is a valid polynomial representation
	return removeLeadingZeros(result);
}


/**
 * Returns the exact result of adding two polynomials.
 * @param p1 a polynomial with floating point expansion coefficients
 * @param p2 another polynomial with floating point expansion coefficients
 * @example
 * add([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 */
function addExact(p1: number[][], p2: number[][]): number[][] {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = Δd < 0 ? +Δd : 0;
	let Δd2 = Δd > 0 ? -Δd : 0;
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1] || [0];
		let c2 = p2[i+Δd2] || [0];
		result.push(fastExpansionSum(c1, c2));  
	}
	
	// Ensure the result is a valid polynomial representation
	return expRemoveLeadingZeros(result);
}


export { add, addExact }
