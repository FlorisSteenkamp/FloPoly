
import { eAbs as eAbs_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eAbs = eAbs_;


/**
 * Returns the polynomial with all coeffients the absolute value of the given 
 * polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 */
function eAbsCoeff(p: number[][]) {
    const p_: number[][] = [];
    for (let i=0; i<p.length; i++) {
        p_.push(eAbs(p[i]));
    }

    return p_;
}


export { eAbsCoeff }
