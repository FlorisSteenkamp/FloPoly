import { ddAddDd } from "double-double";
import { ddRemoveLeadingZeros } from "./dd-remove-leading-zeros.js";


/**
 * Returns the result of adding two polynomials in double-double precision.
 * 
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial
 *
 * @doc
 */
function ddAdd(
        p1: number[][],
        p2: number[][]): number[][] {

    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = Math.max(d1, d2);
    
    // Add coefficients
    const result = new Array<number[]>(d + 1);
    const minD = Math.min(d1, d2);
    
    // Add where both polynomials overlap
    for (let i = 0; i <= minD; i++) {
        result[d - i] = ddAddDd(p1[d1 - i], p2[d2 - i]);
    }
    
    // Copy remaining coefficients from longer polynomial
    for (let i = minD + 1; i <= d1; i++) {
        result[d - i] = p1[d1 - i];
    }
    for (let i = minD + 1; i <= d2; i++) {
        result[d - i] = p2[d2 - i];
    }
    
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}


export { ddAdd }


// Quokka tests
// ddAdd([[0,1],[0,2],[0,3]],[[0,3],[0,4]]);  /*?*/  //=> [1,5,7]