/**
 * Returns the least non-negative residue of `a` modulo `m`.
 */
function bMod(a, m) {
    const r = a % m;
    return r < 0n ? r + m : r;
}
export { bMod };
//# sourceMappingURL=b-mod.js.map