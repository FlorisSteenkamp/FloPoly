/**
 * Returns the result of evaluating (at an integer value) a univariate
 * polynomial with bigint coefficients using Horner's method.
 *
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function bHorner(p, x) {
    let q = 0n;
    for (let i = 0; i < p.length; i++) {
        q = q * x + p[i];
    }
    return q;
}
export { bHorner };
//# sourceMappingURL=b-horner.js.map