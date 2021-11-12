import { eSturmChain as eSturmChain_ } from "../../../euclidean-division-related/expansion/e-sturm-chain.js";
import { eeHorner as eeHorner_ } from "../../../evaluate/expansion/e-e-horner";
import { eSignChanges as eSignChanges_ } from './e-sign-changes';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eeHorner = eeHorner_;
const eSturmChain = eSturmChain_;
const eSignChanges = eSignChanges_;
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
export { eNumRootsInRange };
//# sourceMappingURL=e-num-roots-in-range.js.map