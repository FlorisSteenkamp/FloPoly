"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eval_k_multi_with_err_bounds_1 = require("../../evaluate/eval-k-multi-with-err-bounds");
const horner_exact_1 = require("../../evaluate/horner-exact");
function evalAdaptive(p, pE, x, psExact, getPsExact, diffCount) {
    let r = eval_k_multi_with_err_bounds_1.evalK1MultiWithErrBounds(p, pE, x, 4).r̂;
    if (r === 0) {
        // condition number is too high - request higher precision
        psExact.ps = psExact.ps || getPsExact();
        return horner_exact_1.HornerExact(psExact.ps[diffCount], x);
    }
    return r;
}
exports.evalAdaptive = evalAdaptive;
//# sourceMappingURL=eval-adaptive.js.map