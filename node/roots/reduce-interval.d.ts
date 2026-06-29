/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * @param lb
 * @param ub
 * @param p
 */
declare function reduceInterval(lb: number, ub: number, p: number[]): number[];
export { reduceInterval };
