import { parseDouble } from "double-double";


/**
 * Returns `true` if `n` is an exact power of 2, i.e. if there exists an
 * integer `k` such that `n === 2^k`.
 * 
 * @param n 
 */
function isExactPowerOf2(
        n: number): boolean {

    const { sign, exponent: exp, significand: sig } = parseDouble(n);

    if (n === 0 || Number.isNaN(n) || !Number.isFinite(n) || sign === 1) {
        return false;
    }

    // `n` is a power of 2 iff exactly one significand limb is non-zero and
    // that limb is a power of 2 (this also covers subnormal numbers)
    let idx = -1;
    for (let i=0; i <sig.length; i++) {
        if (sig[i] !== 0) {
            if (idx !== -1) {
                return false;  // more than one non-zero significand limb
            }
            idx = i;
        }
    }

    // check if the single non-zero limb is a power of 2
    return (sig[idx] & (sig[idx] - 1)) === 0;
}


export { isExactPowerOf2 }
