import { eAdd } from '../../basic/expansion/e-add.js';
import { eMultiply } from '../../basic/expansion/e-multiply.js';


/**
 * Returns the polynomial composition `p(q(x))` over expansion coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function eCompose(
        p: number[][],
        q: number[][]): number[][] {

    if (p.length === 0) {
        return [];
    }

    // Horner form: (((p0)q + p1)q + ... + pn)
    let r: number[][] = [];
    for (const c of p) {
        r = eAdd(eMultiply(r, q), [c]);
    }

    return r;
}


export { eCompose };
