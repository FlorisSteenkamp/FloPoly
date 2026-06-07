import { ddRemoveLeadingZeros } from "./dd-remove-leading-zeros.js";
import { ddMultDd as qmq, ddAddDd as qaq } from "double-double";


/**
 * Returns the result of multiplying 2 double-double precision coefficient
 * polynomials.
 * 
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 * 
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial.
 * 
 * @doc
 */
function ddMultiply(p1: number[][], p2: number[][]): number[][] {
    const d1 = p1.length-1;
    const d2 = p2.length-1;

    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) { 
        return [];
    }

    const d = d1+d2;
    const r: number[][] = new Array(d+1).fill([0,0]);
    for (let i=0; i<d1+1; i++) {
        for (let j=0; j<d2+1; j++) {
            // r[d-(i+j)] += (p1[d1-i] * p2[d2-j]);
            r[d-(i+j)] = qaq(r[d-(i+j)], qmq(p1[d1-i], p2[d2-j]));
        }
    }

    return ddRemoveLeadingZeros(r);
}


export { ddMultiply }


// Quokka tests

// ddMultiply([[0,1],[0,2],[0,3]], [[0,2],[0,5],[0,3],[0,5]]); /*?*/  //=> [2, 9, 19, 26, 19, 15]