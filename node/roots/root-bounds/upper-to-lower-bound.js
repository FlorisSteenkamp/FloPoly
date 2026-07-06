/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 *
 * @param positiveUpperBoundFunction
 *
 * @internal
 */
function upperToLowerBound(positiveUpperBoundFunction) {
    return (p) => {
        return 1 / positiveUpperBoundFunction(p.toReversed());
    };
}
export { upperToLowerBound };
//# sourceMappingURL=upper-to-lower-bound.js.map