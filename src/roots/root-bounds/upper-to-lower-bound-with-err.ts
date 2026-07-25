
/**
 * Returns a function that returns a positive lower root bound given a function 
 * that returns a positive upper root bound.
 * 
 * @param positiveUpperBoundFunction 
 * 
 * @internal
 */
function upperToLowerBound_WithError(
        positiveUpperBoundFunction: (p: number[], p_: number[]) => number) {

    return (p: number[], p_: number[]): number => {
        return 1 / positiveUpperBoundFunction(p.toReversed(), p_);
    }
}


export { upperToLowerBound_WithError }
