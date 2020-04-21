"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Inverts the given polynomial by reversing the order of the
 * coefficients, i.e. p(x) -> x^deg(p) * p(1/x)
 * @param p a polynomial
 * @example
 * invert([3,2,-5]);  // => [-5,2,3]
 */
function invert(p) {
    return p.slice().reverse();
}
exports.invert = invert;
/**
 * Inverts the given polynomial by reversing the order of the
 * coefficients, i.e. p(x) -> x^deg(p) * p(1/x)
 * @param p a polynomial
 * @example
 * invert([3,2,-5]);  // => [[-5],[2],[3]]
 */
function expInvert(p) {
    return p.slice().reverse();
}
exports.expInvert = expInvert;
//# sourceMappingURL=invert.js.map