
//import { expansionProduct, eIntPow, eDiv } from "big-float-ts";
import { operators as bigFloatOperators } from "big-float-ts";
import { prem as prem_ } from "./pseudo-remainder";
import { degree as degree_ } from "../basic/degree";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const prem = prem_;
const degree = degree_;
const { expansionProduct, eIntPow, eDiv } = bigFloatOperators;


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
    let D = expansionProduct(a[i-2], eIntPow(c[i-2], d_));
    let exp = -d_+1;
    let cTerm1 = eIntPow(a[i-1], d_);
    let cTerm2 = eIntPow(c[i-2], Math.abs(exp));
    c.push(exp < 0 
        ? eDiv(cTerm1, cTerm2, 0)
        : expansionProduct(cTerm1, cTerm2)
    );
    let res = prem(r[i-2], r[i-1]);

    let r_ = {
        q: res.q.map(coeff => eDiv(coeff, D, 0)),
        r: res.r.map(coeff => eDiv(coeff, D, 0))
    }

    return r_;
}


export { sprem }
