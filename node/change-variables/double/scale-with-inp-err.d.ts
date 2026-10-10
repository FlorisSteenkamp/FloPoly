/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double precision including an error bound that has **not** been scaled
 * by `γ1` yet.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @example
 * ```typescript
 * scaleWithInpErr([1,2,7], 3, [0,0,0]); //=> [[9, 6, 7], [18, 6, 0]]
 * ```
 *
 * @doc
 */
declare function scaleWithInpErr(p: number[], s: number, p_: number[]): [number[], number[]];
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
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
declare function inplaceScaleWithInpErr(p: number[], s: number, p_: number[]): void;
export { scaleWithInpErr, inplaceScaleWithInpErr };
