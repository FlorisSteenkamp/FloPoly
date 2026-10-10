/**
 * Returns the result of converting a double precision root interval to one
 * with endpoints given as Shewchuk floating point expansions
 * (a `RootIntervalExp`)
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