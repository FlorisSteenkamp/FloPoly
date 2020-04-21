
import { prem } from "./pseudo-remainder";
import { expIsZero } from "../basic/is-zero";
import { degree } from "../basic/degree";
import { expansionProduct, intPow, expansionDiv, negativeOf, estimate } from "flo-numerical";
import { expIsConst } from "../basic/is-const";


/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
 * @param sturm if set to true then calculate a Sturm sequence instead
 */
function subresultantPseudoRemainderSequence(
        f: number[][], 
        g: number[][], 
        sturm: boolean): number[][][] {

    let r = [f,g]; // Initialize the PRS
    let d: number[] = [degree(f), degree(g)];
    let a: number[][] = [[1]]; // a_1 === 1
    let c: number[][] = [[1]]; // c_1 === 1
    let i=2

    while (true) {
        a.push(r[i-1][0]); // leading coefficient of r[i-1]
        let d_ = d[i-2] - d[i-1];
        let sgn = sturm
            ? -1
            : (d_+1) % 2 === 0 ? +1 : -1;
        let D = expansionProduct(a[i-2], intPow(c[i-2], d_));
        let exp = -d_+1;
        let cTerm1 = intPow(a[i-1], d_);
        let cTerm2 = intPow(c[i-2], Math.abs(exp));
        // TODO - surely exp >= 1 ??
        c.push(exp < 0 
            ? expansionDiv(cTerm1, cTerm2, 0)
            : expansionProduct(cTerm1, cTerm2)
        );
        let r_ = prem(r[i-2], r[i-1], sturm).r
            .map(coeff => expansionDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(negativeOf);
        d.push(degree(r_));

        if (expIsZero(r_)) { return r; } 
        r.push(r_);
        if (expIsConst(r_)) {
            // the remainder is a constant so the next remainder will be 0 anyway
            return r;
        }
        i++;
    }
}


export { subresultantPseudoRemainderSequence }
