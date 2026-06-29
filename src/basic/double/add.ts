import { removeLeadingZeros } from "./remove-leading-zeros.js";


/**
 * Returns the result of adding two polynomials in double precision.
 * 
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * 
 * @example
 * ```typescript
 * add([1,2,3],[3,4]); //=> [1,5,7]
 * ```
 * 
 * @doc
 */
function add(
        p1: number[],
        p2: number[]): number[] {

    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = Math.max(d1, d2);
    
    // Add coefficients
    const r = new Array<number>(d + 1);
    const minD = Math.min(d1, d2);

    // Add where both polynomials overlap
    for (let i=0; i <= minD; i++) {
        r[d - i] = p1[d1 - i] + p2[d2 - i];
    }
    
    // Copy remaining coefficients from longer polynomial
    for (let i = minD + 1; i <= d1; i++) {
        r[d - i] = p1[d1 - i];
    }
    for (let i = minD + 1; i <= d2; i++) {
        r[d - i] = p2[d2 - i];
    }

    // Ensure the result is a valid polynomial representation
    return removeLeadingZeros(r);
}


export { add }
