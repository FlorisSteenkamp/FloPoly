/**
 * Inverts the given polynomial (with coefficients given as Schewchuk floating 
 * point expansions) by reversing the order of the coefficients, 
 * i.e. p(x) -> x^deg(p) * p(1/x)
 * 
 * @param p a polynomial with coefficients given densely as an array of Schewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript
 * eInvert([[3],[2],[-5]]);  // => [[-5],[2],[3]]
 * ```
 * 
 * @doc
 */
function eInvert(p: number[][]): number[][] {
    return p.slice().reverse();
}


export { eInvert }
