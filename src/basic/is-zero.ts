
import { sign } from "flo-numerical";


/**
 * Returns true if the given polynomial is the zero polynomial
 * @param a a polynomial
 */
function expIsZero(a: number[][]) {
    return a.length === 0 || (a.length === 1 && sign(a[0]) === 0);
}


export { expIsZero }
