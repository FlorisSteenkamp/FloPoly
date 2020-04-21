"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns a string representing the given polynomial that is readable by a
 * human or a CAS (Computer Algebra System).
 * @param p a polynomial
 * @example
 * toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 */
function toCasStr(p) {
    let d = p.length - 1;
    let str = '';
    for (let i = 0; i < d + 1; i++) {
        let v = Array.isArray(p[i]) ? flo_numerical_1.estimate(p[i]) : p[i];
        let cStr = numberToString(Math.abs(v));
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
exports.toCasStr = toCasStr;
/** from https://stackoverflow.com/a/46545519/2010061 */
function numberToString(num) {
    let numStr = String(num);
    if (Math.abs(num) < 1.0) {
        let e = parseInt(num.toString().split('e-')[1]);
        if (e) {
            let negative = num < 0;
            if (negative)
                num *= -1;
            num *= Math.pow(10, e - 1);
            numStr = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
            if (negative)
                numStr = "-" + numStr;
        }
    }
    else {
        let e = parseInt(num.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            num /= Math.pow(10, e);
            numStr = num.toString() + (new Array(e + 1)).join('0');
        }
    }
    return numStr;
}
//# sourceMappingURL=to-cas-str.js.map