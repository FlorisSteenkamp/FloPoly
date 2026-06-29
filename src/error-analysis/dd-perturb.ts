import { eAdd, eToDd } from "big-float-ts";
import { random } from "./random.js";
import { γ1 } from "./gamma.js";


/**
 * Returns the result of perturbing the given double-double precision floating
 * point number by a random fraction (in [0,1]) of the given number of ulps (max)
 * where the ulp size is determined by the low double part of the given
 * double-double number.
 * 
 * * **not optimized**; **use in tests only!**
 * 
 * @param v 
 * @param E 
 * @param rngIdx 
 */
function ddPerturb(
        dd: number[],
        E: number,
        rngIdx?: number | undefined) {

    const v = dd[1];

    const frac = 2*random(rngIdx) - 1;
    const errMax = Math.abs(v) * E * γ1;
    if (errMax === 0) { return dd; }

    let err = v * frac * E * γ1;

    let r = v + err;
    // Guard against final-addition roundoff breaching the strict cap.
    while (Math.abs(r - v) > errMax) {
        err /= 2;
        r = v + err;
    }

    err *= (2**-53);

    const _r = eAdd(eAdd([dd[0]], [dd[1]]), [err]);

    return eToDd(_r);
}


export { ddPerturb }
