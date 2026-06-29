import { reflectAboutYAxis } from "../../change-variables/double/reflect-about-y-axis.js";
/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 *
 * @param positiveBoundFunction
 *
 * @internal
 */
function positiveToNegativeBound(positiveBoundFunction) {
    return (p) => {
        return -positiveBoundFunction(reflectAboutYAxis(p));
    };
}
export { positiveToNegativeBound };
//# sourceMappingURL=positive-to-negative-bound.js.map