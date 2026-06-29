
const changeVariablesScale = scale;


 /**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
 * in double precision.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * 
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 * 
 * @doc
 */
function scale(
        p: number[],
        s: number): number[] {

    const n = p.length - 1;
    if (n < 0) { return []; }

    const r = new Array<number>(n + 1);
    r[n] = p[n];

    let sPow = s;
    for (let i=1; i<=n; i++) {
        r[n - i] = p[n - i] * sPow;
        sPow *= s;
    }

    return r;
}


/**
 * ❗**MODIFIES**❗ the polynomial such that `p(x)` -> `p(s·x)`,
 * i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 * 
 * @doc
 */
function inplaceScale(
        p: number[],
        s: number): void {

    const n = p.length - 1;
    if (n < 0) { return; }

    let sPow = s;
    for (let i=1; i<=n; i++) {
        p[n - i] = p[n - i] * sPow;

        sPow *= s;
    }
}


export { scale, inplaceScale, changeVariablesScale }
