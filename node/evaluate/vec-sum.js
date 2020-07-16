"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vecSum = void 0;
const big_float_ts_1 = require("big-float-ts");
const { twoSum } = big_float_ts_1.operators;
/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * @param x
 * @param K
 */
function vecSum(p_) {
    let p = p_.slice();
    for (let i = 1; i < p.length; i++) {
        [p[i - 1], p[i]] = twoSum(p[i], p[i - 1]);
    }
    return p;
}
exports.vecSum = vecSum;
//# sourceMappingURL=vec-sum.js.map