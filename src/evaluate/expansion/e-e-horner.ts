import { fastExpansionSum } from "big-float-ts";
import { expansionProduct } from "big-float-ts";


/**
 * Returns the exact result (bar underflow / overflow) of evaluating a 
 * univariate polynomial at a point given as a Schewchuk expansion using 
 * Horner's method - the result is returned as a Schewchuk expansion.
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * Schewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function eeHorner(p: number[][], x: number[]): number[] {
    let result = [0]; 
    for (let i=0; i<p.length; i++) {
        result = fastExpansionSum(p[i], expansionProduct(result, x));
    }
    
    return result;
}


export { eeHorner }
