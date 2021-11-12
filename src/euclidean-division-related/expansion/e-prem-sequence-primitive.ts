import { ePdivTrivial as ePdivTrivial_ } from "./e-pdiv-trivial.js";
import { ePrimitivePart as eGetPrimitivePart_ } from "../../factor/expansion/e-primitive-part.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ePdivTrivial = ePdivTrivial_;
const eGetPrimitivePart = eGetPrimitivePart_;


/**
 * Returns the primitive pseudo remainder sequence of a/b.
 * 
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 * 
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 * 
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of Shewchuk expansions from highest to 
 * lowest power, e.g. `[[5],[-3],[0]]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 * 
 * @doc
 */
function ePremSequencePrimitive(
        f: number[][],
        g: number[][]): number[][][] {

    const r = [f,g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = ePdivTrivial(r[i-1], r[i]).r;
        r_ = eGetPrimitivePart(r_);

        if (r_.length === 0) { 
            return r; 
        } 
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        
        i++;
    }
}


export { ePremSequencePrimitive }
