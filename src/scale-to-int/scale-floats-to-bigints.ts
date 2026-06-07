import { exponent } from "big-float-ts";
import { bitLength } from "big-float-ts";


/**
 * Returns the result of scaling the given array of floats by the *same* power 
 * of two such that all floats become bigints.
 * 
 * * can be used to scale polynomials
 * 
 * @param as an array of double precision floating point numbers
 * 
 * @doc
 */
function scaleFloatsToBigints(as: number[]): bigint[] {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        const a = as[i];
        if (a === 0) { continue; }
        const scalePower = -exponent(a) + bitLength(a) - 1;
        if (scalePower > e) {
            e = scalePower;
        }
    }


    // check for the trivial case
    if (e === 0) { 
        return as.map(a => BigInt(a));
    }

    if (e > 0) {
        return as.map(a => {
            if (a === 0) { 
                return 0n; 
            }
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a*2**scalePower) * 2n**BigInt(e-scalePower);
        });
    }

    // overflow / underflow cannot occur
    return as.map(a => BigInt(a*2**e));  
}


export { scaleFloatsToBigints }
