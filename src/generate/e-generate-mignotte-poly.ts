
/**
 * Returns the Classical Mignotte polynomial of the form `x^d - 2*(v*x - 1)^2`
 * with coefficients represented as Shewchuck floating point expansions.
 * 
 * * root seperation of Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 * 
 * * a classic ill-conditioned polynomial with two real roots very close
 *   together (near x = 1/a), used to stress-test root isolation.
 *
 * @param d the degree of the Mignotte polynomial
 * @param v the parameter
 */
function eGenerateMignottePolynomial(
        d: number,
        v: number): number[][] {

    // Mignotte polynomial: x^n - 2*(a*x - 1)^2
    //   = x^n - 2*a^2*x^2 + 4*a*x - 2
    const p: number[][] = new Array(d + 1).fill([0]);
    p[0] = [1];            // x^degree
    p[d - 2] = [-2*v*v];   // x^2
    p[d - 1] = [4*v];      // x^1
    p[d] = [-2];           // x^0

    return p;
}


export { eGenerateMignottePolynomial }
    