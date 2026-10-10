import { eAdd, eToDd } from "big-float-ts";
import { random } from "./random.js";
import { γ1 } from "./gamma.js";


/**
 * Returns the result of perturbing the given double-double precision floating
 * point number by a random fraction (in [-1,1]) of `E` ulps (max) of the
 * double-double number, i.e. the perturbation is `frac * E * γ1 * 2^-53 * |hi|`
 * where `hi` is the high double of the given number.
 *
 * * **not optimized**; **use in tests only!**
 *
 * @param dd a double-double precision floating point number
 * @param E the maximum number of ulps to perturb by
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

    const err = v * frac * E * γ1 * (2**-53);

    const _r = eAdd(eAdd([dd[0]], [dd[1]]), [err]);

    return eToDd(_r);
}


export { ddPerturb }
