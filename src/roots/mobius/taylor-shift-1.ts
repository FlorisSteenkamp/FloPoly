
/**
 * ❗**MODIFIES**❗ the given polynomial to compute the Taylor shift `p(x + 1)`
 * in place.
 * 
 * * `O(n^2)` via repeated synthetic division by `(x - 1)` (Horner's scheme).
 * 
 * * this function is provided to give a slightly better accuracy than
 * `taylorShift` for the special case of a shift by `1`
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * 
 * @internal
 */
function inplaceTaylorShift1(
        p: number[]): void {

    const n = p.length - 1;

    // The successive remainders are the Taylor coefficients of `p` about `1`,
    // i.e. the coefficients of `p(x + 1)`.
    for (let k=0; k<=n; k++) {
        for (let i=1; i<=n - k; i++) {
            p[i] += p[i - 1];
        }
    }
}


export { inplaceTaylorShift1 }
