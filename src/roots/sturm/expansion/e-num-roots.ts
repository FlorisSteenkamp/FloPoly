import { bNumRoots } from "../bigint/b-num-roots.js";
import { scaleFloatssToBigintss } from '../../../scale-to-int/scale-floatss-to-bigintss.js';
import { bSum } from "../../../util/bigint/b-sum.js";



/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞) 
 * of the given polynomial.
 * 
 * * From Wikipedia: "In the case of a non-square-free polynomial, 
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number 
 * of distinct real roots of P".
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript 
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRoots(p); //=> 4
 * ```
 * 
 * @doc
 */
function eNumRoots(p: number[][]): number {
    return bNumRoots(scaleFloatssToBigintss(p).map(bSum));
}


export { eNumRoots }
