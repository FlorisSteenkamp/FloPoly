
/** 
 * Returns the degree of the polynomial.
 * @param p a polynomial
 * @example 
 * degree([9,8,7,6,5,4,3,2,1]); //=> 8
 */
function degree(p: number[] | number[][]): number {
	return p.length-1;
}


export { degree }
    