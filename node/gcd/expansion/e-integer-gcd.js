"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eGcdInts = exports.eGcdInt = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
const big_float_ts_3 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eAbs = big_float_ts_1.eAbs;
const eSign = big_float_ts_2.eSign;
const eRem = big_float_ts_3.eRem;
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers given as Shewchuk expansions
 */
function eGcdInt(a, b) {
    a = eAbs(a);
    b = eAbs(b);
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (eSign(a) === 0) {
        return b;
    }
    if (eSign(b) === 0) {
        return a;
    }
    while (eSign(b) !== 0) {
        const t = b;
        b = eRem(a, b);
        a = t;
    }
    return a;
}
exports.eGcdInt = eGcdInt;
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers (given as Shewchuk expansions) for which the GCD is
 * to be calculated
 */
function eGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = eAbs(vals_[i]);
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = eGcdInt(a, vals_[i]);
    }
    return a;
}
exports.eGcdInts = eGcdInts;
//# sourceMappingURL=e-integer-gcd.js.map