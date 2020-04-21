
/**
 * Returns the approximate p-2 norm, i.e. the Euclidean norm of the given array 
 * of numbers.
 */
function p2Norm(p: number[]): number {
    let sum = 0;
    for (let i=0; i<p.length; i++) {
        sum += Math.abs(p[i])**2;
    }
    
    return Math.sqrt(sum);
}


export { p2Norm }
