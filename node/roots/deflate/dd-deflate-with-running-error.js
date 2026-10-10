import { ddMultDouble2 } from "double-double";
import { ddAddDd } from "double-double";
const qmd = ddMultDouble2;
const qaq = ddAddDd;
const { abs } = Math;
/**
 * Returns a deflated version of the given polynomial *approximately* by
 * removing a factor (x - t). Also returns an coefficient-wise absolute error
 * bound.
 *
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ the coefficient-wise absolute error bound of the input
 * polynomial that still needs to be multiplied by `γγ3`, i.e. the actual
 * absolute error bound of the coefficient of `xⁱ` is `pDd_[i]*γγ3`.
 * @param t an evaluation point of the polynomial.
 *
 * @doc
 */
function ddDeflateWithRunningError(pDd, pDd_, t) {
    //--------------------------------------------------------------------------
    // `var` -> a variable
    // `$var` -> the double precision approximation to `var`
    // `_var` -> the absolute value of $var (a prefix underscore on a variable means absolute value)
    // `var_` -> the error in var (a postfix underscore means error bound but should still be multiplied by 3*γ²)
    // `_var_` -> means both absolute value and absolute error bound
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b is double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    // * the returned errors need to be multiplied by 3γ² to get the true error
    // * can use either `$var` or `var[var.length-1]` (the approx value) in error calculations
    //   due to multiplication by 3*γ² and not 3*u²
    //--------------------------------------------------------------------------
    const d = pDd.length - 1;
    const bs = [pDd[0]]; // coefficients
    let b_ = pDd_[0]; // running error
    const bEs = [b_]; // coefficient-wise error bound
    for (let i = 1; i < d; i++) {
        // p[i] + t*bs[i-1];
        const a = bs[i - 1];
        const $m = t * a[1];
        const _t = abs(t);
        const m_ = _t * b_ + abs($m);
        const pi = pDd[i];
        const p_ = pDd_[i];
        b_ = p_ + m_ + abs(pi[1] + $m);
        const b = qaq(pi, qmd(t, a));
        bs.push(b);
        bEs.push(b_);
    }
    return {
        coeffs: bs,
        // errBound: bEs.map(e => γγ3*e)
        errBound: bEs
    };
}
export { ddDeflateWithRunningError };
//# sourceMappingURL=dd-deflate-with-running-error.js.map