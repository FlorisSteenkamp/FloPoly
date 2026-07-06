import { add } from '../../basic/double/add.js';
import { degree } from '../../basic/double/degree.js';
import { multiply } from '../../basic/double/multiply.js';
import { removeLeadingZeros } from '../../basic/double/remove-leading-zeros.js';
import { subtract } from '../../basic/double/subtract.js';
/**
 * Returns the quotient and remainder of Euclidean long division of `a` by `b`
 * over double coefficients, i.e. `a = b*q + r` with `degree(r) < degree(b)`.
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 */
function divmod(a, b) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    let q = [];
    let r = removeLeadingZeros(a);
    const d = degree(b);
    const c = b[0];
    while (true) {
        const deg = degree(r) - d;
        if (deg < 0) {
            return { q: removeLeadingZeros(q), r: removeLeadingZeros(r) };
        }
        const s = elevateDegree([r[0] / c], deg);
        q = add(q, s);
        r = subtract(r, multiply(s, b));
    }
}
function elevateDegree(p, deg) {
    if (deg <= 0 || p.length === 0) {
        return p;
    }
    return p.concat(new Array(deg).fill(0));
}
export { divmod };
//# sourceMappingURL=divmod.js.map