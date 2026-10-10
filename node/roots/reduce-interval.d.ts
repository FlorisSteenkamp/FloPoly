/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * * the absolute coefficient-wise error bound used for the root bounds is
 *   `pDd_[i]*errorMultiplier + |p[i]|*γ1`, i.e. the given error bound (of the
 *   double-double precision polynomial) *plus* the round-off incurred when
 *   the double-double precision coefficients were rounded to the double
 *   precision coefficients `p` (which is at most half an ulp, i.e. `u|p[i]|`
 *   with `u <= γ1`); without the latter the family of polynomials for which
 *   the root bounds are calculated would not provably contain the exact
 *   polynomial
 *
 * @param lb
 * @param ub
 * @param p the polynomial with coefficients given as double precision
 * floating point numbers rounded from the double-double precision coefficients
 * @param pDd_ the coefficient-wise error bound of the double-double precision
 * polynomial that still needs to be multiplied by `errorMultiplier` to get
 * the actual absolute error bound
 * @param errorMultiplier the multiplier of `pDd_` to get the actual absolute
 * error bound, e.g. `γγ3` or `1`
 *
 * @internal
 */
declare function reduceInterval(lb: number, ub: number, p: number[], pDd_: number[], errorMultiplier: number): number[];
export { reduceInterval };
