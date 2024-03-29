/**
 * Returns the result of converting a double precision root interval to a
 * double-double precision one
 *
 * @param ri a root interval
 *
 * @doc
 */
function rootIntervalToExp(ri) {
    return {
        tS: [0, ri.tS],
        tE: [0, ri.tE],
        multiplicity: ri.multiplicity
    };
}
export { rootIntervalToExp };
//# sourceMappingURL=root-interval-to-exp.js.map