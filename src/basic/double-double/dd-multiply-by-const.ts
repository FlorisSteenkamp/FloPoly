import { ddMultDd } from "double-double";
import { ddRemoveLeadingZeros } from "./dd-remove-leading-zeros.js";


/** 
 * Returns the result of multiplies a polynomial by a constant in double-double
 * precision.
 * 
 * @param c a constant in double-double precision
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */
function ddMultiplyByConst(c: number[], p: number[][]): number[][] {
    if (c[1] === 0) { return [[0,0]]; }
    
    const d = p.length;
    const p_: number[][] = [];
    for (let i=0; i<d; i++) {
        p_.push(ddMultDd(c,p[i]));
    }
    
    // We *have* to clip due to possible floating point underflow
    return ddRemoveLeadingZeros(p_);
}


export  { ddMultiplyByConst }


// Quokka tests
// ddMultiplyByConst([0,0.25], [[0,3],[0,2],[0,1]]);  /*?*/ //=> [0.75, 0.5, 0.25]