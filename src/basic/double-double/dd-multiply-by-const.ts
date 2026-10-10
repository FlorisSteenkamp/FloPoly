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
    if (c[1] === 0) { return []; }  // the zero polynomial
    
    const d = p.length;
    const p_ = new Array<number[]>(d);
    for (let i=0; i<d; i++) {
        p_[i] = ddMultDd(c,p[i]);
    }
    
    // We *have* to clip due to possible floating point underflow
    return ddRemoveLeadingZeros(p_);
}


export  { ddMultiplyByConst }

