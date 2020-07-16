"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumK = void 0;
const vec_sum_1 = require("./vec-sum");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const vecSum = vec_sum_1.vecSum;
/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * @param x
 * @param K
 */
function SumK(p, K) {
    for (let i = 1; i < K; i++) {
        p = vecSum(p);
    }
    let res = p[0];
    for (let i = 1; i < p.length; i++) {
        res += p[i];
    }
    return res;
}
exports.SumK = SumK;
//# sourceMappingURL=sum-k.js.map