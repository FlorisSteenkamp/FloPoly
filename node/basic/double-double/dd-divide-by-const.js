import { ddDivDd } from "double-double";
/**
 * Divides a polynomial by a constant in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-doulbe precision
 *
 * @doc
 */
function ddDivideByConst(p, c) {
    const d = p.length;
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(ddDivDd(p[i], c));
    }
    return r;
}
export { ddDivideByConst };
//# sourceMappingURL=dd-divide-by-const.js.map