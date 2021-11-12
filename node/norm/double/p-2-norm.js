/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of numbers
 * (with intermediate calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function p2Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += p[i] ** 2;
    }
    return Math.sqrt(s);
}
export { p2Norm };
//# sourceMappingURL=p-2-norm.js.map