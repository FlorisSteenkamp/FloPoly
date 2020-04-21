"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Divides a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 */
function divideByConst(p, c) {
    if (c === 0) {
        return undefined;
    }
    let d = p.length;
    let r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}
exports.divideByConst = divideByConst;
//# sourceMappingURL=divide-by-const.js.map