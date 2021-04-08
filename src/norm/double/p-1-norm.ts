/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute 
 * values of the given array of numbers (with intermediate calculations done
 * in double precision).
 * 
 * * if the array of numbers represent polynomial coefficients then the p-1 
 * norm is known as the `length` of the polynomial
 * 
 * @param p an array of numbers
 * 
 * @doc
 */
function p1Norm(p: number[]): number {
    let s = 0;
    for (let i=0; i<p.length; i++) {
        s += Math.abs(p[i]);
    }
    
    return s;
}


export { p1Norm }
