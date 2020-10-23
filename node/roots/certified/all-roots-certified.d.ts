import { RootInterval } from "./root-interval";
/**
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
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`; if the
 * coefficients are double precision (as opposed to double-double) then instead
 * of passing `p` pass `p.map(c => [0,c])` - this will transform the
 * coefficients to double-double precision
 * @param lb defaults to 0; lower bound of roots to be returned;
 * `Number.NEGATIVE_INFINITY` may be given if there is no lower bound
 * @param ub defaults to 1; upper bound of roots to be returned;
 * `Number.POSITIVE_INFINITY` may be given if there is no upper bound
 * @param pE defaults to `undefined`; an error polynomial that provides a
 * coefficientwise error bound on the input polynomial; all coefficients must
 * be positive; if `undefined `then the input polynomial will be assumed exact
 * @param getPExact defaults to `undefined`; a function returning the exact
 * polynomial (with coefficients given as Shewchuk expansions (see the example
 * below)) - `getPExact` will *only* be called if required (and can thus be
 * lazy loaded) when the error bounds are too high during calculation
 * preventing certification of the root intervals; if `undefined `then the
 * input polynomial will be assumed exact
 *
 * @example
 *
 * // ---------------------------------------------------------------
 * // 1. a basic example of an order 11 polynomial (with 10 roots) --
 * // ---------------------------------------------------------------
 * TODO
 *
 *
 * // -----------------------------------------------------------------------
 * // 2. the Wilksonson polynomial of degree 50 (an *extremely* hard case) --
 * // -----------------------------------------------------------------------
 * const _roots = [...Array(50+1).keys()].slice(1).map(c => [c]);  // => [1,2,3,...,50]
 * const { pDd: p, pE, getPExact } = eFromRoots(_roots);
 * // => polynomial of degree 50 with double-double precision coefficients
 * //    including coefficient-wise error bound polynomial and a function to
 * //    return the exact polynomial with Shewchuk expansion coefficients
 * //console.log(toCasStr(getPExact()));
 * // => x^50 - 1275*x^49 + 791350*x^48 - 318622500*x^47 + 93570498490*x^46 -
 * //    21366198225750*x^45 + 3949131291964600*x^44 - ...
 * const roots = allRootsCertified(p,0,51,pE,getPExact);
 * console.log(roots);  // => [
 * //	{ tS: 1, tE: 1, multiplicity: 1 },
 * //	{ tS: 2, tE: 2, multiplicity: 1 },
 * //	.
 * //	.
 * //	.
 * //	{ tS: 50, tE: 50, multiplicity: 1 }
 * // ]
 * //
 * // ...thus roots are returned accurately.
 * //
 * // Note: Due to floating point overflow of the evaluation of a Wilkinson
 * // polynomial of degree >= 58 evaluated at 59 the returned roots starts
 * // getting inaccurate at this degree (i.e. >= 58).
 */
declare function allRootsCertified(p: number[][], lb?: number, ub?: number, pE?: number[], getPExact?: () => number[][]): RootInterval[];
export { allRootsCertified };
