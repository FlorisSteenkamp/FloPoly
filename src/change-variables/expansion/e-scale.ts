import { eMultDouble1 } from "big-float-ts";


const eChangeVariablesScale = eScale;


/**
 * Returns the polynomial `f(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 */
function eScale(
        p: number[][],
        s: number): number[][] {

    const n = p.length - 1;
    if (n < 0) { return []; }

    const r = new Array<number[]>(n + 1);
    r[n] = p[n];
    let sPow = s;
    for (let i=1; i<=n; i++) {
        r[n - i] = eMultDouble1(p[n - i], sPow);
        sPow *= s;
    }

    return r;
}


export { eScale, eChangeVariablesScale }
