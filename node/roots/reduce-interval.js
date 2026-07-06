import { negativeRootLowerBound_LMQ, positiveRootUpperBound_LMQ } from "./root-bounds/root-bounds-lmq.js";
const { min, max } = Math;
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
function reduceInterval(lb, ub, p) {
    lb = max(lb, negativeRootLowerBound_LMQ(p));
    ub = min(ub, positiveRootUpperBound_LMQ(p));
    return [lb, ub];
}
export { reduceInterval };
//# sourceMappingURL=reduce-interval.js.map