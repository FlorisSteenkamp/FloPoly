
/**
 * Returns the polynomial with all coeffients made positive of the given 
 * polynomial
 */
function absCoeff(p: number[]) {
    let p_: number[] = [];
    for (let i=0;i<p.length;i++) {
        p_.push(Math.abs(p[i]));
    }

    return p_;
}


export { absCoeff }
