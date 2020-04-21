"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invert_1 = require("../../basic/invert");
/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 * @param positiveUpperBoundFunction
 */
function upperToLowerBound(positiveUpperBoundFunction) {
    return (p) => {
        let result = 1 / positiveUpperBoundFunction(invert_1.invert(p));
        //console.log('upper to lower', result);
        return result;
    };
}
exports.upperToLowerBound = upperToLowerBound;
//# sourceMappingURL=upper-to-lower-bound.js.map