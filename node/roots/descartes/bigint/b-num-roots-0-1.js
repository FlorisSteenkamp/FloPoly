"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bNumRootsIn01 = void 0;
const b_sturm_chain_1 = require("../../../euclidean-division-related/bigint/b-sturm-chain");
const b_sign_changes_1 = require("./b-sign-changes");
const b_evaluate_at_1_1 = require("../../../evaluate/bigint/b-evaluate-at-1");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bSturmChain = b_sturm_chain_1.bSturmChain;
const bSignChanges = b_sign_changes_1.bSignChanges;
const bEvaluateAt1 = b_evaluate_at_1_1.bEvaluateAt1;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 */
function bNumRootsIn01(p) {
    const ps = bSturmChain(p);
    const as = ps.map(p => p[p.length - 1]); // evaluate at 0
    const bs = ps.map(p => bEvaluateAt1(p)); // evaluate at 1
    return bSignChanges(as) - bSignChanges(bs);
}
exports.bNumRootsIn01 = bNumRootsIn01;
//# sourceMappingURL=b-num-roots-0-1.js.map