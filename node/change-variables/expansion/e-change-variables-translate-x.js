import { expansionProduct } from "big-float-ts";
import { fastExpansionSum } from "big-float-ts";
import { scaleExpansion2 } from "big-float-ts";
/**
 * Returns the exact result (bar undeflow / overflow) of performing a change of
 * variables of the form: p(x) <- p(x + b) on the given polynomial (with
 * coefficients given as Shewchuk expansions).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @doc
 */
function eChangeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        t[i] = new Array(d + 1).fill([0]);
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = scaleExpansion2(b, t[0][j - 1]);
        for (let i = 1; i <= j; i++) {
            t[i][j] = fastExpansionSum(scaleExpansion2(b, t[i][j - 1]), t[i - 1][j - 1]);
        }
    }
    // Multiply
    const res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            const acc = expansionProduct(t[i][j], p[d - j]);
            res[d - i] = fastExpansionSum(res[d - i], acc);
        }
    }
    return res;
}
export { eChangeVariablesTranslateX };
//# sourceMappingURL=e-change-variables-translate-x.js.map