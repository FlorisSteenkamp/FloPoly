/**
 * Returns the result of multiplying 2 polynomials with bigint coefficients.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial.
 *
 * @example
 * ```typescript
 * bMultiply([1n,2n,3n], [2n,5n,3n,5n]); //=> [2n, 9n, 19n, 26n, 19n, 15n]
 * ```
 *
 * @doc
 */
function bMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    const r = new Array(d + 1).fill(0n);
    for (let i = 0; i < da + 1; i++) {
        for (let j = 0; j < db + 1; j++) {
            r[d - (i + j)] += (a[da - i] * b[db - j]);
        }
    }
    return r;
}
export { bMultiply };
//# sourceMappingURL=b-multiply.js.map