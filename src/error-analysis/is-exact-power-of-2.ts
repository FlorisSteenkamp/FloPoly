import { parseDouble } from "double-double";
import { sum } from '../util/sum.js';


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

    if (sig[0] === 16 && sum(sig) === 16) {
        return true;  // not a subnormal number and a power of 2
    }

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
