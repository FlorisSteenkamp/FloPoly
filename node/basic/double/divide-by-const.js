"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideByConst = void 0;
/**
 * Divides a polynomial by a constant in double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */
function divideByConst(p, c) {
    const d = p.length;
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}
exports.divideByConst = divideByConst;
//# sourceMappingURL=divide-by-const.js.map