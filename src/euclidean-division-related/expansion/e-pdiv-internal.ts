import { eDiv as eDiv_ } from "big-float-ts";
import { eDegree as eDegree_ } from "../../basic/expansion/e-degree.js";
import { eElevateDegree as eElevateDegree_ } from "./e-elevate-degree";
import { eAdd as eAdd_ } from "../../basic/expansion/e-add";
import { eMultiply as eMultiply_ } from "../../basic/expansion/e-multiply";
import { eSubtract as eSubtract } from "../../basic/expansion/e-subtract";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDiv = eDiv_;
const eDegree = eDegree_;
const eElevateDegree = eElevateDegree_;
const eAdd = eAdd_;
const eMultiply = eMultiply_;
const subtractExact = eSubtract;


/**
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (a, b
 * both being polynomials) naively, i.e. in such a way that all intermediate 
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e. 
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b, 
 * and returns `q` and `r` in the formula `a = bq + r`, 
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the 
 * remainder.
 * 
 * * **precondition:** the coefficients must be integers; if they are not they 
 * can easily be scaled from floating point numbers to integers by calling 
 * [[scaleFloatsToBigints]] or similar before calling this function (recall that 
 * all floating point numbers are rational).
 * 
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 * 
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 * 
 * @internal
 */
function ePdivInternal(
        a: number[][], b: number[][]): { q: number[][]; r: number[][]; } {

    let q: number[][] = [];
    const d = eDegree(b);
    const c = b[0];

    let r = a; 

    while (true) {
        const deg = eDegree(r) - d;
        if (deg < 0) { 
            return { q, r }; 
        }

        // The division below is guaranteed to be exact
        let s = [eDiv(r[0], c, 0)];
        s = eElevateDegree(s, deg);
        q = eAdd(q, s);
        r = subtractExact(r, eMultiply(s, b));
    }
}


export { ePdivInternal }
