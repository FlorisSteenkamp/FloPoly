"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bDivideByConst = void 0;
/**
 * Divides (using **integer division**) a polynomial by a constant.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param c a constant
 */
function bDivideByConst(p, c) {
    const d = p.length;
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}
exports.bDivideByConst = bDivideByConst;
//# sourceMappingURL=b-divide-by-const.js.map