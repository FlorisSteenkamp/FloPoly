import { ddMultDouble2 } from "double-double";
/**
 * Returns the result of differentiating the given polynomial (with coefficients
 * given in double-double precision) in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * ddDifferentiate([[0,5], [0,4], [0,3], [0,2], [0,1]]); //=> [[0,20], [0,12], [0,6], [0,2]]
 * ```
 *
 * @doc
 */
function ddDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = ddMultDouble2((d - i), p[i]);
    }
    return r;
}
export { ddDifferentiate };
//# sourceMappingURL=dd-differentiate.js.map