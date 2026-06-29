import { eMultiply } from "../../../basic/expansion/e-multiply.js";
import { eNegativeOf } from "big-float-ts";
import { eToDd } from "big-float-ts";
/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors (x - root1)(x - root2) in infinite precision
 * (bar overflow) and rounding back to double-double precision; also returns
 * a coefficient-wise error polynomial and a function that returns the exact
 * polynomial.
 *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots
 *
 * @doc
 */
function eFromRoots(roots) {
    let p = [[1]];
    for (let i = 0; i < roots.length; i++) {
        p = eMultiply(p, [[1], eNegativeOf(roots[i])]);
    }
    const pE = p.map(c => Math.abs(c[c.length - 1] * Number.EPSILON));
    const getPExact = () => p;
    return {
        pDd: p.map(eToDd),
        pE,
        getPExact
    };
}
export { eFromRoots };
//# sourceMappingURL=e-from-roots.js.map