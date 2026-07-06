
/**
 * Returns the least non-negative residue of `a` modulo `m`.
 */
function bMod(
        a: bigint,
        m: bigint): bigint {

    const r = a % m;

    return r < 0n ? r + m : r;
}


export { bMod }
