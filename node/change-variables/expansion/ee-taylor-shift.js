import { eAdd, eMult, eCompress } from "big-float-ts";
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * the calculations are exact (bar overflow / underflow)
 *
 * * see also [[eTaylorShift]] where `h` is a double
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount (given as a Shewchuk floating point expansion)
 *
 * @doc
 */
function eeTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            // q[i] = q[i] + h*q[i - 1];
            // (compressed at each step to keep the expansions short)
            q[i] = eCompress(eAdd(q[i], eMult(h, q[i - 1])));
        }
    }
    return q;
}
export { eeTaylorShift };
//# sourceMappingURL=ee-taylor-shift.js.map