import { bNumRoots } from "../bigint/b-num-roots.js";
import { scaleFloatssToBigintss } from '../../../scale-to-int/scale-floatss-to-bigintss.js';
import { bSum } from "../../../util/bigint/b-sum.js";


/**
 * Returns the *exact* number of *distinct* real roots in the open interval (-∞,+∞) 
 * of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
