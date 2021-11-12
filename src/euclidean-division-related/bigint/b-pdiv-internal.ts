import { bDegree as bDegree_ } from "../../basic/bigint/b-degree.js";import { bDegree as bDegree_ } from "../../basic/bigint/b-degree.jsimport { bDegree as bDegree_ } from "../../basic/bigint/b-degree.jsimport { bDegree as bDegree_ } from "../../basic/bigint/b-degree.jsimport { bDegree as bDegree_ } from "../../basic/bigint/b-degree.js
import { bElevateDegree as bElevateDegree_ } from "./b-elevate-degree";
import { bAdd as bAdd_ } from "../../basic/bigint/b-add";
import { bMultiply as bMultiply_ } from "../../basic/bigint/b-multiply";
import { bSubtract as bSubtract_ } from "../../basic/bigint/b-subtract";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bDegree = bDegree_;
const bElevateDegree = bElevateDegree_;
const bAdd = bAdd_;
const bMultiply = bMultiply_;
const bSubtract = bSubtract_;


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
 * [[scaleFloatssToBigintss]] before calling this function (recall that all floating 
 * point numbers are rational).
 * 
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 * 
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 * 
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest 
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 * 
 * @internal
 */
function bPdivInternal(
        a: bigint[], b: bigint[]): { q: bigint[]; r: bigint[]; } {
            
    let q: bigint[] = [];
    const d = bDegree(b);
    const c = b[0];

    let r = a; 
    while (true) {
        const deg = bDegree(r) - d;
        if (deg < 0) { 
            return { q, r }; 
        }

        // The division below is guaranteed to be exact
        const s = bElevateDegree([r[0]/c], deg);
        q = bAdd(q, s);
        r = bSubtract(r, bMultiply(s, b));
    }
}


export { bPdivInternal }
