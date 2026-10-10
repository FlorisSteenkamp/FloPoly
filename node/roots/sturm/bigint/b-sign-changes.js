/**
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bSignChanges([1n,2n,-3n,0n,0n,3n,-1n]); //=> 3
 * ```
 *
 * @doc
 */
function bSignChanges(p) {
    let r = 0;
    let _s = 0; // sign of the previous non-zero coefficient (`0` if none yet)
    for (let i = 0; i < p.length; i++) {
        const s = p[i] === 0n ? 0 : p[i] < 0n ? -1 : +1;
        if (s === 0) {
            continue;
        } // zeros are ignored
        if (_s !== 0 && s !== _s) {
            r++;
        }
        _s = s;
    }
    return r;
}
export { bSignChanges };
//# sourceMappingURL=b-sign-changes.js.map