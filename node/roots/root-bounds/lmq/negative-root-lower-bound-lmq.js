import { positiveToNegativeBound } from "../positive-to-negative-bound.js";
import { positiveRootUpperBound_LMQ } from "./positive-root-upper-bound-lmq.js";
/**
 * Returns a negative lower (further from zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const negativeRootLowerBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);
export { negativeRootLowerBound_LMQ };
//# sourceMappingURL=negative-root-lower-bound-lmq.js.map