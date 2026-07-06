import { eNegativeOf, eEstimate, eToDd, eCompress } from "big-float-ts";
import { eMultiply } from "../../../basic/expansion/e-multiply.js";
const { abs } = Math;
/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors `(x - root1)(x - root2)` in Shewchuck expansions
 * and rounding back to double-double precision.
 *
 * Returns an object with the following properties:
 *   - `pE`: a the Shewchuck expansion polynomial
 *   - `pDd`: a double-double precision polynomial (that is the expansion polynomial with *truncated* coefficients)
 *   - `pDd_`: the coefficient-wise error polynomial on `pDd` (**not** scaled by `γγ(3)` yet)
 *   - `p`: a double precision polynomial (that is the expansion polynomial with *rounded* coefficients)
 *   - `p_`: the coefficient-wise error polynomial on `p` (**not** scaled by `γ(1)` yet)
  *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots as Shewchuk expansions,
 * e.g. `[[0.5],[0.3]]` represents the roots `0.5` and `0.3`
 *
 * @doc
 */
function eFromRoots(roots) {
    let pE = [[1]];
    for (let i = 0; i < roots.length; i++) {
        pE = eMultiply(pE, [[1], eNegativeOf(roots[i])]);
    }
    pE = pE.map(eCompress);
    const pDd = pE.map(eToDd);
    const pDd_ = pE.map(c => abs(c[c.length - 1]) / 3 // `/ 3` since the error is ~ `γγ1` and not `γγ3`
    );
    const p = pE.map(c => eEstimate(c));
    const p_ = pE.map((_, idx) => abs(p[idx]));
    return { pE, pDd, pDd_, p, p_ };
}
export { eFromRoots };
//# sourceMappingURL=e-from-roots.js.map