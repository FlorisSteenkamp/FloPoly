type BRittDecomposeOptions = {
    /**
     * If true (default), enumerate all admissible inner leading coefficients by
     * exact divisor generation of the outer leading coefficient.
     *
     * If false, use a fast heuristic candidate set.
     */
    completeInnerLeadingCoeffSearch?: boolean;
};
/**
 * Returns the exact decomposition of a polynomial over bigint coefficients.
 *
 * Returns composition factors `[f1, f2, ..., fk]` such that
 * `p = f1(f2(...fk(x)...))` and each factor is indecomposable by this method.
 *
 * This implementation searches proper degree divisors and verifies each
 * candidate by exact recomposition. It is substantially more general than the
 * power-substitution detector.
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param options decomposition options
 */
declare function bRittDecompose(p: bigint[], options?: BRittDecomposeOptions): bigint[][];
/** Recompose factors returned by `bRittDecompose`. */
declare function bRittRecompose(factors: bigint[][]): bigint[];
export { bRittDecompose, bRittRecompose };
export type { BRittDecomposeOptions };
