import { ddMultDouble2 as qmd, ddAddDd as qaq } from "double-double";


/** 
 * Returns the exact result (bar underflow / overflow) of evaluating a 
 * univariate polynomial using Horner's method - the result is returned as a
 * Schewchuk expansion.
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * Schewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function ddHorner(p: number[][], x: number): number[] {
    let q = [0,0];

    for (let i=0; i<p.length; i++) {
        // q = p[i] + x*q;
        q = qaq(p[i], qmd(x,q));
    }
    
    return q;
}


export { ddHorner }


// Quokka tests

// ddHorner([[0,1],[0,1],[0,-2],[0,3]], 0.25); //?
