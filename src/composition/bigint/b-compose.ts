import { bAdd } from '../../basic/bigint/b-add.js';
import { bMultiply } from '../../basic/bigint/b-multiply.js';


/**
 * Returns the polynomial composition `p(q(x))` over bigint coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function bCompose(
        p: bigint[],
        q: bigint[]): bigint[] {

    if (p.length === 0) {
        return [];
    }

    // Horner form: (((p0)q + p1)q + ... + pn)
    let r: bigint[] = [];
    for (const c of p) {
        r = bAdd(bMultiply(r, q), [c]);
    }

    return r;
}


export { bCompose }
