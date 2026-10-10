/**
 * Returns `n` choose `k` (nCk).
 *
 * * exact for `n <= 56`; rounded (to double precision) for `56 < n <= 60`
 *   and throws for `n > 60`
 *
 * @param n
 * @param k
 */
declare function binomial(n: number, k: number): number;
export { binomial };
