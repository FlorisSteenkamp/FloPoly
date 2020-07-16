"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadSplit = void 0;
/**
 * Returns two new polynomials by splitting the given polynomial into two where
 * the first polynomial's coefficients are the high order bits and the second's
 * coefficients are the low order bits.
 * @param p a polynomial with quad coefficients - if higher order coefficients
 * are given, the bitlength is truncated.
 */
function quadSplit(p) {
    let p1 = [];
    let p2 = [];
    for (let i = 0; i < p.length; i++) {
        let len = p[i].length;
        p1.push(p[i][len - 1]);
        p2.push(len === 1 ? 0 : p[i][len - 2]);
    }
    return [p1, p2];
}
exports.quadSplit = quadSplit;
//# sourceMappingURL=quad-split.js.map