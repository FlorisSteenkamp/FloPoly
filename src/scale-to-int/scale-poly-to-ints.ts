
//import { exponent, bitLength } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { exponent, bitLength } = bigFloatOperators;


/**
 * Returns the result of scaling the given floats by a power of two such that
 * all floats become integers - can be used to scale floating point expansions
 * and polynomials
 * @param a a floating point number
 */
function scalePolyToIntsExp(p: number[][]) {
    let e = -1024;
    for (let i=0; i<p.length; i++) {
        let c = p[i];
        for (let j=0; j<c.length; j++) {
            let a = c[j];
            let scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }

    return p.map(c => c.map(a => a*2**e));
}


// TODO - bigints
/**
 * Returns the result of scaling the given floats by a power of two such that
 * all floats become integers - can be used to scale floating point expansions
 * and polynomials
 * @param a a floating point number
 *//*
function scalePolyToBigIntsExp(p: number[][]) {
    let e = -1024;
    for (let i=0; i<p.length; i++) {
        let c = p[i];
        for (let j=0; j<c.length; j++) {
            let a = c[j];
            let scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }

    let p_: bigint[] = [];
    for (let i=0; i<p.length; i++) {
        let c = p[i];
        let c_ = 0n;
        for (let j=0; j<c.length; j++) {
            let a = c[j];
        }
    }

    return p.map(c => c.map(a => a*2**e));
}
*/

export { scalePolyToIntsExp }
