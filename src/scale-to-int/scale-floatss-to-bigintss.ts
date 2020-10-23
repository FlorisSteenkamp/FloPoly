
import { exponent as exponent_ } from "big-float-ts";
import { bitLength as bitLength_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = exponent_;
const bitLength = bitLength_;


const b0 = 0n;  // so tests are not tripped up - awaiting better support


/**
 * Returns the result of scaling the given array of array of floats by the 
 * *same* power of two such that all floats become bigints.
 * 
 * * can be used to scale polynomials (with coefficients given as Shewchuk 
 * expansions)
 * 
 * @param ass an array of an array of double precision floating point numbers
 */
function scaleFloatssToBigintss(ass: number[][]): bigint[][] {
    let e = -1024;
    for (let i=0; i<ass.length; i++) {
        const c = ass[i];
        for (let j=0; j<c.length; j++) {
            const a = c[j];
            if (a === 0) { continue; }
            const scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }

    // check for the trivial case
    if (e === 0) { 
        return ass.map(as => as.map(a => BigInt(a)));
    }

    if (e > 0) {
        return ass.map(as => as.map(a => {
            if (a === 0) { 
                return b0;
            }
            
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a*2**scalePower)*2n**BigInt(e-scalePower);
        }));
    }

    // overflow / underflow cannot occur
    return ass.map(as => as.map(a => BigInt(a*2**e)));
}


export { scaleFloatssToBigintss }
