/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bEvaluateAt0([3n,2n,99n]); //=> 99n
 * ```
 *
 * @doc
 */
function bEvaluateAt0(p) {
    return p.length === 0 ? 0n : p[p.length - 1];
}
export { bEvaluateAt0 };
//# sourceMappingURL=b-evaluate-at-0.js.map