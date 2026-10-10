/**
 * Returns the result of scaling the given array of floats by the *same* power
 * of two such that all floats become bigints.
 *
 * * the result is exact (overflow cannot occur)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
declare function scaleFloatsToBigints(as: number[]): bigint[];
export { scaleFloatsToBigints };
