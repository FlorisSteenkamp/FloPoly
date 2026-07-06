import { u } from "../../error-analysis/gamma.js";
const { abs } = Math;
/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound as an array in the form `[r,e]` where `r` is the result
 * of the evaluation and `e` is the error.
 *
 * * the error bound can also be calculated as `γ(2d) * AbsHorner(p,x)` but
 *   the running error bound is considerably tighter (about 20x typically)
 *
 * * see e.g. page 95 (at bottom) of [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function hornerWithRunningError(p, x) {
    const _x = abs(x);
    let r̂ = p[0];
    let e = abs(r̂) * 0.5;
    for (let i = 1; i < p.length; i++) {
        r̂ = r̂ * x + p[i];
        e = e * _x + abs(r̂);
    }
    e = u * (2 * e - abs(r̂));
    return [r̂, e];
}
export { hornerWithRunningError };
//# sourceMappingURL=horner-with-running-error.js.map