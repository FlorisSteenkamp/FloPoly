import { scaleFloatssToBigintss } from "../../../scale-to-int/scale-floatss-to-bigintss.js";
import { bSum } from "../../../util/bigint/b-sum.js";
import { bNumRootsIn01 } from "../bigint/b-num-roots-0-1.js";


/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function eNumRootsIn01(
        p: number[][]): number {

    return bNumRootsIn01(scaleFloatssToBigintss(p).map(bSum));
}


export { eNumRootsIn01 }
