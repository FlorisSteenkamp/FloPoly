/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * * leading zero coefficients are ignored
 *
 * * returns `0` if the polynomial has no positive roots (roots at `0` are not
 *   considered positive), e.g. for a constant polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 * ```
 *
 * @doc
 */
declare function positiveRootUpperBound_LMQ(p: number[]): number;
export { positiveRootUpperBound_LMQ };
