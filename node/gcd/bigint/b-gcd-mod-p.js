import { bPdivModP } from "../../euclidean-division-related/bigint/b-pdiv-mod-p.js";
/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials modulo
 * the given prime `p`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function bGcdModP(a, b, p) {
    if (a.length === 0) {
        return b;
    }
    else if (b.length === 0) {
        return a;
    }
    const r = [a, b];
    let i = 1;
    while (true) {
        const r_ = bPdivModP(r[i - 1], r[i], p).r;
        if (r_.length === 0) {
            break;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            break;
        }
        i++;
    }
    return r[r.length - 1];
}
export { bGcdModP };
//# sourceMappingURL=b-gcd-mod-p.js.map