import { bDegree } from "../../basic/bigint/b-degree.js";
import { bElevateDegree } from "./b-elevate-degree.js";
import { bAdd } from "../../basic/bigint/b-add.js";
import { bMultiply } from "../../basic/bigint/b-multiply.js";
import { bSubtract } from "../../basic/bigint/b-subtract.js";
/**
 * * **Used internally**
 *
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (`a`, `b`
 * both being polynomials) naively, i.e. in such a way that all intermediate
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the
 * remainder.
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
function bPdivInternal(a, b) {
    let q = [];
    const d = bDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = bDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        const s = bElevateDegree([r[0] / c], deg);
        q = bAdd(q, s);
        r = bSubtract(r, bMultiply(s, b));
    }
}
export { bPdivInternal };
//# sourceMappingURL=b-pdiv-internal.js.map