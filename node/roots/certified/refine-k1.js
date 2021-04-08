"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refineK1 = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
const e_change_variables_linear_1 = require("../../change-variables/expansion/e-change-variables-linear");
const all_roots_certified_1 = require("./all-roots-certified");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eChangeVariablesLinear = e_change_variables_linear_1.eChangeVariablesLinear;
const allRootsCertified = all_roots_certified_1.allRootsCertified;
const eToDd = big_float_ts_1.eToDd;
const twoSum = big_float_ts_2.twoSum;
const eps = Number.EPSILON;
/**
 * Returns once compensated root(s) (bar underflow / overflow) given a root
 * interval previously calculated using [[allRootsCertified]].
 *
 * * 'once-compensated' here means that the typical root interval, `W`,
 * (`= Number.EPSILON` at `1`) is reduced to `W**2`; if multiple roots were
 * present in the original interval they may be resolved to individual
 * intervals
 *
 * @param ri a root interval previously calculated
 * @param p the exact polynomial with coefficients given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function refineK1(ri, p) {
    const tS = ri.tS;
    // scale is exact by the precondition put on `RootInterval`
    const δ = ri.tE - tS;
    // Translate the polynomial such that the root is within δ from 0, then
    // scale it such that the roots stay <= 1, i.e. is in [0,1]
    const pExactK1 = eChangeVariablesLinear(p, δ, tS);
    // reduce the polynomial to double-double precision for faster root finding
    const pDdK1 = pExactK1.map(eToDd);
    // update the double-double precision error bound - it is simply the error 
    // in rounding the exact coefficients to double-double precision
    const errBoundK1 = pDdK1.map(c => eps * eps * c[1]);
    const getPExactK1 = () => pExactK1;
    const risLo = allRootsCertified(pDdK1, 0, 1, errBoundK1, getPExactK1);
    const ris = [];
    for (let riLo of risLo) {
        ris.push({
            tS: twoSum(tS, riLo.tS * δ),
            tE: twoSum(tS, riLo.tE * δ),
            multiplicity: riLo.multiplicity
        });
    }
    return ris;
}
exports.refineK1 = refineK1;
//# sourceMappingURL=refine-k1.js.map