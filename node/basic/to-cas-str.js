import { eEstimate } from "big-float-ts";
const { abs } = Math;
/** @internal */
function isShewchuk(x) {
    return Array.isArray(x);
}
/** @internal */
function isBigint(x) {
    return typeof x === 'bigint';
}
/**
 * Returns a string representing the given polynomial that is readable by a
 * human or a CAS (Computer Algebra System).
 *
 * * integer coefficients (including doubles with an integral value larger
 *   than `2^53`) are printed exactly (never in exponential notation)
 *
 * * non-integer double coefficients are printed as the *shortest* decimal
 *   that rounds to the same double (i.e. round-trip exact), never in
 *   exponential notation
 *
 * * **note:** if the polynomial coefficients are given as Shewchuk expansions
 *   then they are printed exactly if all expansion components are integers,
 *   else the coefficients are first down-converted to double precision
 *
 * @param p a polynomial (with coefficients given densely as an array of Shewchuk
 * floating point expansions **or** double precision floating point numbers **or**
 * bigints) from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * toCasStr([5,4,3,2,1]);           //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([[5],[4],[3],[2],[1]]); //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([5n,4n,3n,2n,1n]);      //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([5,-4,0,2,-1]);         //=> " + 5*x^4 - 4*x^3 + 2*x - 1"
 * toCasStr([-1.5,0,2]);            //=> " - 1.5*x^2 + 2"
 * toCasStr([2**80, 1e-7]);         //=> " + 1208925819614629174706176*x + 0.0000001"
 * ```
 *
 * @doc
 */
function toCasStr(p) {
    const d = p.length - 1;
    let str = '';
    for (let i = 0; i < d + 1; i++) {
        const _v = p[i];
        const v = isShewchuk(_v)
            ? (_v.every(Number.isInteger)
                ? _v.reduce((s, c) => s + BigInt(c), 0n) // exact
                : eEstimate(_v))
            : _v; // bigint or number
        const absV = isBigint(v)
            ? (v < 0n ? -v : v)
            : abs(v);
        let cStr = nonNegativeNumberToString(absV);
        if (v === 0 || cStr === '0') {
            continue;
        }
        cStr = (v >= 0 ? ' + ' : ' - ') + cStr;
        if (i === d) {
            str += cStr;
        }
        else if (i === d - 1) {
            str += cStr + '*x';
        }
        else {
            str += cStr + '*x^' + (d - i).toString();
        }
    }
    return str;
}
/**
 * Returns the given non-negative number as a string in positional (never
 * exponential) notation: exactly for integers and as the shortest decimal
 * that rounds to the same double for non-integers.
 *
 * @internal
 */
function nonNegativeNumberToString(num) {
    if (isBigint(num)) {
        return num.toString();
    }
    if (Number.isInteger(num)) {
        return BigInt(num).toString(); // exact (also for `num >= 2^53`)
    }
    return expandExponent(num.toString());
}
/**
 * Expands a decimal string in exponential notation (e.g. `1.25e-8`) into
 * positional notation (e.g. `0.0000000125`) keeping the digits as is.
 *
 * @internal
 */
function expandExponent(str) {
    const m = /^(\d+)(?:\.(\d+))?e([+-]\d+)$/.exec(str);
    if (!m) {
        return str; // not in exponential notation (or not a finite number)
    }
    const intPart = m[1];
    const fracPart = m[2] ?? '';
    const e = parseInt(m[3]);
    const digits = intPart + fracPart;
    const pointPos = intPart.length + e; // position of the decimal point in `digits`
    if (pointPos <= 0) {
        return '0.' + '0'.repeat(-pointPos) + digits;
    }
    if (pointPos >= digits.length) {
        return digits + '0'.repeat(pointPos - digits.length);
    }
    return digits.slice(0, pointPos) + '.' + digits.slice(pointPos);
}
export { toCasStr };
//# sourceMappingURL=to-cas-str.js.map