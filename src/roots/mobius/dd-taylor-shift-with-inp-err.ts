import { ddAddDd, ddMultDouble2 as ddMultD } from 'double-double';

const { abs } = Math;


/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds that
 * has **not** been scaled by `γγ(3)` yet.
 * 
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function ddTaylorShiftWithInpErr(
        p: number[][],
        h: number,
        p_: number[]): [number[][],number[]] {

    const n = p.length - 1;
    if (n < 0) { return [[],[]]; }

    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = abs(h);

    const q = p.slice();
    const q_ = p_.slice();
    for (let k=0; k<=n; k++) {
        for (let i=1; i<=n - k; i++) {
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];

            const hq = ddMultD(h, qi1);
            const hq_ = _h*qi1_ + abs(hq[1]);

            const qi = q[i];
            q[i] = ddAddDd(qi, hq);
            q_[i] = q_[i] + hq_ + abs(q[i][1])
        }
    }

    return [q,q_];
}


export { ddTaylorShiftWithInpErr }
