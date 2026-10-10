type BRittDecomposeOptions = {
    /**
     * @deprecated has no effect anymore - the search is now always complete
     * *and* fast since the inner polynomial candidate is determined directly
     * (over the rationals) without factorizing the leading coefficient.
     */
    completeInnerLeadingCoeffSearch?: boolean;
};
/**
 * Returns the exact decomposition of a polynomial over bigint coefficients.
 *
 * Returns composition factors `[f1, f2, ..., fk]` such that
 * `p = f1(f2(...fk(x)...))` and each factor is indecomposable by this method.
 *
 * * for each proper divisor `s` of the degree the (unique up to linear
 *   equivalence - see Kozen & Landau) monic inner candidate of degree `s` with
 *   zero constant term is determined over the rationals from the leading
 *   coefficients of `p`; the only integral inner candidate that needs to be
 *   checked is then this candidate scaled by the lcm of its coefficient
 *   denominators (any other integral scaling that admits an integral outer
 *   polynomial implies that this minimal one does too); the outer polynomial
 *   is found by repeated exact division and the decomposition is verified by
 *   recomposition
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param options decomposition options (currently unused)
 *
 * @example
 * ```typescript
 * bRittDecompose([1n, 0n, 2n, 0n, 1n]);  //=> [[1n, 2n, 1n], [1n, 0n, 0n]]  (i.e. (u^2 + 2u + 1)∘(x^2))
 * ```
 *
 * @doc
 */
declare function bRittDecompose(p: bigint[], options?: BRittDecomposeOptions): bigint[][];
/** Recompose factors returned by `bRittDecompose`. */
declare function bRittRecompose(factors: bigint[][]): bigint[];
export { bRittDecompose, bRittRecompose };
export type { BRittDecomposeOptions };
