"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect_about_y_axis_1 = require("../../change-variables/reflect-about-y-axis");
/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 * @param positiveBoundFunction
 */
function positiveToNegativeBound(positiveBoundFunction) {
    return (p) => {
        return -positiveBoundFunction(reflect_about_y_axis_1.reflectAboutYAxis(p));
    };
}
exports.positiveToNegativeBound = positiveToNegativeBound;
//# sourceMappingURL=positive-to-negative-bound.js.map