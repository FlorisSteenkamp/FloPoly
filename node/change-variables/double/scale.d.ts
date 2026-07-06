declare const changeVariablesScale: typeof scale;
/**
* Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
* in double precision.
*
* @param p a polynomial with coefficients given densely as an array of double
* floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
* represents the polynomial `5x^2 - 3x`
* @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
*
* @example
* ```typescript
* changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
* ```
*
* @doc
*/
declare function scale(p: number[], s: number): number[];
/**
 * ❗**MODIFIES**❗ the polynomial such that `p(x)` -> `p(s·x)`,
 * i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 *
 * @doc
 */
declare function inplaceScale(p: number[], s: number): void;
export { scale, inplaceScale, changeVariablesScale };
