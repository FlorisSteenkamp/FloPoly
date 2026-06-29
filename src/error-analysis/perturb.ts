import { random } from "./random.js";
import { γ1 } from "./gamma.js";


/**
 * Returns the result of perturbing the given value by a random
 * fraction (in `[0,1]`) of the given Stewart error counter (max)
 * 
 * * **not optimized**; **use in tests only!**
 * 
 * @param v 
 * @param E Stewart error counter
 * @param rngIdx 
 */
function perturb(
        v: number,
        E: number,
        rngIdx?: number | undefined) {

    const frac = 2*random(rngIdx) - 1;
    // const frac = 1;
    const errMax = Math.abs(v) * E * γ1;
    if (errMax === 0) { return v; }

    let err = v * frac * E * γ1;

    let r = v + err;
    // Guard against final-addition roundoff breaching the strict cap.
    while (Math.abs(r - v) > errMax) {
        err /= 2;
        r = v + err;
    }

    return r;
}


export { perturb }

