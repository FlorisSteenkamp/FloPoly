/**
 * Returns the Classical Mignotte polynomial of the form `x^d - 2*(v*x - 1)^2`
 * with coefficients represented as double-double floating point numbers.
 *
 * * root seperation of Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * * a classic ill-conditioned polynomial with two real roots very close
 *   together (near `x = 1/v`), used to stress-test root isolation.
 *
 * * the coefficients are exact (bar overflow) since `v²` is calculated as a
 *   double-double
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 *
 * @example
 * ```typescript
 * ddGenerateMignottePolynomial(3, 2);  //=> [[0,1], [0,-8], [0,8], [0,-2]]
 * ```
 *
 * @doc
 */
declare function ddGenerateMignottePolynomial(d: number, v: number): number[][];
export { ddGenerateMignottePolynomial };
