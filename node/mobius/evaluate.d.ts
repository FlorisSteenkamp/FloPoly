/**
 * Returns the result of evaluating the given mobius function at a specific x.
 *
 * @param mobius the mobius function
 * @param x the x value at which to evaluate
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
declare function mobEvaluate(mobius: number[][], x: number): number;
export { mobEvaluate };
