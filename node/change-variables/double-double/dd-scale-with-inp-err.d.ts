/**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
 * in double precision inlcuding an error bound that has **not** been scaled
 * by `γγ(3)` yet.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 *
 * @doc
 */
declare function ddScaleWithInpErr(p: number[][], s: number, p_: number[]): [number[][], number[]];
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be
 *   incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
declare function ddInplaceScaleWithInpErr(p: number[][], s: number, p_: number[]): void;
export { ddScaleWithInpErr, ddInplaceScaleWithInpErr };
