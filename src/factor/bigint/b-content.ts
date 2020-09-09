
import { bGcdInts as bGcdInts_ } from "../../gcd/bigint/b-integer-gcd";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bGcdInts = bGcdInts_;


// for some reason the tests fails if not done like below likely because Node
// and TypeScript and BigInt doesn't work perfectly together yet
const b1 = 1n;  


/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the 
 * greatest common divisor of its coefficients.
 * 
 * * the sign is chosen such that dividing the polynomial by cont(p) will
 * always result in a positive leading coefficient
 * 
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 * 
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the 
 * content of `p` and `2x² - x - 1` is its primitive part.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 */
function bContent(p: bigint[]): bigint {
    if (p.length === 0) { 
        // the zero polynomial
        return b1;
    }
    return p[0] < 0n ? -bGcdInts(p) : bGcdInts(p);
}


export { bContent }
