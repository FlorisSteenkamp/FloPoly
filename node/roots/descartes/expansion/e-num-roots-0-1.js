"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eNumRootsIn01 = void 0;
const e_sturm_chain_1 = require("../../../euclidean-division-related/expansion/e-sturm-chain");
const sign_changes_1 = require("../double/sign-changes");
const e_evaluate_at_1_1 = require("../../../evaluate/expansion/e-evaluate-at-1");
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEvaluateAt1 = e_evaluate_at_1_1.eEvaluateAt1;
const eSturmChain = e_sturm_chain_1.eSturmChain;
const signChanges = sign_changes_1.signChanges;
const eSign = big_float_ts_1.eSign;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eNumRootsIn01(p) {
    const ps = eSturmChain(p);
    const as = ps.map(p => eSign(p[p.length - 1])); // evaluate at 0
    const bs = ps.map(p => eSign(eEvaluateAt1(p))); // evaluate at 1
    return signChanges(as) - signChanges(bs);
}
exports.eNumRootsIn01 = eNumRootsIn01;
//# sourceMappingURL=e-num-roots-0-1.js.map