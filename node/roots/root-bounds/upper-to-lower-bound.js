"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperToLowerBound = void 0;
const invert_1 = require("../../basic/invert");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const invert = invert_1.invert;
/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 * @param positiveUpperBoundFunction
 */
function upperToLowerBound(positiveUpperBoundFunction) {
    return (p) => {
        let result = 1 / positiveUpperBoundFunction(invert(p));
        //console.log('upper to lower', result);
        return result;
    };
}
exports.upperToLowerBound = upperToLowerBound;
//# sourceMappingURL=upper-to-lower-bound.js.map