"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bElevateDegree = void 0;
/**
 * Returns the result of elevating the given polynomial by the given degree.
 *
 * @internal
 *
 * @param p
 * @param deg
 */
function bElevateDegree(p, deg) {
    const p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push(0n);
    }
    return p_;
}
exports.bElevateDegree = bElevateDegree;
//# sourceMappingURL=b-elevate-degree.js.map