"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bRemoveLeadingZeros = void 0;
/**
 * If the highest power coefficient of the given polynomial is 0 then
 * removeLeadingZeros can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 *
 * @internal
 *
 * @param p a polynomial whose leading zeros should be removed
 */
function bRemoveLeadingZeros(p) {
    // @ts-nocheck
    let lzCount = 0;
    for (let i = 0; i <= p.length - 1; i++) {
        if (p[i] !== 0n) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}
exports.bRemoveLeadingZeros = bRemoveLeadingZeros;
//# sourceMappingURL=b-remove-leading-zeros.js.map