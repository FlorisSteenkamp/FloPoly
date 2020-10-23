
/**
 * Returns the polynomial with all coeffients the absolute value of the given 
 * polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 */
function absCoeff(p: number[]) {
    const p_: number[] = [];
    for (let i=0; i<p.length; i++) {
        p_.push(Math.abs(p[i]));
    }

    return p_;
}


export { absCoeff }
