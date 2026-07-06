import { add } from '../../basic/double/add.js';
import { multiply } from '../../basic/double/multiply.js';
/**
 * Returns the polynomial composition `p(q(x))` over double coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function compose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p) {
        r = add(multiply(r, q), [c]);
    }
    return r;
}
export { compose };
//# sourceMappingURL=compose.js.map