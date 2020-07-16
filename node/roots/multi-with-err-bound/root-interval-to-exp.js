"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootIntervalToExp = void 0;
/**
 * Converts a double precision root interval to a quad precision one (without)
 * @param ri a root interval
 */
function rootIntervalToExp(ri) {
    return {
        tS: [0, ri.tS],
        tE: [0, ri.tE],
        multiplicity: ri.multiplicity
    };
}
exports.rootIntervalToExp = rootIntervalToExp;
//# sourceMappingURL=root-interval-to-exp.js.map