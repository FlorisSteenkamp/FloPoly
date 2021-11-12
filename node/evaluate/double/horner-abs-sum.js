/**
 * @param p1
 * @param p2
 *
 * @internal
 */
function HornerAbsSum(p1, p2, x) {
    let q = 0;
    for (let i = 0; i < p1.length; i++) {
        // TODO - Math.abs(p1[i] + p2[i]) <-- should this be Math.abs(p1[i]) + Math.abs(p2[i]) ??
        q = Math.abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}
export { HornerAbsSum };
//# sourceMappingURL=horner-abs-sum.js.map