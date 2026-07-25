import { reflectAboutYAxis } from "../../change-variables/double/reflect-about-y-axis.js";
/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 *
 * @param positiveBoundFunction
 *
 * @internal
 */
function positiveToNegativeBound_WithError(positiveBoundFunction) {
    return (p, p_) => {
        return -positiveBoundFunction(reflectAboutYAxis(p), p_);
    };
}
export { positiveToNegativeBound_WithError };
//# sourceMappingURL=positive-to-negative-bound-with-err.js.map