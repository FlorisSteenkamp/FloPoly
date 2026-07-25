/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 *
 * @param positiveUpperBoundFunction
 *
 * @internal
 */
function upperToLowerBound_WithError(positiveUpperBoundFunction) {
    return (p, p_) => {
        return 1 / positiveUpperBoundFunction(p.toReversed(), p_);
    };
}
export { upperToLowerBound_WithError };
//# sourceMappingURL=upper-to-lower-bound-with-err.js.map