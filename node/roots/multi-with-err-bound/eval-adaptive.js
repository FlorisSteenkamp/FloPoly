"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalAdaptive = void 0;
const eval_k_multi_with_err_bounds_1 = require("../../evaluate/eval-k-multi-with-err-bounds");
const horner_exact_1 = require("../../evaluate/horner-exact");
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const evalK1MultiWithErrBounds = eval_k_multi_with_err_bounds_1.evalK1MultiWithErrBounds;
const HornerExact = horner_exact_1.HornerExact;
const eEstimate = big_float_ts_1.eEstimate;
function evalAdaptive(p, pE, x, psExact, getPsExact, diffCount) {
    let r = evalK1MultiWithErrBounds(p, pE, x, 4).r̂;
    if (r === 0) {
        // condition number is too high - request higher precision
        psExact.ps = psExact.ps || getPsExact();
        return eEstimate(HornerExact(psExact.ps[diffCount], x));
    }
    return r;
}
exports.evalAdaptive = evalAdaptive;
//# sourceMappingURL=eval-adaptive.js.map