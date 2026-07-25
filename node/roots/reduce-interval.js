import { Horner } from "../evaluate/double/horner.js";
import { negativeRootLowerBound_LMQ_WithError } from "./root-bounds/lmq/negative-root-lower-bound-lmq-with-err.js";
import { positiveRootUpperBound_LMQ_WithError } from "./root-bounds/lmq/positive-root-upper-bound-lmq-with-err.js";
const { min, max, abs } = Math;
const MAX_DOUBLE = 1.7976931348623157e+308;
/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * @param lb
 * @param ub
 * @param p
 *
 * @internal
 */
function reduceInterval(lb, ub, p, pDd_, errorMultiplier) {
    lb = max(lb, negativeRootLowerBound_LMQ_WithError(p, pDd_.map(c => c * errorMultiplier)));
    ub = min(ub, positiveRootUpperBound_LMQ_WithError(p, pDd_.map(c => c * errorMultiplier)));
    const d = p.length - 1;
    const F = 2 ** (-2 * d);
    if (!Number.isFinite(lb)) {
        lb = -F * MAX_DOUBLE;
    }
    if (!Number.isFinite(ub)) {
        ub = F * MAX_DOUBLE;
    }
    while (true) {
        const lb_ = abs(Horner(p, lb));
        const ub_ = abs(Horner(p, ub));
        if (lb_ > F * MAX_DOUBLE) {
            lb /= 2;
            continue;
        }
        if (ub_ > F * MAX_DOUBLE) {
            ub /= 2;
            continue;
        }
        break;
    }
    return [lb, ub];
}
export { reduceInterval };
//# sourceMappingURL=reduce-interval.js.map