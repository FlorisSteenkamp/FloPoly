/**
 * Every coeﬃcient of the gcd of `a` and `b` in `Z[x]` is bounded in absolute
 * value by `2^min(deg(a),deg(b)) * gcd(lc(a),lc(b)) * min(||a||/|lc(a)|, ||b||/|lc(b)|)`.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q
 */
declare function bLandauMignotteBound(p: bigint[], q: bigint[]): number;
export { bLandauMignotteBound };
