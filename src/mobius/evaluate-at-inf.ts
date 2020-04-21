
/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * @private
 * @param mobius - The mobius function 
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function mobEvaluateAtInf(mobius: number[][]): number {
	return mobius[0][0] / mobius[1][0];
}


export { mobEvaluateAtInf }
    