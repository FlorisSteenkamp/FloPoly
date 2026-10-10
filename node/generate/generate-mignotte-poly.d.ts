/**
 * Returns a Generalized Mignotte polynomial of the form `x^d - 2*(v*x - 1)^k`
 *
 * * if `k=2` then we get the classic Mignotte polynomial `x^d - 2*(v*x - 1)^2`
 * * if `k>2` then the clustered roots are not necessarily real
 * * root seperation of the Classical Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 * @param k defaults to `2`; the exponent (must be >= 2, if 2 then we get the classic Mignotte polynomial)
 *
 * @example
 * ```typescript
 * generateMignottePolynomial(3, 2);  //=> [1, -8, 8, -2]
 * ```
 *
 * @doc
 */
declare function generateMignottePolynomial(d: number, v: number, k?: number): number[];
export { generateMignottePolynomial };
