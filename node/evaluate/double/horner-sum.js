/**
 * * helper function
 *
 * @param p1
 * @param p2
 *
 * @internal
 */
function HornerSum(p1, p2, a) {
    let result = 0;
    for (let i = 0; i < p1.length; i++) {
        result = p1[i] + p2[i] + result * a;
    }
    return result;
}
export { HornerSum };
//# sourceMappingURL=horner-sum.js.map