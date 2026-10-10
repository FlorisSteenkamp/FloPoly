import { ddMultDouble2 as ddMultD, ddMultDd } from "double-double";


/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double-double precision.
 *
 * * the powers of `s` are kept in double-double precision (see also
 *   [[ddScaleWithInpErr]])
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 *
 * @example
 * ```typescript
 * ddScale([[0,1],[0,2],[0,7]], 3); //=> [[0,9],[0,6],[0,7]]
 * ```
 *
 * @doc
 */
function ddScale(
        p: number[][],
        s: number): number[][] {

    const r = p.slice();
    inplaceDdScale(r, s);

    return r;
}


/**
 * ❗**MODIFIES**❗ the polynomial such that `p(x)` -> `p(s·x)`,
 * i.e. the coefficient of `xⁱ` scaled by `sⁱ` in double-double precision.
 *
 * * the powers of `s` are kept in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 *
 * @doc
 */
function inplaceDdScale(
        p: number[][],
        s: number): void {

    const n = p.length - 1;
    if (n < 0) { return; }

    let sPow = [0,s];  // sⁱ in double-double precision
    for (let i=1; i<=n; i++) {
        p[n - i] = ddMultDd(sPow, p[n - i]);
        sPow = ddMultD(s, sPow);
    }
}


export { ddScale, inplaceDdScale }
