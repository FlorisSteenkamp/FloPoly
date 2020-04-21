/**
 * Returns the result of evaluating the given polynomial at x, and a level that
 * indicates the difficulty of attaining the correct sign.
 * * if zero is returned then the result was too close to 0 to evaluate accurately.
 * * **Level 1**: Do a simple Horner evaluation with running error bound and see
 * if the sign is definitely positive or negative, else goto level 2.
 * @param p a polynomial
 * @param pE an error polynomial - all coefficients must be positive
 * @param x an evaluation point
 */
declare function evalK1WithErrBounds(p: number[], pE: number[], x: number): number;
export { evalK1WithErrBounds };
