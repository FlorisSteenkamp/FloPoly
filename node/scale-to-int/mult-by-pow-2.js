/**
 * Returns `a * 2**e` exactly (bar overflow / underflow of the *result*) even
 * when `2**e` itself is not representable (i.e. `e > 1023`).
 *
 * @param a a double precision floating point number
 * @param e an integer power
 *
 * @internal
 */
function multByPow2(a, e) {
    if (e > 1023) {
        // `2**e` would overflow (even though `a * 2**e` may not) - scale in
        // two (exact) steps
        return a * 2 ** 1023 * 2 ** (e - 1023);
    }
    return a * 2 ** e;
}
export { multByPow2 };
//# sourceMappingURL=mult-by-pow-2.js.map