import { ddDivDd } from "double-double";


/** 
 * Divides a polynomial by a constant in double-double precision.
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-double precision
 * 
 * @doc
 */
function ddDivideByConst(p: number[][], c: number[]): number[][] {
    const d = p.length;
    const r = new Array<number[]>(d);
    for (let i=0; i<d; i++) {
        r[i] = ddDivDd(p[i],c);
    }
    
    return r;
}


export { ddDivideByConst }
