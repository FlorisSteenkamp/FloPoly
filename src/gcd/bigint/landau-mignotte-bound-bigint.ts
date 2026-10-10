import { bGcdInt } from './b-integer-gcd.js';
import { bP2NormSquared } from '../../norm/bigint/b-p-2-norm-squared.js';
import { bSqrtCeil } from '../../util/bigint/b-sqrt-ceil.js';


/**
 * Returns an integer upper bound (calculated using bigints so that overflow
 * cannot occur) on the absolute value of every coefficient of the gcd of
 * `p` and `q` in `Z[x]`, i.e. the Landau-Mignotte bound
 * `2^min(deg(p),deg(q)) * gcd(lc(p),lc(q)) * min(||p||/|lc(p)|, ||q||/|lc(q)|)`
 * rounded up (exactly) to an integer.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * see also [[bLandauMignotteBound]] that returns the bound as a double (and
 *   that can overflow to `Infinity` for very large coefficients)
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q another polynomial
 *
 * @doc
 */
function bLandauMignotteBoundBigint(
        p: bigint[],
        q: bigint[]): bigint {

    const lcP = p[0] < 0n ? -p[0] : p[0];
    const lcQ = q[0] < 0n ? -q[0] : q[0];

    const dP = p.length - 1;
    const dQ = q.length - 1;

    const A = 2n**BigInt(dP < dQ ? dP : dQ);
    const B = bGcdInt(lcP, lcQ);
    const AB2 = (A*B)*(A*B);

    // The smallest integer `M` with `M >= A·B·||p||₂/|lc(p)|` satisfies
    // `M²·lc(p)² >= A²B²·||p||₂²`, i.e. `M = ⌈√⌈A²B²·||p||₂² / lc(p)²⌉⌉`
    // (exactly the ceiling of the real-valued bound)
    const M1 = bSqrtCeil(ceilDiv(AB2 * bP2NormSquared(p), lcP*lcP));
    const M2 = bSqrtCeil(ceilDiv(AB2 * bP2NormSquared(q), lcQ*lcQ));

    return M1 < M2 ? M1 : M2;
}


/** Returns `⌈a/b⌉` for non-negative `a` and positive `b` */
function ceilDiv(a: bigint, b: bigint): bigint {
    return (a + b - 1n) / b;
}


export { bLandauMignotteBoundBigint }
