
import { expansionDiv, sign, compare, expansionProduct } from "flo-numerical";


/**
 * Returns true if a is an exact constant multiple of b or b of a.
 * @param a a polynomial
 * @param b another polynomial
 */
function isConstMultipleOf(a: number[][], b: number[][]) {
    /** leading coefficient of a */
    let lcA = a[0]; 
    /** leading coefficient of b */
    let lcB = b[0]; 

    // If either polynomial is zero
    if (sign(lcA) === 0 || sign(lcB) === 0) { return true; }
    if (a.length !== b.length) { return false; }

    let multiplier: number[];
    let cmpAB = compare(lcA,lcB);
    if (cmpAB === 0) { 
        multiplier = [1];
    } else {
        if (cmpAB < 0) {
            [a,b] = [b,a];
            [lcA,lcB] = [lcB,lcA];
        }
        multiplier = expansionDiv(lcA, lcB, 0);            
    } 

    for (let i=0; i<a.length; i++) {
        let v = expansionProduct(multiplier, b[i]);
        //console.log(v, a[i])
        if (compare(v, a[i]) !== 0) {
            return false;
        }
    }

    return true;
}


export { isConstMultipleOf }
