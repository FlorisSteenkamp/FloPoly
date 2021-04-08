"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bP2NormSquared = void 0;
/**
 * Returns the `p-2 norm` squared, i.e. the square of the `Euclidean norm` of
 * the given array of bigints.
 *
 * @param p an array of bigints; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function bP2NormSquared(p) {
    let s = 0n;
    for (let i = 0; i < p.length; i++) {
        s += p[i] ** 2n;
    }
    return s;
}
exports.bP2NormSquared = bP2NormSquared;
//# sourceMappingURL=b-p-2-norm-squared.js.map