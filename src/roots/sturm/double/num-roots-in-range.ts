import { bNumRootsInRange } from '../bigint/b-num-roots-in-range.js';
import { scaleFloatsToBigints } from "../../../scale-to-int/scale-floats-to-bigints.js";
import { bScale, bInvScale } from '../../../change-variables/bigint/b-scale.js';
import { toCasStr } from '../../../basic/to-cas-str.js';

const { abs } = Math;


/** 
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 * 
 * @example
 * ```typescript 
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1  
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 * ```
 * 
 * @doc
 */ 
function numRootsInRange(
        p: number[],
        a: number,
        b: number): number {

    const [A, B] = scaleFloatsToBigints([a,b]);
    const maxIdx = abs(a) >= abs(b) ? 0 : 1;

    const v = [a,b][maxIdx];
    const V = [A,B][maxIdx];

    const d = p.length;

    const s = v/Number(V);
    let pB = scaleFloatsToBigints(p);
    if (s < 1) {
        const S = BigInt(1/s);  // exact division
        pB = pB.map(c => c*(S**BigInt(d)));
        pB = bInvScale(pB, S)
    } else {
        pB = bScale(pB, BigInt(s));
    }

    return bNumRootsInRange(pB, A, B);
}


export { numRootsInRange }
