"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expIsUnit = void 0;
/**
 * Returns true if the given polynomial is the unit polynomial, i.e. === 1
 * @param a a polynomial
 */
function expIsUnit(a) {
    return a.length === 1 && a[0].length === 1 && a[0][0] === 1;
}
exports.expIsUnit = expIsUnit;
//# sourceMappingURL=is-unit.js.map