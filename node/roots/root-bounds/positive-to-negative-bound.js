import { reflectAboutYAxis as reflectAboutYAxis_ } from "../../change-variables/double/reflect-about-y-axis.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const reflectAboutYAxis = reflectAboutYAxis_;
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