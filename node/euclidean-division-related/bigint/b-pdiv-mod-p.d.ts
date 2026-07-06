/**
 * Returns the `quotient` and `remainder` of the division of `a/b` (`a`, `b`
 * both being polynomials), i.e. performs Euclidean (i.e. long) division on
 * the two given polynomials, a/b, and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`.
 *
 * * calculations are done in `ℤ_p`, i.e. modulo the prime `p`.
 *
 * * **precondition:** `b !== []`, i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial `b` in the formula `a = bq + r`
 *
 * @internal
 */
declare function bPdivModP(a: bigint[], b: bigint[], p: bigint): {
    q: bigint[];
    r: bigint[];
};
export { bPdivModP };
