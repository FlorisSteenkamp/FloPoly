"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bNumRoots = void 0;
const b_sturm_chain_1 = require("../../../euclidean-division-related/bigint/b-sturm-chain");
const b_degree_1 = require("../../../basic/bigint/b-degree");
const b_sign_changes_1 = require("./b-sign-changes");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bSturmChain = b_sturm_chain_1.bSturmChain;
const bDegree = b_degree_1.bDegree;
const bSignChanges = b_sign_changes_1.bSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [n1, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function bNumRoots(p) {
    const ps = bSturmChain(p);
    const as = ps.map(p => bDegree(p) % 2 === 0 ? p[0] : -p[0]);
    const bs = ps.map(p => p[0]);
    return bSignChanges(as) - bSignChanges(bs);
}
exports.bNumRoots = bNumRoots;
//# sourceMappingURL=b-num-roots.js.map