import { ddAbs } from "double-double";


/**
 * Returns the polynomial with all coeffients the absolute value of the given 
 * polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */
function ddAbsCoeff(p: number[][]): number[][] {
    const p_: number[][] = [];
    for (let i=0; i<p.length; i++) {
        p_.push(ddAbs(p[i]));
    }

    return p_;
}


export { ddAbsCoeff }
