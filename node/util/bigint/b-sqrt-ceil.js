/**
 * Returns the smallest non-negative integer `s` such that `s*s >= n`, i.e.
 * `⌈√n⌉`.
 *
 * * uses Newton's method
 *
 * @param n a non-negative bigint
 *
 * @doc
 */
function bSqrtCeil(n) {
    if (n < 0n) {
        throw new Error('`n` must be non-negative.');
    }
    if (n < 2n) {
        return n;
    }
    // initial guess: 2^⌈bits/2⌉ >= √n
    const bits = n.toString(2).length;
    let x = 1n << BigInt(Math.ceil(bits / 2));
    // Newton's method (converges from above to ⌊√n⌋)
    while (true) {
        const y = (x + n / x) >> 1n;
        if (y >= x) {
            break;
        }
        x = y;
    }
    return x * x === n ? x : x + 1n;
}
export { bSqrtCeil };
//# sourceMappingURL=b-sqrt-ceil.js.map