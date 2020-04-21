
import { degree } from "../basic/degree";
import { expansionDiv } from "flo-numerical";
import { expElevateDegree } from "./exp-elevate-degree";
import { addExact } from "../basic/add";
import { multiplyExact } from "../basic/multiply";
import { subtractExact } from "../basic/subtract";
import { expApproxRemoveLeadingZeros } from "../basic/remove-leading-zeros";


/**
 * Returns the Euclidean remainder.
 * 
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b, 
 * and returns r in the formula a = bq + r, where degree(r) < degree(b). q is 
 * called the quotient and r the remainder.
 * 
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 */
function rem(a: number[][], b: number[][]) {
    let q: number[][] = [];
    let d = degree(b);
    let c = b[0];

    let r = a; 

    while (true) {
        let deg = degree(r) - d;
        // The division below is guaranteed to be exact
        let s = [expansionDiv(r[0],c,0)];
        s = expElevateDegree(s, deg);
        q = addExact(q, s);
        let m = multiplyExact([s,b]);
        let n = subtractExact(r, m);

        r = expApproxRemoveLeadingZeros(n);

        if (deg <= 0) { return { q, r }; }
    }
}


export { rem }
