import { eRemoveLeadingZeros } from "./e-remove-leading-zeros.js";
import { expansionProduct, eSum } from "big-float-ts";


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
 * ```typescript
 * eMultiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 * ```
 * 
 * @doc
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
    // collect the products contributing to each coefficient and sum them 
    // once (rather than accumulating with ever growing expansions)
    const terms: number[][][] = new Array(d+1);
    for (let k=0; k<=d; k++) { terms[k] = []; }
    for (let i=0; i<da+1; i++) {
        for (let j=0; j<db+1; j++) {
            terms[d-(i+j)].push(expansionProduct(a[da-i], b[db-j]));
        }
    }

    const result: number[][] = new Array(d+1);
    for (let k=0; k<=d; k++) {
        result[k] = eSum(terms[k]);
    }

    return eRemoveLeadingZeros(result);
}


export { eMultiply }
