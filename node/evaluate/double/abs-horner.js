const abs = Math.abs;
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method and where the absolute value of each coefficient is taken.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which `p` should be evaluated
 *
 * @doc
 */
function AbsHorner(p, x) {
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * x + abs(p[i]);
    }
    return q;
}
// inlined (with q => e2, p => p0)
//let e2 = abs(p0[0]); for (let i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }
export { AbsHorner };
//# sourceMappingURL=abs-horner.js.map