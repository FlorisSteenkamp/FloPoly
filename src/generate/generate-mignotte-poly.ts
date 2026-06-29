import { multiply } from '../basic/double/multiply.js';


/**
 * Returns a Generalized Mignotte polynomial of the form `x^d - 2*(v*x - 1)^k`
 * 
 * * if `k=2` then we get the classic Mignotte polynomial `x^d - 2*(v*x - 1)^2`
 * * if `k>2` then the clustered roots are not necessarily real
 * * root seperation of the Classical Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 * @param k defaults to `2`; the exponent (must be >= 2, if 2 then we get the classic Mignotte polynomial)
 */
function generateMignottePolynomial(
        d: number,
        v: number,
        k = 2): number[] {

    // Build (v*x - 1)^k, then subtract 2 times that polynomial from x^d.
    const base = [v, -1];
    let power = [1];
    for (let i = 0; i < k; i++) {
        power = multiply(power, base);
    }

    const degree = Math.max(d, k);
    const p: number[] = new Array(degree + 1).fill(0);
    p[degree - d] = 1; // x^d

    const offset = degree - (power.length - 1);
    for (let i = 0; i < power.length; i++) {
        p[offset + i] += -2 * power[i];
    }

    return p;
}


export { generateMignottePolynomial }
