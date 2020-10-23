"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numRootsInRange = void 0;
const sturm_chain_1 = require("../../../euclidean-division-related/double/sturm-chain");
const e_horner_1 = require("../../../evaluate/expansion/e-horner");
const e_sign_changes_1 = require("../expansion/e-sign-changes");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sturmChain = sturm_chain_1.sturmChain;
const eHorner = e_horner_1.eHorner;
const eSignChanges = e_sign_changes_1.eSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 */
function numRootsInRange(p, a, b) {
    const ps = sturmChain(p);
    const as = ps.map(p => eHorner(p, a));
    const bs = ps.map(p => eHorner(p, b));
    return eSignChanges(as) - eSignChanges(bs);
}
exports.numRootsInRange = numRootsInRange;
//# sourceMappingURL=num-roots-in-range.js.map