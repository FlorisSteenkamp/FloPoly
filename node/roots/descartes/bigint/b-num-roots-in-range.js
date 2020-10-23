"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bNumRootsInRange = void 0;
const b_sturm_chain_1 = require("../../../euclidean-division-related/bigint/b-sturm-chain");
const b_horner_1 = require("../../../evaluate/bigint/b-horner");
const b_sign_changes_1 = require("./b-sign-changes");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bSturmChain = b_sturm_chain_1.bSturmChain;
const bHorner = b_horner_1.bHorner;
const bSignChanges = b_sign_changes_1.bSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20,-11);  //=> 0
 * bNumRootsInRange(p,-11,-9);   //=> 1
 * bNumRootsInRange(p,-11,3.5);  //=> 3
 * bNumRootsInRange(p,-11,5);    //=> 4
 */
function bNumRootsInRange(p, a, b) {
    const ps = bSturmChain(p);
    const as = ps.map(p => bHorner(p, a));
    const bs = ps.map(p => bHorner(p, b));
    return bSignChanges(as) - bSignChanges(bs);
}
exports.bNumRootsInRange = bNumRootsInRange;
//# sourceMappingURL=b-num-roots-in-range.js.map