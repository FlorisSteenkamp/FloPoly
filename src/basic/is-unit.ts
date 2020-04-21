
/**
 * Returns true if the given polynomial is the unit polynomial, i.e. === 1
 * @param a a polynomial
 */
function expIsUnit(a: number[][]) {
    return a.length === 1 && a[0].length === 1 && a[0][0] === 1;
}


export { expIsUnit }
