import { eAdd, eCompress, eMultDouble1 } from "big-float-ts";


const eChangeVariablesTranslateX = eTaylorShift;


/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 * 
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk expansion
 * floating point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function eTaylorShift(
        p: number[][],
        h: number): number[][] {

    const n = p.length - 1;
    if (n < 0) { return []; }

    const q = p.slice();
    for (let k=0; k<=n; k++) {
        for (let i=1; i<=n - k; i++) {
            q[i] = eCompress(eAdd(q[i], eMultDouble1(q[i - 1], h)));
        }
    }

    return q;
}


export { eTaylorShift, eChangeVariablesTranslateX }
