"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bGcdInts = exports.bGcdInt = void 0;
/**
 * Computes and returns the greatest common divisor of two integers a and b,
 * using the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).
 */
function bGcdInt(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (a === 0n) {
        return b;
    }
    if (b === 0n) {
        return a;
    }
    while (b !== 0n) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
exports.bGcdInt = bGcdInt;
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers for which the GCD is to be calculated
 */
function bGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i];
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = bGcdInt(a, vals_[i]);
    }
    return a;
}
exports.bGcdInts = bGcdInts;
//# sourceMappingURL=b-integer-gcd.js.map