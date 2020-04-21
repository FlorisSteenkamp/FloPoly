declare type TEval = {
    /** An estimate */
    r̂: number;
    /** The level of effort that was required to calculate the sign */
    level: number;
};
/**
 * Returns the result of evaluating the given polynomial at x and a level that
 * indicates the difficulty of attaining the correct sign.
 * * polynomial coefficients must be given in quad precision
 * @param p a polynomial
 * @param x an evaluation point
 */
declare function quadEvalK1(p: number[][], x: number): TEval;
declare function quadEvalK2(p: number[][], x: number): TEval;
declare function quadEvalK4(p: number[][], x: number): TEval;
export { quadEvalK1, quadEvalK2, quadEvalK4 };
