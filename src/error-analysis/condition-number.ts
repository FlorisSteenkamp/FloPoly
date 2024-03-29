import { absCoeff } from "../basic/double/abs-coeff.js";
import { CompHornerK } from "../evaluate/double/comp-horner-k.js";


/**
 * Returns an accurate estimate (K === 4 => double-double-double-double 
 * precision) of the condition number of the given polynomial when evaluated at 
 * a given point.
 * 
 * * **for testing purposes**
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function conditionNumber(p: number[], x: number): number {
    const pN = absCoeff(p);
    const pD = p;

    const N = CompHornerK(pN, x, 4);
    const D = Math.abs(CompHornerK(pD, x, 4));

    return Math.abs(N / D);
}


export { conditionNumber }
