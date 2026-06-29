/**
 * Returns the sum of an array of `bigint`s.
 *
 * * **not optimized** for performance
 *
 * @param a
 */
function bSum(a) {
    let sum = 0n;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}
export { bSum };
//# sourceMappingURL=b-sum.js.map