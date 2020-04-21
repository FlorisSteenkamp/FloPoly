"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec_sum_1 = require("./vec-sum");
/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * @param x
 * @param K
 */
function SumK(p, K) {
    for (let i = 1; i < K; i++) {
        p = vec_sum_1.vecSum(p);
    }
    let res = p[0];
    for (let i = 1; i < p.length; i++) {
        res += p[i];
    }
    return res;
}
exports.SumK = SumK;
//# sourceMappingURL=sum-k.js.map