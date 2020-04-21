"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 * **precondition** a, b must be integers
 */
function gcdInt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}
exports.gcdInt = gcdInt;
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * binary GCD algorithm - probably slower than just using gcdInt that uses
 * the Euclidean Algorithm.
 */
function gcdIntBinary(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    // Reduce a and/or b to odd numbers and keep track of the greatest power of 
    // 2 dividing both a and b.
    let k = 1;
    while (a % 2 === 0 && b % 2 === 0) {
        a = a / 2; // right shift
        b = b / 2; // right shift
        k = k * 2; // left shift
    }
    // Reduce a to an odd number...
    while (a % 2 === 0) {
        a = a / 2; // right shift
    }
    // Henceforth, a is always odd...
    while (b) {
        // Remove all factors of 2 in b as they are not common
        while (b % 2 === 0) {
            b = b / 2; // right shift
        }
        // a and b are both odd. Swap values such that it is the larger of the 
        // two values, and then set b to the difference (which is even)
        if (a > b) {
            [a, b] = [b, a];
        }
        b = b - a; // b=0 iff b=a
    }
    // Restore common factors of 2...
    return k * a;
}
exports.gcdIntBinary = gcdIntBinary;
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 * * It is probably better to use gcdIntsNaive only for 3 or less numbers, else
 * use gcdInts instead.
 */
function gcdInts(vals) {
    let vals_ = vals.slice();
    let len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = Math.abs(vals_[i]);
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = gcdInt(a, vals_[i]);
    }
    return a;
}
exports.gcdInts = gcdInts;
/**
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 * * **don't use!!**
 * * It turns out this method is *slower* than the naive method
 */
function gcdIntsTree(vals) {
    let vals_ = vals.slice();
    // make array of numbers all positive
    for (let i = 0; i < vals_.length; i++) {
        vals_[i] = Math.abs(vals_[i]);
    }
    // Divide and conquer
    while (vals_.length > 1) {
        let newVals = [];
        let len = vals_.length;
        for (let i = 0; i < len - 1; i += 2) {
            newVals.push(gcdInt(vals_[i], vals_[i + 1]));
        }
        if (len % 2 !== 0) {
            newVals.push(vals_[len - 1]);
        }
        vals_ = newVals;
    }
    return vals_[0];
}
exports.gcdIntsTree = gcdIntsTree;
//# sourceMappingURL=integer-gcd.js.map