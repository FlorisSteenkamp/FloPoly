import { changeVariablesLinear } from "../../change-variables/double/change-variables-linear.js";
import { bernsteinToPowerBasis01 } from "./bernstein-to-power-basis-01.js";
/**
 * Returns the power basis representation from the given Bernstein basis on
 * the interval `[a,b]`.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p the Bernstein coefficients `[b_0,...,b_n]`
 * @param a the lower bound of the Bernstein basis interval
 * @param b the upper bound of the Bernstein basis interval
 *
 */
function bernsteinToPowerBasis(p, a = 0, b = 1) {
    if (p.length <= 1) {
        return p;
    }
    const p01 = bernsteinToPowerBasis01(p);
    return changeVariablesLinear(p01, 1 / (b - a), -a / (b - a));
}
export { bernsteinToPowerBasis };
//# sourceMappingURL=bernstein-to-power-basis.js.map