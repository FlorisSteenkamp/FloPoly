import { ddDiffDd } from 'double-double';
import { ddRemoveLeadingZeros } from "./dd-remove-leading-zeros.js";


/** 
 * Returns the result of subtracting the second polynomial from the first in 
 * double-double precision; (p1 - p2).
 * 
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial 
 * with coefficients given densely as an array of double-double floating point numbers 
 * from highest to lowest power
 * @param p2 subtrahend; the polynomial that will be subtracted
 * 
 * @doc
 */
function ddSubtract(p1: number[][], p2: number[][]): number[][] {
    // Initialize result array  
    const d1 = p1.length-1;
    const d2 = p2.length-1;
    const Δd = d1-d2;
    
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    
    const d = Math.max(d1, d2);
    
    // Add coefficients
    const result: number[][] = [];
    for (let i=0; i<d+1; i++) {
        const c1 = p1[i+Δd1] || [0,0];
        const c2 = p2[i+Δd2] || [0,0];

        result.push(ddDiffDd(c1,c2));
    }
    
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}


export { ddSubtract }
