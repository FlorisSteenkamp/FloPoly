
import { bPdivTrivial as bPdivTrivial_ } from "./b-pdiv-trivial";
import { bPrimitivePart as bGetPrimitivePart_ } from "../../factor/bigint/b-primitive-part";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bPdivTrivial = bPdivTrivial_;
const bGetPrimitivePart = bGetPrimitivePart_;


/**
 * Returns the primitive pseudo remainder sequence of a/b.
 * 
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 * 
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 * 
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest 
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 */
function bPremSequencePrimitive(
        f: bigint[],
        g: bigint[]): bigint[][] {

    const r = [f,g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = bPdivTrivial(r[i-1], r[i]).r;
        r_ = bGetPrimitivePart(r_);

        if (r_.length === 0) { return r; } 
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        
        i++;
    }
}


export { bPremSequencePrimitive }
