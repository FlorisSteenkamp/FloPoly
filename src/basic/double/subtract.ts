import { removeLeadingZeros } from "./remove-leading-zeros.js";

const { min, max } = Math;


/** 
 * Returns the result of subtracting the second polynomial from the first in 
 * double precision; (p1 - p2).
 * 
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial 
 * with coefficients given densely as an array of double floating point numbers 
 * from highest to lowest power, e.g. `[5,-3,0]` represents the 
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 * 
 * @example
 * ```typescript
 * subtract([2,3],[4,4]); //=> [-2, -1]
 * ```
 * 
 * @doc
 */
function subtract(
        p1: number[],
        p2: number[]): number[] {

    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = max(d1, d2);

    // Subtract coefficients
    const r = new Array<number>(d + 1);
    const minD = min(d1, d2);

    // Subtract where both polynomials overlap
    for (let i=0; i <= minD; i++) {
        r[d - i] = p1[d1 - i] - p2[d2 - i];
    }

    // Copy remaining coefficients from longer polynomial
    for (let i = minD + 1; i <= d1; i++) {
        r[d - i] = p1[d1 - i];
    }
    for (let i = minD + 1; i <= d2; i++) {
        r[d - i] = -p2[d2 - i];
    }

    // Ensure the result is a valid polynomial representation
    return removeLeadingZeros(r);
}


export { subtract }
