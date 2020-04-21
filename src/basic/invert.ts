
/**
 * Inverts the given polynomial by reversing the order of the 
 * coefficients, i.e. p(x) -> x^deg(p) * p(1/x)
 * @param p a polynomial
 * @example
 * invert([3,2,-5]);  // => [-5,2,3]
 */
function invert(p: number[]): number[] {
	return p.slice().reverse();
}


/**
 * Inverts the given polynomial by reversing the order of the 
 * coefficients, i.e. p(x) -> x^deg(p) * p(1/x)
 * @param p a polynomial
 * @example
 * invert([3,2,-5]);  // => [[-5],[2],[3]]
 */
function expInvert(p: number[][]): number[][] {
	return p.slice().reverse();
}


export { invert, expInvert }
