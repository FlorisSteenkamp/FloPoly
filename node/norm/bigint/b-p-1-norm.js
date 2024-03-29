/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of bigints.
 *
 * * if the array of bigints represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of bigints
 *
 * @doc
 */
function bP1Norm(p) {
    let s = 0n;
    for (let i = 0; i < p.length; i++) {
        const n = p[i];
        s += n < 0n ? -n : n;
    }
    return s;
}
export { bP1Norm };
//# sourceMappingURL=b-p-1-norm.js.map