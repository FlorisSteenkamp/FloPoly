import type { RootInterval } from '../root-interval.js';
/**
 * Returns a list of intervals isolating the roots of the given polynomial
 * within the given interval `[lb,ub]`.
 *
 * * the interval might be extended if roots fall close to its endpoints.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`; this polynomial is derived
 * from `pDd` as a double precision approximation
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ an array of numbers representing the absolute error bounds on the
 * coefficients of `pDd`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param lb the start of the interval to search for roots
 * @param ub the end of the interval to search for roots
 * @param getPExact defaults to `undefined`; a function returning the exact
 * polynomial (with coefficients given as Shewchuk expansions)
 *
 * @internal
 */
declare function isolateRoots(p: number[], pDd: number[][], pDd_: number[], lb: number, ub: number, getPExact: () => number[][]): RootInterval[];
export { isolateRoots };
