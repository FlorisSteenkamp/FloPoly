/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)
 *
 * * currently, only integer roots are allowed
 *
 * @param roots an array of roots
 *
 * @example
 * fromRoots([1n,2n,3n,3n]); //=> [1n, -9n, 29n, -39n, 18n]
 */
declare function bFromRoots(roots: bigint[]): bigint[];
export { bFromRoots };
