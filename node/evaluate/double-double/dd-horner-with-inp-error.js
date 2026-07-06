import { ddMultDd, ddAddDd, ddMultDouble2 } from 'double-double';
const qmq = ddMultDd;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const { abs } = Math;
/**
 * Returns the value of the polynomial `p` evaluated at `x` along with an
 * error bound on the result that has **NOT** yet been scaled by `γγ(3)`.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]`  represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * on the input polynomial **NOT** yet scaled by `γγ(3)`
 */
function ddHornerWithInpError(p, x, p_) {
    const _x = abs(x);
    let r̂ = p[0];
    let r̂_ = p_[0];
    for (let i = 1; i < p.length; i++) {
        const r̂x = qmd(x, r̂);
        r̂ = qaq(r̂x, p[i]);
        r̂_ = r̂_ * _x + abs(r̂x[1]) + p_[i] + abs(r̂[1]);
    }
    return [r̂, r̂_];
}
export { ddHornerWithInpError };
//# sourceMappingURL=dd-horner-with-inp-error.js.map