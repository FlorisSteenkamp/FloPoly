"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVariablesTranslateX = void 0;
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(x + b) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @example
 * ```typescript
 * changeVariablesTranslateX([1,2,7], 3); //=> [1, 8, 22]
 * ```
 *
 * @doc
 */
function changeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}
exports.changeVariablesTranslateX = changeVariablesTranslateX;
//# sourceMappingURL=change-variables-translate-x.js.map