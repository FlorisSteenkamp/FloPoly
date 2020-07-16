"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yunExp = void 0;
//import { eAbs } from "big-float-ts";
const gcd_prs_1 = require("../gcd/gcd-prs/gcd-prs");
const differentiate_1 = require("../calculus/differentiate");
const euclidean_division_1 = require("../euclidean-division/euclidean-division");
const subtract_1 = require("../basic/subtract");
const degree_1 = require("../basic/degree");
const is_unit_1 = require("../basic/is-unit");
const is_const_1 = require("../basic/is-const");
const pseudo_remainder_1 = require("./pseudo-remainder");
const multiply_by_const_1 = require("../basic/multiply-by-const");
const scale_poly_to_ints_1 = require("../scale-to-int/scale-poly-to-ints");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eAbs } = big_float_ts_1.operators;
const gcdExact = gcd_prs_1.gcdExact;
const differentiateExact = differentiate_1.differentiateExact;
const rem = euclidean_division_1.rem;
const subtractExact = subtract_1.subtractExact;
const degree = degree_1.degree;
const expIsUnit = is_unit_1.expIsUnit;
const expIsConst = is_const_1.expIsConst;
const prem = pseudo_remainder_1.prem;
const expMultiplyByConst = multiply_by_const_1.expMultiplyByConst;
const scalePolyToIntsExp = scale_poly_to_ints_1.scalePolyToIntsExp;
/**
 * Return the result of applying Yun's Algorithm to the given polynomial.
 * see https://en.wikipedia.org/wiki/Square-free_polynomial
 * @param f a polynomial
 */
function yunExp(f) {
    let deg = degree(f);
    if (deg <= 1) {
        return [f];
    }
    //if (deg <= 2,3,4??) { } // TODO - rather filter using discriminant
    f = scalePolyToIntsExp(f);
    let f_ = differentiateExact(f);
    console.log('f', f);
    console.log('f_', f_);
    let as = [gcdExact(f, f_)];
    console.log('as[0]', as[0]);
    let q;
    f = expMultiplyByConst(as[0][0], f);
    q = rem(f, as[0]).q;
    let bs = [, q];
    //console.log(`bs[1]`, bs[1]);
    f_ = expMultiplyByConst(as[0][0], f_);
    q = rem(f_, as[0]).q;
    let cs = [, q];
    //console.log('cs[1]', cs[1]);
    let b_ = differentiateExact(bs[1]);
    let ds = [, subtractExact(cs[1], b_)];
    //console.log('ds[1]', ds[1]);
    //throw 'a';
    let i = 1;
    //while (true) {
    while (i < 10) {
        as.push(gcdExact(bs[i], ds[i]));
        //console.log(`as[${i}]`, as[i]);
        let b = expMultiplyByConst(as[i][0], bs[i]);
        //let b = bs[i];
        q = rem(b, as[i]).q;
        bs.push(q);
        //console.log(`bs[${i+1}]`, bs[i+1]);
        if (expIsConst(bs[i + 1])) {
            break;
        }
        let d = expMultiplyByConst(as[i][0], ds[i]);
        //let d = ds[i];
        q = rem(d, as[i]).q;
        cs.push(q);
        //console.log(`cs[${i+1}]`, cs[i+1]);
        i++;
        let b_ = differentiateExact(bs[i]);
        ds.push(subtractExact(cs[i], b_));
        //console.log(`ds[${i}]`, ds[i]);
    }
    as.shift();
    return as;
}
exports.yunExp = yunExp;
//# sourceMappingURL=yun.js.map