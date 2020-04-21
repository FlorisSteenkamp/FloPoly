/**
 * Returns the trivial pseudo remainder sequence of a/b.
 * * A disadvantage of using the trivial form is that intermediate coefficients
 * tend to become too high.
 * @param f a polynomial
 * @param g another polynomial
 */
declare function trivialPseudoRemainderSequence(f: number[][], g: number[][]): number[][][];
export { trivialPseudoRemainderSequence };
