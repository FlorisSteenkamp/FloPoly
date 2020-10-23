"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperToLowerBound = void 0;
const invert_1 = require("../../basic/double/invert");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const invert = invert_1.invert;
/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 *
 * @internal
 *
 * @param positiveUpperBoundFunction
 */
function upperToLowerBound(positiveUpperBoundFunction) {
    return (p) => {
        return 1 / positiveUpperBoundFunction(invert(p));
    };
}
exports.upperToLowerBound = upperToLowerBound;
//# sourceMappingURL=upper-to-lower-bound.js.map