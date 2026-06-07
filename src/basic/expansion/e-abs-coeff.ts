import { eAbs } from "big-float-ts";


/**
 * Returns the polynomial with all coeffients the absolute value of the given 
 * polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Schewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function eAbsCoeff(p: number[][]): number[][] {
    const p_: number[][] = [];
    for (let i=0; i<p.length; i++) {
        p_.push(eAbs(p[i]));
    }

    return p_;
}


export { eAbsCoeff }
