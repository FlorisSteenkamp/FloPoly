"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRootsCertifiedSimplified = void 0;
const all_roots_certified_1 = require("./all-roots-certified");
function allRootsCertifiedSimplified(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY, returnUndefinedForZeroPoly) {
    return all_roots_certified_1.allRootsCertified(p.map(c => [0, c]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}
exports.allRootsCertifiedSimplified = allRootsCertifiedSimplified;
//# sourceMappingURL=all-roots-certified-simplified.js.map