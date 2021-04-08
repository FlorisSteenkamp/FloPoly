"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eNumRootsInRange = void 0;
const e_sturm_chain_1 = require("../../../euclidean-division-related/expansion/e-sturm-chain");
const e_e_horner_1 = require("../../../evaluate/expansion/e-e-horner");
const e_sign_changes_1 = require("./e-sign-changes");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eeHorner = e_e_horner_1.eeHorner;
const eSturmChain = e_sturm_chain_1.eSturmChain;
const eSignChanges = e_sign_changes_1.eSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial, if
 * neither a nor b is a multiple root of p, then V(a) − V(b) is the number of
 * distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound given as a Shewchuk expansion
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRootsInRange(p,-20,-11); //=> 0
 * eNumRootsInRange(p,-11,-9);  //=> 1
 * eNumRootsInRange(p,-11,3.5); //=> 3
 * eNumRootsInRange(p,-11,5);   //=> 4
 * ```
 *
 * @doc
 */
function eNumRootsInRange(p, a, b) {
    const ps = eSturmChain(p);
    const as = ps.map(p => eeHorner(p, a));
    const bs = ps.map(p => eeHorner(p, b));
    return eSignChanges(as) - eSignChanges(bs);
}
exports.eNumRootsInRange = eNumRootsInRange;
//# sourceMappingURL=e-num-roots-in-range.js.map