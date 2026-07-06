import { ddAddDd, ddMultDouble2 as ddMultD } from 'double-double';
/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function ddTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            q[i] = ddAddDd(q[i], ddMultD(h, q[i - 1]));
        }
    }
    return q;
}
export { ddTaylorShift };
//# sourceMappingURL=dd-taylor-shift.js.map