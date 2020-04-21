"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRootExact(t) {
    return { tS: t, tE: t /*, tM: t*/, multiplicity: 1 };
}
exports.createRootExact = createRootExact;
function mid(ri) {
    return (ri.tS + ri.tE) / 2;
}
exports.mid = mid;
//# sourceMappingURL=root-interval.js.map