const { abs } = Math;
const MIN_NON_SUBNORMAL = 2.2250738585072014e-308; // === 2**-1022
function isSubnormal(n) {
    return (!Number.isNaN(n) &&
        Number.isFinite(n) &&
        n !== 0 &&
        abs(n) < MIN_NON_SUBNORMAL);
}
export { isSubnormal, MIN_NON_SUBNORMAL };
//# sourceMappingURL=is-subnormal.js.map