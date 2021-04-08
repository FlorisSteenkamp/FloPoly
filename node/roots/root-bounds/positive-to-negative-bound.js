"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positiveToNegativeBound = void 0;
const reflect_about_y_axis_1 = require("../../change-variables/double/reflect-about-y-axis");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const reflectAboutYAxis = reflect_about_y_axis_1.reflectAboutYAxis;
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
exports.positiveToNegativeBound = positiveToNegativeBound;
//# sourceMappingURL=positive-to-negative-bound.js.map