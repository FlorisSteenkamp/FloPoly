
/**
 * Returns the p-1 norm, a.k.a. the Taxicab norm, i.e. the sum of the absolute 
 * values of the given array of numbers.
 */
function p1Norm(p: number[]): number {
    let sum = 0;
    for (let i=0; i<p.length; i++) {
        sum += Math.abs(p[i]);
    }
    
    return sum;
}


export { p1Norm }
