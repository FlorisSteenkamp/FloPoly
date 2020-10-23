
import { exponent as exponent_ } from "big-float-ts";
import { bitLength as bitLength_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = exponent_;
const bitLength = bitLength_;


/**
 * Returns the result of scaling the given floats by the *same* power of two 
 * such that all floats become integers (bar overflow).
 * 
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials or Shewchuk expansions
 * 
 * @param as an array of double precision floating point numbers
 */
function scaleFloatsToInts(as: number[]): number[] {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        const a = as[i];
        if (a === 0) { continue; }
        const scaleFactor = -exponent(a) + bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }

    return as.map(a => a*2**e);
}


export { scaleFloatsToInts }
