import { twoProduct } from "big-float-ts";
import { ddAddDd } from "double-double";
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
function ddGenerateMignottePolynomial(d, v) {
    if (d < 2) {
        throw new Error('The degree `d` must be >= 2.');
    }
    // Mignotte polynomial: x^d - 2*(v*x - 1)^2
    //   = x^d - 2*v^2*x^2 + 4*v*x - 2
    const p = [];
    for (let i = 0; i <= d; i++) {
        p.push([0, 0]); // (fresh arrays - no aliasing)
    }
    const vv = twoProduct(v, v); // v² exactly (as a double-double)
    const lo = vv[0] === 0 ? 0 : -2 * vv[0];
    const m2vv = [lo, -2 * vv[1]]; // -2v² exactly
    p[0] = [0, 1]; // x^d
    p[d - 2] = d === 2 ? ddAddDd(p[0], m2vv) : m2vv; // x^2 (or x^d - 2v²x² if d === 2)
    p[d - 1] = [0, 4 * v]; // x^1
    p[d] = [0, -2]; // x^0
    return p;
}
export { ddGenerateMignottePolynomial };
//# sourceMappingURL=dd-generate-mignotte-poly.js.map