
import { expansionProduct, abs } from "flo-numerical";

import { degree } from "../basic/degree";
import { expMultiplyByConst } from "../basic/multiply-by-const";
import { rem } from "../euclidean-division/euclidean-division";


/**
 * Returns the trivial pseudo-remainder, i.e. with α === 1.
 * 
 * The result could be in-exact in the presence of underflow.
 * 
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b, 
 * where a is first multiplied by leadingCoeff(b)^(deg(a)-deg(b)+1) so we can
 * guarantee exact divisions. Returns r in the formula a = bq + r, where 
 * degree(r) < degree(b). q is called the quotient and r the remainder.
 * 
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier if set then the multiplier leadingCoeff(b)^(deg(a)-deg(b)+1)
 * will be modified to abs(leadingCoeff(b)^(deg(a)-deg(b)+1))
 */
function prem(a: number[][], b: number[][], positiveMultiplier = false) {
    // change to pseudo-remainder, i.e. not simply r = a; this allows the 
    // remainders to stay in 'Z'

    // let m = leadingCoeff(b)^(deg(a)-deg(b)+1)
    let exponent = degree(a) - degree(b) + 1;
    let m = b[0];
    for (let i=1; i<exponent; i++) {
        m = expansionProduct(m, b[0]);
    }
    m = positiveMultiplier ? abs(m) : m;
    let a_ = expMultiplyByConst(m, a); 

    return rem(a_, b);
}


export { prem }
