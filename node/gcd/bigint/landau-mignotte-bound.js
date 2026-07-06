import { p2Norm } from '../../norm/double/p-2-norm.js';
import { bGcdInt } from './b-integer-gcd.js';
const { abs, min } = Math;
/**
 * Every coeﬃcient of the gcd of `a` and `b` in `Z[x]` is bounded in absolute
 * value by `2^min(deg(a),deg(b)) * gcd(lc(a),lc(b)) * min(||a||/|lc(a)|, ||b||/|lc(b)|)`.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q
 */
function bLandauMignotteBound(p, q) {
    const lcP = p[0];
    const lcQ = q[0];
    const dP = BigInt(p.length - 1);
    const dQ = BigInt(q.length - 1);
    const pD = p.map(c => Number(c));
    const qD = q.map(c => Number(c));
    const lcPD = Number(p[0]);
    const lcQD = Number(q[0]);
    const A = 2n ** (dP < dQ ? dP : dQ);
    const B = bGcdInt(lcP, lcQ);
    const C1 = p2Norm(pD) / abs(lcPD);
    const C2 = p2Norm(qD) / abs(lcQD);
    return Number(A) * Number(B) * min(C1, C2);
}
export { bLandauMignotteBound };
//# sourceMappingURL=landau-mignotte-bound.js.map