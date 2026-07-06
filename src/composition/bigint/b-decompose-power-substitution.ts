import { bRemoveLeadingZeros } from '../../basic/bigint/b-remove-leading-zeros.js';
import { gcdInt } from '../../gcd/double/integer-gcd.js';


/**
 * Detects decompositions of the form `p(x) = f(x^k)` over bigint coefficients.
 *
 * If such a nontrivial decomposition exists (`k > 1`), returns `{ f, g, k }`
 * where `g(x) = x^k`. Otherwise returns `undefined`.
 *
 * @param p polynomial coefficients from highest to lowest power
 */
function bDecomposePowerSubstitution(
        p: bigint[]): { f: bigint[]; g: bigint[]; k: number; } | undefined {

    const q = bRemoveLeadingZeros(p);
    if (q.length <= 1) {
        return undefined;
    }

    const n = q.length - 1;
    let k = 0;
    let nonZeroCount = 0;

    for (let i = 0; i < q.length; i++) {
        const c = q[i];
        if (c === 0n) {
            continue;
        }

        nonZeroCount++;
        const exp = n - i;
        k = gcdInt(k, exp);
    }

    // Constant/zero or no nontrivial common exponent factor.
    if (nonZeroCount <= 1 || k <= 1) {
        return undefined;
    }

    const d = n / k;
    const f = new Array<bigint>(d + 1).fill(0n);
    for (let i = 0; i < q.length; i++) {
        const c = q[i];
        if (c === 0n) {
            continue;
        }

        const exp = n - i;
        const j = exp / k;
        f[d - j] = c;
    }

    const g = [1n, ...new Array<bigint>(k).fill(0n)];

    return { f: bRemoveLeadingZeros(f), g, k };
}


export { bDecomposePowerSubstitution }
