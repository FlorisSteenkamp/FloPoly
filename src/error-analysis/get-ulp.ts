import { parseDouble } from 'double-double';


/**
 * Returns the unit in the last place (ulp) value of the given number.
 * 
 * * not optimized; use in tests only!
 * 
 * @param x 
 */
function getUlp(
        x: number): number {

    // ULP is only defined for finite IEEE-754 numbers.
    if (!Number.isFinite(x)) {
        return Number.NaN;
    }

    const { exponent: exp } = parseDouble(x);
    const r = 2**(exp - 52);

    return r;
}


export { getUlp }
