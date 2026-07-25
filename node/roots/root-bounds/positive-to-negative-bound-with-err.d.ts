/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 *
 * @param positiveBoundFunction
 *
 * @internal
 */
declare function positiveToNegativeBound_WithError(positiveBoundFunction: (p: number[], p_: number[]) => number): (p: number[], p_: number[]) => number;
export { positiveToNegativeBound_WithError };
