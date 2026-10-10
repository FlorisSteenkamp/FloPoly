/**
 * Returns an integer upper bound (calculated using bigints so that overflow
 * cannot occur) on the absolute value of every coefficient of the gcd of
 * `p` and `q` in `Z[x]`, i.e. the Landau-Mignotte bound
 * `2^min(deg(p),deg(q)) * gcd(lc(p),lc(q)) * min(||p||/|lc(p)|, ||q||/|lc(q)|)`
 * rounded up (exactly) to an integer.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * see also [[bLandauMignotteBound]] that returns the bound as a double (and
 *   that can overflow to `Infinity` for very large coefficients)
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q another polynomial
 *
 * @doc
 */
declare function bLandauMignotteBoundBigint(p: bigint[], q: bigint[]): bigint;
export { bLandauMignotteBoundBigint };
