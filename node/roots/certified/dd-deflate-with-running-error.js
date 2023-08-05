import { ddMultDouble2 } from "double-double";
import { ddAddDd } from "double-double";
import { γγ } from '../../error-analysis/gamma';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qmd = ddMultDouble2;
const qaq = ddAddDd;
const { abs } = Math;
const γγ3 = γγ(3);
/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r),
 * where r is a root of the polynomial.
 *
 * * **non-exact:** the deflation is done in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pE the coefficient-wise absolute error of the input polynomial
 * @param t an evaluation point of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], [0,2]); //=> [[0,1], [0,-3], [0,2]]
 * ddDeflate([[0,1], [0,-3], [0,2], [0,2]);          //=> [[0,1], [0,-1]]
 * ddDeflate([[0,1], [0,-1]], [0,1]);                //=> [[0,1]]
 * ```
 *
 * @doc
 */
function ddDeflateWithRunningError(p, pE, t) {
    const d = p.length - 1;
    const bs = [p[0]];
    const bEs = [pE[0]];
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
    let b_ = 0; // running error
    for (let i = 1; i < d; i++) {
        const $b = bs[i - 1][1]; // double-precision version - roundoff error <= 1 ulp
        const $m = t * $b; // double precision calculation
        const _m = abs($m);
        const _t = abs(t);
        const m_ = _t * b_ + _m; // error
        const m = qmd(t, bs[i - 1]);
        const $p = p[i][1];
        const _p = abs($p);
        const p_ = pE[i];
        b_ = p_ + m_ + _p + _m; //?
        const r = qaq(p[i], m);
        bs.push(r);
        bEs.push(b_);
    }
    return {
        coeffs: bs,
        errBound: bEs //.map(bE => γγ3*bE)
    };
}
export { ddDeflateWithRunningError };
//# sourceMappingURL=dd-deflate-with-running-error.js.map