/**
 * Returns the subresultant pseudo remainder of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
  */
declare function sprem(f: number[][], g: number[][]): {
    q: number[][];
    r: number[][];
};
export { sprem };
