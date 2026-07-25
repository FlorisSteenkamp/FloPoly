/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 *
 * @param positiveUpperBoundFunction
 *
 * @internal
 */
declare function upperToLowerBound_WithError(positiveUpperBoundFunction: (p: number[], p_: number[]) => number): (p: number[], p_: number[]) => number;
export { upperToLowerBound_WithError };
