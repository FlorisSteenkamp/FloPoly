
//import { eDiv } from "big-float-ts";
import { degree as degree_ } from "../basic/degree";
import { expElevateDegree as expElevateDegree_ } from "./exp-elevate-degree";
import { addExact as addExact_ } from "../basic/add";
import { multiplyExact as multiplyExact_ } from "../basic/multiply";
import { subtractExact as subtractExact_ } from "../basic/subtract";
import { expApproxRemoveLeadingZeros as expApproxRemoveLeadingZeros_ } from "../basic/remove-leading-zeros";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eDiv } = bigFloatOperators;
const degree = degree_;
const expElevateDegree = expElevateDegree_;
const addExact = addExact_;
const multiplyExact = multiplyExact_;
const subtractExact = subtractExact_;
const expApproxRemoveLeadingZeros = expApproxRemoveLeadingZeros_;


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
        let s = [eDiv(r[0],c,0)];
        s = expElevateDegree(s, deg);
        q = addExact(q, s);
        let m = multiplyExact([s,b]);
        let n = subtractExact(r, m);

        r = expApproxRemoveLeadingZeros(n);

        if (deg <= 0) { return { q, r }; }
    }
}


export { rem }
