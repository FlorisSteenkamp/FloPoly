"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expElevateDegree(p, deg) {
    let p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push([0]);
    }
    return p_;
}
exports.expElevateDegree = expElevateDegree;
//# sourceMappingURL=exp-elevate-degree.js.map