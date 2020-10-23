"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vecSum = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const twoSum = big_float_ts_1.twoSum;
/**
 * * helper function
 *
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 *
 * @internal
 *
 * @param x
 * @param K
 */
function vecSum(p_) {
    const p = p_.slice();
    for (let i = 1; i < p.length; i++) {
        [p[i - 1], p[i]] = twoSum(p[i], p[i - 1]);
    }
    return p;
}
exports.vecSum = vecSum;
//# sourceMappingURL=vec-sum.js.map