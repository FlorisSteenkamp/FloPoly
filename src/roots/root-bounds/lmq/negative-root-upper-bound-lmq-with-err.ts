import { upperToLowerBound_WithError } from "../upper-to-lower-bound-with-err.js";
import { negativeRootLowerBound_LMQ_WithError } from "./negative-root-lower-bound-lmq-with-err.js";


/** 
 * Returns a negative upper (closer to zero) bound of the real roots of the 
 * given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
const negativeRootUpperBound_LMQ_WithError =
    upperToLowerBound_WithError(negativeRootLowerBound_LMQ_WithError);


export { negativeRootUpperBound_LMQ_WithError }
