"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eElevateDegree = void 0;
/**
 * Returns the result of elevating the given polynomial by the given degree.
 *
 * @internal
 *
 * @param p
 * @param deg
 */
function eElevateDegree(p, deg) {
    const p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push([0]);
    }
    return p_;
}
exports.eElevateDegree = eElevateDegree;
//# sourceMappingURL=e-elevate-degree.js.map