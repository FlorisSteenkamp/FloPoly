"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePremSequencePrimitive = void 0;
const e_pdiv_trivial_1 = require("./e-pdiv-trivial");
const e_primitive_part_1 = require("../../factor/expansion/e-primitive-part");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ePdivTrivial = e_pdiv_trivial_1.ePdivTrivial;
const eGetPrimitivePart = e_primitive_part_1.ePrimitivePart;
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
function ePremSequencePrimitive(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = ePdivTrivial(r[i - 1], r[i]).r;
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
exports.ePremSequencePrimitive = ePremSequencePrimitive;
//# sourceMappingURL=e-prem-sequence-primitive.js.map