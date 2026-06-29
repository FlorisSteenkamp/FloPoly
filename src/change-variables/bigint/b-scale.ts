
const bChangeVariablesScale = bScale;


 /**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`.
 * 
 * @param p a polynomial with coefficients given densely as an array of bigint
 * numbers from highest to lowest power, e.g. `[5n,-3n,0n]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * 
 * @example
 * ```typescript
 * bScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
 * ```
 * 
 * @doc
 */
function bScale(
        p: bigint[],
        s: bigint): bigint[] {

    const n = p.length - 1;
    if (n < 0) { return []; }

    const r = new Array<bigint>(n + 1);
    r[n] = p[n];

    let sPow = s;
    for (let i=1; i<=n; i++) {
        r[n - i] = p[n - i] * sPow;
        sPow *= s;
    }

    return r;
}


export { bScale, bChangeVariablesScale }
