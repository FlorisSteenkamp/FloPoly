/**
 * Performs a change of variables x → px + q on the given Mobius
 * function.
 *
 * @param mobius the mobius function M(x) = (ax + b) / (cx + d) represented
 * as [[a,b],[c,d]]
 * @param a
 * @param b
 * @returns The modified mobius function
 * M(x) = (a(px + q) + b) / (c(px + q) + d).
 */
declare function mobChangeVariables(mobius: number[][], a: number, b: number): number[][];
export { mobChangeVariables };
