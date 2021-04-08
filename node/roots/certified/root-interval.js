"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mid = exports.createRootExact = void 0;
/**
 * Simple function that creates and returns an exact root (with a bracketing
 * interval width of 0 and multiplicity 1)
 *
 * @param t
 *
 * @doc
 */
function createRootExact(t) {
    return { tS: t, tE: t, multiplicity: 1 };
}
exports.createRootExact = createRootExact;
/**
 * Simple function that returns the middle of the root bracketing interval - can
 * be used to estimate the root
 *
 * @param ri a root interval
 *
 * @doc
 */
function mid(ri) {
    return (ri.tS + ri.tE) / 2;
}
exports.mid = mid;
//# sourceMappingURL=root-interval.js.map