"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degree = void 0;
/**
 * Returns the degree of the polynomial.
 * @param p a polynomial
 * @example
 * degree([9,8,7,6,5,4,3,2,1]); //=> 8
 */
function degree(p) {
    return p.length - 1;
}
exports.degree = degree;
//# sourceMappingURL=degree.js.map