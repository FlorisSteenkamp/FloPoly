/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers
 *
 * @doc
 */
declare function gcdInt(a: number, b: number): number;
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @doc
 */
declare function gcdInts(vals: number[]): number;
export { gcdInt, gcdInts };
