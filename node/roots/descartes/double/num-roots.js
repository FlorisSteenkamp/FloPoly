"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numRoots = void 0;
const big_float_ts_1 = require("big-float-ts");
const e_sturm_chain_1 = require("../../../euclidean-division-related/expansion/e-sturm-chain");
const sign_changes_1 = require("./sign-changes");
const e_degree_1 = require("../../../basic/expansion/e-degree");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const signChanges = sign_changes_1.signChanges;
const eSign = big_float_ts_1.eSign;
const eDegree = e_degree_1.eDegree;
const eSturmChain = e_sturm_chain_1.eSturmChain;
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial - subject to floating point underflow / overflow of
 * intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function numRoots(p) {
    const p_ = p.map(c => [c]);
    const ps = eSturmChain(p_);
    const as = ps.map(p_ => eDegree(p_) % 2 === 0 ? eSign(p_[0]) : -eSign(p_[0]));
    const bs = ps.map(p_ => eSign(p_[0]));
    return signChanges(as) - signChanges(bs);
}
exports.numRoots = numRoots;
//# sourceMappingURL=num-roots.js.map