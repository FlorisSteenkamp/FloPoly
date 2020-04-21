"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * @param x
 * @param K
 */
function vecSum(p_) {
    let p = p_.slice();
    for (let i = 1; i < p.length; i++) {
        [p[i - 1], p[i]] = flo_numerical_1.twoSum(p[i], p[i - 1]);
    }
    return p;
}
exports.vecSum = vecSum;
//# sourceMappingURL=vec-sum.js.map