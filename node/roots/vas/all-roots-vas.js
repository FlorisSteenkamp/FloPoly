"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRootsVAS = void 0;
const brent_1 = require("../standard/brent");
const root_bounds_lmq_1 = require("../root-bounds/root-bounds-lmq");
const evaluate_at_0_1 = require("../../mobius/evaluate-at-0");
const evaluate_at_inf_1 = require("../../mobius/evaluate-at-inf");
const evaluate_1 = require("../../mobius/evaluate");
const change_variables_1 = require("../../mobius/change-variables");
const invert_1 = require("../../mobius/invert");
const evaluate_2 = require("../../evaluate/evaluate");
const evaluate_at_0_2 = require("../../evaluate/evaluate-at-0");
const change_variables_linear_1 = require("../../change-variables/change-variables-linear");
const negate_1 = require("../../basic/negate");
const invert_2 = require("../../basic/invert");
const sign_changes_1 = require("../descartes/sign-changes");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const brent = brent_1.brent;
const positiveRootUpperBound_LMQ = root_bounds_lmq_1.positiveRootUpperBound_LMQ;
const mobEvaluateAt0 = evaluate_at_0_1.mobEvaluateAt0;
const mobEvaluateAtInf = evaluate_at_inf_1.mobEvaluateAtInf;
const mobEvaluate = evaluate_1.mobEvaluate;
const mobChangeVariables = change_variables_1.mobChangeVariables;
const mobInvert = invert_1.mobInvert;
const evaluate = evaluate_2.evaluate;
const evaluateAt0 = evaluate_at_0_2.evaluateAt0;
const changeVariablesLinear = change_variables_linear_1.changeVariablesLinear;
const negate = negate_1.negate;
const invert = invert_2.invert;
const signChanges = sign_changes_1.signChanges;
const positiveRootLowerBound_LMQ = root_bounds_lmq_1.positiveRootLowerBound_LMQ;
/**
 * DO NOT USE. EXPERIMENTAL.
 * Find all the roots using the VAS algorithm followed by Brent's method.
 * @ignore
 * @param p - A square-free polynomial.
 **/
function allRootsVAS(p_) {
    // TODO - First remove all zero roots  - The VAS method can't handle 
    // them.
    let p = removeZeroRoots(p_);
    let numZeros = p_.length - p.length;
    // TODO - Next, remove all multiple roots (i.e. do a square-free
    // factorization... - VAS doesn't like them either
    let vasRoots = vasRootIntervals(p)
        .map(function (interval) {
        return brent(evaluate(p), interval[0], interval[1]);
    });
    for (let i = 0; i < numZeros; i++) {
        vasRoots.push(0);
    }
    return vasRoots;
}
exports.allRootsVAS = allRootsVAS;
/**
 * Removes the zero roots from the polynomial.
 * @ignore
 * @returns {number[]} The deflated polynomial.
 */
// TODO - improve this function: readability + floating point tolerance
function removeZeroRoots(p_) {
    let p = p_.slice();
    let i = 0;
    while (evaluateAt0(p) === 0) {
        let len = p.length;
        p.pop();
        i++;
    }
    return p;
}
/**
 * Finds root intervals of a polynomial such that each interval contains
 * exactly one root using the VAS (Vincent–Akritas–Strzeboński) method.
 * See http://www.e-ce.uth.gr/wp-content/uploads/formidable/phd_thesis_vigklas.pdf
 * @ignore
 */
// TODO - Square-free factorization ignored for now - duplicate roots 
// could cause an infinite loop - fix by checking if interval becomes
// smaller than a certain threshold.
function vasRootIntervals(p) {
    let positiveIntervals = vasRootIntervalsHelper(p, [[1, 0], [0, 1]]);
    let negativeIntervals = vasRootIntervalsHelper(changeVariablesLinear(p.slice(), -1, 0), [[1, 0], [0, 1]])
        .map(function (interval) {
        return negate(invert(interval));
    });
    return [...negativeIntervals, ...positiveIntervals];
}
/**
 * Helper function
 * The initial mobius transformation must be [[1,0],[0,1]] = M(x) = x.
 * @private
 */
function vasRootIntervalsHelper(p, mobius) {
    // In the Vigklas, Akritas, Strzebonski paper, the steps are marked 
    // as below:
    // STEP 1
    let intervals = [];
    let signVariations = signChanges(p);
    // STEP 2
    if (signVariations === 0) { // Descartes' rule of signs
        return [];
    }
    // STEP 3
    if (signVariations === 1) {
        let M0 = mobEvaluateAt0(mobius);
        let MI = mobEvaluateAtInf(mobius);
        let MM0 = Math.min(M0, MI);
        let MMI = Math.max(M0, MI);
        if (MMI === Number.POSITIVE_INFINITY) {
            MMI = mobEvaluate(mobius, positiveRootUpperBound_LMQ(p));
        }
        return [[MM0, MMI]];
    }
    // STEP 4
    let lb = positiveRootLowerBound_LMQ(p);
    // STEP 5
    if (lb > 1) {
        // p ← p(x + lb)
        p = changeVariablesLinear(p, 1, lb);
        // M ← M(x + lb)
        mobius = mobChangeVariables(mobius, 1, lb);
    }
    // TODO - Include factor of 16 improvement by Strzebonski
    // STEP 6 - Look for real roots in (0, 1)
    // p01 ← (x + 1)^(deg(p)) *  p(1/(x+1))
    let p01 = changeVariablesLinear(invert(p), 1, 1);
    // M01 ← M(1/(x+1))
    let M01 = mobChangeVariables(mobInvert(mobius), 1, 1);
    // STEP 7 - Is 1 a root?
    let m = mobEvaluate(mobius, 1);
    // STEP 8 - Look for real roots in (1, ∞)
    // p1∞ ← p(x + 1)
    let p1inf = changeVariablesLinear(p, 1, 1);
    // M1∞ ← M(x + 1)
    let M1inf = mobChangeVariables(mobius, 1, 1);
    // STEPS 9 -> 13
    let intervals1 = vasRootIntervalsHelper(p01, M01);
    let intervals3 = vasRootIntervalsHelper(p1inf, M1inf);
    if (evaluate(p)(1) === 0) {
        intervals1.push([m, m]);
    }
    return [...intervals1, ...intervals3];
}
//# sourceMappingURL=all-roots-vas.js.map