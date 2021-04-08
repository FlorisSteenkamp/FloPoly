"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.γs = void 0;
const u = Number.EPSILON / 2;
// cache standard error bound units
const _γs = [];
/** @internal */
function γs(n) {
    return _γs[n] || ((1 + u) * (n * u / (1 - n * u)));
}
exports.γs = γs;
//# sourceMappingURL=gammas.js.map