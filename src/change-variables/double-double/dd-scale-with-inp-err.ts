import { ddMultDouble2 as ddMultD, ddMultDd } from 'double-double';

const { abs } = Math;

/**
 * The error bound is accumulated in units of `γγ3 ≈ 3u²` (the relative error
 * bound of `ddMultDouble2`), but `ddMultDd` has a relative error bound of
 * `7u²`, i.e. `7/3` units.
 */
const ddMultDdErrUnits = 7/3;


/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double-double precision including an error bound that has **not** been
 * scaled by `γγ3` yet.
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @example
 * ```typescript
 * ddScaleWithInpErr([[0,1],[0,2],[0,7]], 3, [0,0,0]); //=> [[[0,9],[0,6],[0,7]], [30, 14, 0]]
 * ```
 * 
 * @doc
 */
function ddScaleWithInpErr(
        p: number[][],
        s: number,
        p_: number[]): [number[][],number[]] {

    const r = p.slice();
    const r_ = p_.slice();
    ddInplaceScaleWithInpErr(r, s, r_);

    return [r,r_];
}


/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power, e.g.
 * `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @doc
 */
function ddInplaceScaleWithInpErr(
        p: number[][],
        s: number,
        p_: number[]): void {

    const n = p.length - 1;
    if (n < 0) { return; }

    const _s = abs(s);
    let sPow = [0,s];
    let sPow_ = 0;  // no error
    for (let i=1; i<=n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = abs(pn_i[1]);
        const pn_i_ = p_[j];

        const scaledPn_i = ddMultDd(sPow, pn_i);
        p[j] = scaledPn_i;
        // input error * |sⁱ| + |p| * err(sⁱ) + round-off of the product
        p_[j] = pn_i_*abs(sPow[1]) + _pn_i*sPow_ + ddMultDdErrUnits*abs(scaledPn_i[1]);

        const nextSPow = ddMultD(s, sPow);  // relative error bound `3u²`, i.e. 1 unit
        sPow_ = sPow_*_s + abs(nextSPow[1]);
        sPow = nextSPow;
    }
}


export { ddScaleWithInpErr, ddInplaceScaleWithInpErr }
