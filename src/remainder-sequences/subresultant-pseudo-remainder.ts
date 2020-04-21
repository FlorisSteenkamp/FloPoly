
import { prem } from "./pseudo-remainder";
import { expIsZero } from "../basic/is-zero";
import { degree } from "../basic/degree";
import { expansionProduct, intPow, expansionDiv, negativeOf, estimate } from "flo-numerical";


/**
 * Returns the subresultant pseudo remainder of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
  */
function sprem(
        f: number[][], 
        g: number[][]) {

    let r = [f,g]; // Initialize the PRS
    let d: number[] = [degree(f), degree(g)];
    let a: number[][] = [[1]]; // a_1 === 1
    let c: number[][] = [[1]]; // c_1 === 1
    let i = 2;

    a.push(r[i-1][0]); // leading coefficient of r[i-1]
    let d_ = d[i-2] - d[i-1];
    let sgn = (d_+1) % 2 === 0 ? +1 : -1;
    let D = expansionProduct(a[i-2], intPow(c[i-2], d_));
    let exp = -d_+1;
    let cTerm1 = intPow(a[i-1], d_);
    let cTerm2 = intPow(c[i-2], Math.abs(exp));
    c.push(exp < 0 
        ? expansionDiv(cTerm1, cTerm2, 0)
        : expansionProduct(cTerm1, cTerm2)
    );
    let res = prem(r[i-2], r[i-1]);

    let r_ = {
        q: res.q.map(coeff => expansionDiv(coeff, D, 0)),
        r: res.r.map(coeff => expansionDiv(coeff, D, 0))
    }

    return r_;
}


export { sprem }
