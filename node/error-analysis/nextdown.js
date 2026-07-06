import { nextup } from "./nextup";
/**
 * Returns the next representable floating-point number less than
 * `n` toward `-Infinity`.
 *
 * * identical to `nextdown2` but with different implementation
 *
 * * For most numbers, this subtracts one unit in the last place (ulp) from the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Number.MAX_VALUE`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `-Number.MIN_VALUE`,
 *   - `+0` => `-Number.MIN_VALUE`,
 *   - `-Infinity` => `-Infinity`
 *   - `Number.MIN_VALUE => +0 (since `getUlp(5e-324)/2 === 0`)
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
function nextdown(n) {
    return -nextup(-n);
}
function nextdown2(x) {
    if (Number.isNaN(x)) {
        return Number.NaN;
    }
    if (x === Infinity) {
        return Number.MAX_VALUE;
    }
    if (x === -Infinity) {
        return -Infinity;
    }
    if (x === 0) {
        return -Number.MIN_VALUE;
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, x, false);
    let bits = view.getBigUint64(0, false);
    bits = x > 0 ? bits - 1n : bits + 1n;
    view.setBigUint64(0, bits, false);
    return view.getFloat64(0, false);
}
export { nextdown, nextdown2 };
//# sourceMappingURL=nextdown.js.map