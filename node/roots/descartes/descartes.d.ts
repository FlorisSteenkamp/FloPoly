/**
 * Returns an upper bound of the number of *positive* real roots of the given
 * polynomial - this upper bound is always a multiple of two (i.e. 0, 2, etc)
 * higher than the actual number of real roots.
 * * the polynomial need not be square free
 */
declare function expDescartes(p: number[][]): number;
/**
 * Returns an upper bound of the number of real roots of the given polynomial
 * in (0,a) - this upper bound is always a multiple of two (i.e. 0, 2, etc)
 * higher (or lower?) than the actual number of real roots.
 * * note that that the interval is *open*, thus it may be advisable to check
 * for roots at 0 and a before calling this function
 * * the polynomial need not be square free
 */
declare function expDescartesFrom0ToA(p: number[][], a: number[]): number;
export { expDescartes, expDescartesFrom0ToA };
