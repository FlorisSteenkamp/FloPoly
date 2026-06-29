import { bSturmChain } from "../../../euclidean-division-related/bigint/b-sturm-chain.js";
import { bSignChanges } from "./b-sign-changes.js";
import { bEvaluateAt1 } from "../../../evaluate/bigint/b-evaluate-at-1.js";
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval `(0,1)` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bNumRootsIn01(p) {
    const ps = bSturmChain(p);
    const as = ps.map(p => p[p.length - 1]); // evaluate at 0
    const bs = ps.map(p => bEvaluateAt1(p)); // evaluate at 1
    return bSignChanges(as) - bSignChanges(bs);
}
export { bNumRootsIn01 };
//# sourceMappingURL=b-num-roots-0-1.js.map