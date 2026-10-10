import { negate } from "../../../basic/double/negate.js";
import { removeLeadingZeros } from "../../../basic/double/remove-leading-zeros.js";


/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * * leading zero coefficients are ignored
 *
 * * returns `0` if the polynomial has no positive roots (roots at `0` are not
 *   considered positive), e.g. for a constant polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 * ```
 * 
 * @doc
 */
function positiveRootUpperBound_LMQ(
        p: number[]): number {

    p = removeLeadingZeros(p);

    const deg = p.length-1;
    if (deg < 1) { 
        return 0; 
    }
    
    if (p[0] < 0) { p = negate(p); }
    
    const timesUsed = [];
    for (let i=0; i<deg; i++) {
        timesUsed.push(1);
    }
    
    let ub = 0;
    
    for (let m=0; m<=deg; m++) {
        if (p[m] >= 0) { continue; }
        
        let tempub = Infinity;
        let any = false;
        
        for (let k=0; k<m; k++) {
            if (p[k] <= 0) { continue; }

            const temp = (-p[m] / (p[k] / 2**timesUsed[k]))**(1/(m-k));
            
            timesUsed[k]++;
            
            if (tempub > temp) { tempub = temp; }
            
            any = true;
        }
        
        if (any && ub < tempub)
            ub = tempub;
    }
    
    return ub;
}


export { positiveRootUpperBound_LMQ }
