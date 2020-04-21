
import { prem } from "./pseudo-remainder";
import { expIsZero } from "../basic/is-zero";
import { expIsConst } from "../basic/is-const";


/**
 * Returns the trivial pseudo remainder sequence of a/b.
 * * A disadvantage of using the trivial form is that intermediate coefficients
 * tend to become too high.
 * @param f a polynomial
 * @param g another polynomial
 */
function trivialPseudoRemainderSequence(f: number[][], g: number[][]): number[][][] {
    let r = [f,g];

    for (let i=1; ; i++) {
        // change to pseudo-remainder, i.e. not simply r = a; this allows the 
        // remainders to stay in 'Z'

        let r_ = prem(r[i-1], r[i], false).r;
        if (expIsZero(r_)) { return r; }
        r.push(r_);
        if (expIsConst(r_)) {
            // the remainder is a constant so the next remainder will be 0 
            // anyway.
            return r;    
        }
    }
}


export { trivialPseudoRemainderSequence }
