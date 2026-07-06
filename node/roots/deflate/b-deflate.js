/**
 * Deflates the given polynomial exactly by removing a factor `(x - r)`,
 * where `r` is a root of the polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * bDeflate([1n, -5n, 8n, -4n], 2n);  //=> [1n, -3n, 2n]
 * bDeflate([1n, -3n, 2n], 2n);      //=> [1n,-1n]
 * bDeflate([1n, -1n], 1n);         //=> [1n]
 * ```
 *
 * @doc
 */
function bDeflate(p, root) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(p[i] + root * bs[i - 1]);
    }
    return bs;
}
export { bDeflate };
//# sourceMappingURL=b-deflate.js.map