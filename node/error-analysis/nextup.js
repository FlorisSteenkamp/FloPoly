import { getUlp } from "./get-ulp";
import { isExactPowerOf2 } from "./is-exact-power-of-2";
/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup2` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - -Number.MIN_VALUE => -0 (since `getUlp(5e-324)/2 === 0`)
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
function nextup(n) {
    if (Number.isNaN(n)) {
        return Number.NaN;
    }
    if (n === Infinity) {
        return Infinity;
    }
    if (n === -Infinity) {
        return -Number.MAX_VALUE;
    }
    if (n === 0) {
        return Number.MIN_VALUE;
    }
    if (n === -Number.MIN_VALUE) {
        return -0;
    } // since `getUlp(5e-324)/2 === 0`
    const r = n < 0 && isExactPowerOf2(-n)
        ? n + getUlp(n) / 2
        : n + getUlp(n);
    return r;
}
/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - `Number.MAX_VALUE => Infinity`
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
function nextup2(x) {
    if (Number.isNaN(x)) {
        return Number.NaN;
    }
    if (x === Infinity) {
        return Infinity;
    }
    if (x === -Infinity) {
        return -Number.MAX_VALUE;
    }
    if (x === 0) {
        return Number.MIN_VALUE;
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, x, false);
    let bits = view.getBigUint64(0, false);
    bits = x > 0 ? bits + 1n : bits - 1n;
    view.setBigUint64(0, bits, false);
    return view.getFloat64(0, false);
}
export { nextup, nextup2 as nextUp2 };
//# sourceMappingURL=nextup.js.map