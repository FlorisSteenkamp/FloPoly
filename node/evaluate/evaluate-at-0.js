"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the exact result of evaluating the given polynomial at 0 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 * @example
 * evaluateAt0([3,2,99]); //=> 99
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 */
function evaluateAt0(p) {
    return p[p.length - 1];
}
exports.evaluateAt0 = evaluateAt0;
/**
 * Returns the exact result of evaluating the given polynomial at 0 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 * @example
 * evaluateAt0([3,2,99]); //=> 99
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 */
function expEvaluateAt0(p) {
    return p[p.length - 1];
}
exports.expEvaluateAt0 = expEvaluateAt0;
//# sourceMappingURL=evaluate-at-0.js.map