"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bChangeVariablesScale = void 0;
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 *
 * @example
 * ```typescript
 * bChangeVariablesScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
 * ```
 *
 * @doc
 */
function bChangeVariablesScale(p, a) {
    // We let the coefficients of `p(ax)` be denoted by `d_i` in the code below. 
    // `d_i` is calculated as `d = T*c`, where `c` is the original coefficient
    // vector.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0n));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1n;
    for (let j = 1; j <= d; j++) {
        t[0][j] = 0n;
        for (let i = 1; i <= j; i++) {
            t[i][j] = a * t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0n);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0n;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}
exports.bChangeVariablesScale = bChangeVariablesScale;
//# sourceMappingURL=b-change-variables-scale.js.map