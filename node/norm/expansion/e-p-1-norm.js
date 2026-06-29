import { eEstimate } from "big-float-ts";
/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of Shewchuk expansions (with intermediate
 * calculations (and the final result) done in double precision).
 *
 * * if the array of expansions represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of Shewchuk expansions
 *
 * @doc
 */
function eP1Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += Math.abs(eEstimate(p[i]));
    }
    return s;
}
export { eP1Norm };
//# sourceMappingURL=e-p-1-norm.js.map