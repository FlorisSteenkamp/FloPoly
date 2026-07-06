/**
 * Detects decompositions of the form `p(x) = f(x^k)` over bigint coefficients.
 *
 * If such a nontrivial decomposition exists (`k > 1`), returns `{ f, g, k }`
 * where `g(x) = x^k`. Otherwise returns `undefined`.
 *
 * @param p polynomial coefficients from highest to lowest power
 */
declare function bDecomposePowerSubstitution(p: bigint[]): {
    f: bigint[];
    g: bigint[];
    k: number;
} | undefined;
export { bDecomposePowerSubstitution };
