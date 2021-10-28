/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk 
 * floating point expansions) is the unit polynomial, i.e. === 1.
 * 
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function eIsUnit(p: number[][]): boolean {
    return p.length === 1 && p[0].length === 1 && p[0][0] === 1;
}


export { eIsUnit }
