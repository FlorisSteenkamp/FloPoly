import { bMod } from "./b-mod.js";
import { bXgcd } from "./b-xgcd.js";


/**
 * Combines the two congruences `x ≡ r1 (mod m1)` and `x ≡ r2 (mod m2)` and
 * returns the least nonnegative solution modulo `m1*m2`.
 *
 * * **precondition:** `m1` and `m2` must be non-zero and coprime.
 */
function chineseRemainderAlgorithm(
        r1: bigint,
        r2: bigint,
        m1: bigint,
        m2: bigint): bigint {

    // if (m1 === 0n || m2 === 0n) {
    //     throw new Error('Moduli must be non-zero.');
    // }

    const m1_ = m1 < 0n ? -m1 : m1;
    const m2_ = m2 < 0n ? -m2 : m2;
    const a1 = bMod(r1, m1_);
    const a2 = bMod(r2, m2_);

    const { gcd, x } = bXgcd(m1_, m2_);
    // if (gcd !== 1n) {
    //     throw new Error('Moduli must be coprime.');
    // }

    const m = m1_ * m2_;
    const k = bMod((a2 - a1) * x, m2_);

    return bMod(a1 + m1_ * k, m);
}


export { chineseRemainderAlgorithm }
