import { binomial } from "../../util/double/binomial.js";


/**
 * Returns the Bernstein basis representation (in [0, 1]) from the given
 * power (monomial) basis.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`.
 * 
 * @doc
 */
function powerToBernsteinBasis01(
        p: number[]): number[] {

    const n = p.length - 1;

    if (n >= 4) {
        // Step 1: Scale by 1 / binom(n, j)
        const bc = new Array<number>(n + 1);
        for (let i=0; i<=n; i++) {
            bc[i] = p[n - i] / binomial(n, i);
        }
    
        // Step 2: In-place triangular addition
        for (let i=n; i>0; i--) {
            for (let j=i; j<=n; j++) {
                bc[j] += bc[j - 1];
            }
        }

        return bc;
    }

    if (n === 3) {
        const [a3, a2, a1, a0] = p;
        return [
            a0,
            a0 + a1/3,
            a0 + 2*a1/3 + a2/3,
            a0 + a1 + a2 + a3
        ];
    } 
    if (n === 2) {
        const [a2, a1, a0] = p;
        return [a0, a0 + a1/2, a0 + a1 + a2];
    } 
    if (n === 1) {
        const [a1, a0] = p;
        return [a0, a0 + a1];
    }
    if (n === 0) {
        return [p[0]];
    }

    return [];
}


export { powerToBernsteinBasis01 }

