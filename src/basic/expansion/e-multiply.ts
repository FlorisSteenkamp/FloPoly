
import { eRemoveLeadingZeros as eRemoveLeadingZeros_ } from "./e-remove-leading-zeros";
import { expansionProduct as expansionProduct_ } from "big-float-ts";
import { fastExpansionSum as fastExpansionSum_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eRemoveLeadingZeros = eRemoveLeadingZeros_;
const expansionProduct = expansionProduct_;
const fastExpansionSum = fastExpansionSum_;


/**
 * Returns the exact result (bar underflow / overflow) of multiplying two 
 * polynomials (with coefficients given as Shewchuk floating point expansions).
 * 
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 * 
 * @param a a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial.
 * 
 * @example
 * eMultiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 */
function eMultiply(
		a: number[][], b: number[][]): number[][] {

	const da = a.length-1;
	const db = b.length-1;

	// if either or both is the zero polynomial
	if (da < 0 || db < 0) { 
		return [];
	}

	const d = da + db;
	const result: number[][] = new Array(d+1).fill([0]);
	for (let i=0; i<da+1; i++) {
		for (let j=0; j<db+1; j++) {
			result[d-(i+j)] = fastExpansionSum(
				result[d-(i+j)],
				expansionProduct(a[da-i], b[db-j])
			);
		}
	}

	return eRemoveLeadingZeros(result);
}


export { eMultiply }
