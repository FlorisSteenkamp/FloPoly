"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiply_1 = require("../basic/multiply");
const flo_numerical_1 = require("flo-numerical");
/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)... Note that the resulting polynomial
 * will not have any complex roots.
 *
 * Mostly provided for testing purposes. Note that the real roots of the
 * constructed polynomial may not be exactly the same as the roots that
 * the polynomial has been constructed from due to floating-point
 * round-off.
 *
 * @param roots - The roots
 * @example
 * fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]
 * allRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]
 * // In the above note the rounding error. Also note the multiple root of 3 that has been missed.
 * allRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]
 * allRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]
 */
function fromRoots(roots) {
    let p = [1];
    for (let i = 0; i < roots.length; i++) {
        p = multiply_1.multiply(p, [1, -roots[i]]);
    }
    return p;
}
exports.fromRoots = fromRoots;
/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)... Note that the resulting polynomial
 * will not have any complex roots.
 *
 * Mostly provided for testing purposes.
 *
 * @param roots the roots
 */
function fromRootsExact(roots) {
    let p = [[1]];
    for (let i = 0; i < roots.length; i++) {
        p = multiply_1.multiplyExact([p, [[1], [-roots[i]]]]);
    }
    return p.map(flo_numerical_1.compress);
}
exports.fromRootsExact = fromRootsExact;
//# sourceMappingURL=from-roots.js.map