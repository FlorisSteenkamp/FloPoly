"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Inverts the given mobius, i.e.
 * M(x) = (ax + b) / (cx + d) → (bx + a) / (dx + c)
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function mobInvert(mobius) {
    let [[a, b], [c, d]] = mobius;
    return [[b, a], [d, c]];
}
exports.mobInvert = mobInvert;
//# sourceMappingURL=invert.js.map