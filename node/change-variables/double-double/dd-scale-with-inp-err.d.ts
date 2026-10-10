/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double-double precision including an error bound that has **not** been
 * scaled by `γγ3` yet.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @example
 * ```typescript
 * ddScaleWithInpErr([[0,1],[0,2],[0,7]], 3, [0,0,0]); //=> [[[0,9],[0,6],[0,7]], [30, 14, 0]]
 * ```
 *
 * @doc
 */
declare function ddScaleWithInpErr(p: number[][], s: number, p_: number[]): [number[][], number[]];
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power, e.g.
 * `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @doc
 */
declare function ddInplaceScaleWithInpErr(p: number[][], s: number, p_: number[]): void;
export { ddScaleWithInpErr, ddInplaceScaleWithInpErr };
