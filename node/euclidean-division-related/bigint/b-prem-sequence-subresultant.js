import { bDegree as bDegree_ } from "../../basic/bigint/b-degree.js";
import { bPdivTrivial as bPdivTrivial_ } from "./b-pdiv-trivial.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bDegree = bDegree_;
const bPdivTrivial = bPdivTrivial_;
/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 * @param sturm if set to true then calculate a Sturm sequence instead
 *
 * @doc
 */
function bPremSequenceSubresultant(f, g, sturm = false) {
    const r = [f, g]; // Initialize the PRS
    const d = [bDegree(f), bDegree(g)];
    const a = [1n]; // a_1 === 1
    const c = [1n]; // c_1 === 1
    let i = 1;
    while (true) {
        a.push(r[i][0]); // leading coefficient of r[i-1]
        const d_ = d[i - 1] - d[i];
        const bD_ = BigInt(d_);
        const sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        const D = a[i - 1] * c[i - 1] ** bD_;
        const exp = -bD_ + 1n;
        const cTerm1 = a[i] ** bD_;
        const cTerm2 = c[i - 1] ** (exp < 0n ? -exp : exp);
        c.push(exp < 0
            ? cTerm1 / cTerm2
            : cTerm1 * cTerm2);
        let r_ = bPdivTrivial(r[i - 1], r[i], sturm).r
            .map(coeff => coeff / D);
        r_ = sgn > 0 ? r_ : r_.map(c => -c);
        d.push(bDegree(r_));
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
export { bPremSequenceSubresultant };
//# sourceMappingURL=b-prem-sequence-subresultant.js.map