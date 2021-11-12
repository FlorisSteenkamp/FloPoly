/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of bigints / coefficients.
 *
 * @param p an array of bigints; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function bPInfNorm(p) {
    let max = 0n;
    for (let i = 0; i < p.length; i++) {
        let v = p[i];
        v = v < 0n ? -v : v;
        if (v > max) {
            max = v;
        }
    }
    return max;
}
export { bPInfNorm };
//# sourceMappingURL=b-p-inf-norm.js.map