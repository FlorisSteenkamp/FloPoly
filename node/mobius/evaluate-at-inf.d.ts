/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
declare function mobEvaluateAtInf(mobius: number[][]): number;
export { mobEvaluateAtInf };
