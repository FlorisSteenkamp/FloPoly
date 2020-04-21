/**
 * Returns the result of evaluating the given polynomial at x such that at least
 * the sign bit is guaranteed correct.
 * @param p a polynomial
 * @param x an evaluation point
 */
declare function evalK1(p: number[], x: number): number;
declare function evalK2(p: number[], x: number): number;
declare function evalK4(p: number[], x: number): number;
export { evalK1, evalK2, evalK4 };
