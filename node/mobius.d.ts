/**
 * Performs a change of variables x → px + q on the given Mobius
 * function.
 *
 * @ignore
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @param a
 * @param b
 * @returns The modified mobius function
 * M(x) = (a(px + q) + b) / (c(px + q) + d).
 */
declare function changeVariables(mobius: number[][], a: number, b: number): number[][];
/**
 * Inverts the given mobius, i.e.
 * M(x) = (ax + b) / (cx + d) → (bx + a) / (dx + c)
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
declare function invert(mobius: number[][]): number[][];
/**
 * Evaluates the given mobius function at x = 0.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
declare function evaluateAt0(mobius: number[][]): number;
/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
declare function evaluateAtInf(mobius: number[][]): number;
/**
 * Evaluates the given mobius function at a specific x.
 *
 * @ignore
 * @param mobius - The mobius function
 * @param x - The x value at which to evaluate
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns The result of the evaluation.
 */
declare function evaluate(mobius: number[][], x: number): number;
declare let Mobius: {
    changeVariables: typeof changeVariables;
    invert: typeof invert;
    evaluateAt0: typeof evaluateAt0;
    evaluateAtInf: typeof evaluateAtInf;
    evaluate: typeof evaluate;
};
export default Mobius;
