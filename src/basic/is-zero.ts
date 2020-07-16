
//import { eSign } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eSign } = bigFloatOperators;


/**
 * Returns true if the given polynomial is the zero polynomial
 * @param a a polynomial
 */
function expIsZero(a: number[][]) {
    return a.length === 0 || (a.length === 1 && eSign(a[0]) === 0);
}


export { expIsZero }
