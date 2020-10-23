"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRootsCertifiedSimplified = void 0;
const all_roots_certified_1 = require("./all-roots-certified");
/**
 * ❗ Simplified version of `allRootsCertified` - following are the changes:
 * * input polynomial coefficients are double precision numbers (as opposed
 * to double-double precision)
 * * the input polynomial coefficients are assumed exact; neither an error
 * polynomial nor a function to return a polynomial with exact coefficients can
 * be specified
 * * the search range lower and upper bounds defaults to
 * `Number.NEGATIVE_INFINITY` and `Number.POSITIVE_INFINITY` respectively
 *
 * Finds and returns all *certified* root intervals (bar underflow / overflow)
 * of the given polynomial, including their multiplicities (see points below).
 *
 * * returns an empty array for a constant or the zero polynomial
 *
 * * Let `W = m * Number.EPSILON * max(1, 2^⌈log₂r⌉)`, where
 *  * `r` is a root
 *  * `m` is the number of roots (the 'multiplicity') within the
 *     interval, where multiplicity here includes roots seperated by less than
 *    `2*Number.EPSILON` and not necessarily only exact multiple roots;
 *
 * * the returned intervals are of max width `W` - use `refineK` to
 * reduce the root interval widths further and thus 'resolving' the roots if
 * required
 *
 * * the retuned root intervals will contain *all* roots hence the *certified*
 * in the function name.
 *
 * * the reported multiplicities will be correct *up to a multiple of 2* in cases
 * where *more* than 1 root is reported in the interval `W` described above
 * (else if a multiplicity of 0 or 1 is reported the result is correct)
 * * `refineK` can then be used to resolve them further; note however
 * that root seperation is a function of polynomial height and can be very small
 * (see e.g. [Improving Root Separation Bounds, *Aaron Herman, Hoon Hong, Elias Tsigaridas*](https://hal.inria.fr/hal-01456686/document)
 *
 * * optimized for polynomials of degree 1 to about 30
 *  * this is due to [Rolle's Theorem](https://en.wikipedia.org/wiki/Rolle%27s_theorem)
 * being used and not [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *  * Descartes' methods are asymptotically faster and thus better suited for higher
 * degree polynomials but for lower degrees Rolle's Theorem seems to be faster
 *
 * * **precondition:** the coefficient magnitudes and degree of the polynomial
 *  must be such that overflow won't occur at evaluation points where roots
 * are searched for, e.g. a 20th degree polynomial with coefficients of
 * magnitude around `Number.MAX_SAFE_INTEGER (= 9007199254740991)` evaluated at
 * `x = 1000000` will evaluate to about `10^136` (10 the the power of 136) which
 * is way too small for overflow to occur, however when evaluated at `x = 10^15`
 * overflow will occur; to prevent this unlikely possibility (roots are
 * typically not that large in applications) limit the bounds `lb` and `ub`
 * where roots are to be searched for to the range of interest, i.e. don't set
 * them to infinity for automatic calculation
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param lb defaults to Number.NEGATIVE_INFINITY; lower bound of roots to be
 * returned
 * @param ub defaults to Number.POSITIVE_INFINITY; upper bound of roots to be
 * returned
 *
 * @example
 *
 * // -----------------------------------------------------------------
 * // 1. the Wilksonson polynomial (deemed one of the hardest cases) --
 * // -----------------------------------------------------------------
 * TODO
 *
 */
function allRootsCertifiedSimplified(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY) {
    return all_roots_certified_1.allRootsCertified(p.map(c => [0, c]), lb, ub);
}
exports.allRootsCertifiedSimplified = allRootsCertifiedSimplified;
//# sourceMappingURL=all-roots-certified-simplified.js.map