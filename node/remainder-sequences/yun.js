"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gcd_prs_1 = require("../gcd/gcd-prs/gcd-prs");
const differentiate_1 = require("../calculus/differentiate");
const euclidean_division_1 = require("../euclidean-division/euclidean-division");
const subtract_1 = require("../basic/subtract");
const degree_1 = require("../basic/degree");
const is_const_1 = require("../basic/is-const");
const multiply_by_const_1 = require("../basic/multiply-by-const");
const __1 = require("..");
/**
 * Return the result of applying Yun's Algorithm to the given polynomial.
 * see https://en.wikipedia.org/wiki/Square-free_polynomial
 * @param f a polynomial
 */
function yunExp(f) {
    let deg = degree_1.degree(f);
    if (deg <= 1) {
        return [f];
    }
    //if (deg <= 2,3,4??) { } // TODO - rather filter using discriminant
    f = __1.scalePolyToIntsExp(f);
    let f_ = differentiate_1.differentiateExact(f);
    console.log('f', f);
    console.log('f_', f_);
    let as = [gcd_prs_1.gcdExact(f, f_)];
    console.log('as[0]', as[0]);
    let q;
    f = multiply_by_const_1.expMultiplyByConst(as[0][0], f);
    q = euclidean_division_1.rem(f, as[0]).q;
    let bs = [, q];
    //console.log(`bs[1]`, bs[1]);
    f_ = multiply_by_const_1.expMultiplyByConst(as[0][0], f_);
    q = euclidean_division_1.rem(f_, as[0]).q;
    let cs = [, q];
    //console.log('cs[1]', cs[1]);
    let b_ = differentiate_1.differentiateExact(bs[1]);
    let ds = [, subtract_1.subtractExact(cs[1], b_)];
    //console.log('ds[1]', ds[1]);
    //throw 'a';
    let i = 1;
    //while (true) {
    while (i < 10) {
        as.push(gcd_prs_1.gcdExact(bs[i], ds[i]));
        //console.log(`as[${i}]`, as[i]);
        let b = multiply_by_const_1.expMultiplyByConst(as[i][0], bs[i]);
        //let b = bs[i];
        q = euclidean_division_1.rem(b, as[i]).q;
        bs.push(q);
        //console.log(`bs[${i+1}]`, bs[i+1]);
        if (is_const_1.expIsConst(bs[i + 1])) {
            break;
        }
        let d = multiply_by_const_1.expMultiplyByConst(as[i][0], ds[i]);
        //let d = ds[i];
        q = euclidean_division_1.rem(d, as[i]).q;
        cs.push(q);
        //console.log(`cs[${i+1}]`, cs[i+1]);
        i++;
        let b_ = differentiate_1.differentiateExact(bs[i]);
        ds.push(subtract_1.subtractExact(cs[i], b_));
        //console.log(`ds[${i}]`, ds[i]);
    }
    as.shift();
    return as;
}
exports.yunExp = yunExp;
//# sourceMappingURL=yun.js.map