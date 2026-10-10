import { ddDivDd } from "double-double";
import { ddRemoveLeadingZeros } from "./dd-remove-leading-zeros.js";
/**
 * Divides a polynomial by a constant in double-double precision.
 *
 * * leading zero coefficients (possible due to underflow) are removed from
 *   the result
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-double precision
 *
 * @doc
 */
function ddDivideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = ddDivDd(p[i], c);
    }
    return ddRemoveLeadingZeros(r);
}
export { ddDivideByConst };
//# sourceMappingURL=dd-divide-by-const.js.map