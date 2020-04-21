
import { gcdExact } from "../gcd/gcd-prs/gcd-prs";
import { differentiateExact } from "../calculus/differentiate";
import { rem } from "../euclidean-division/euclidean-division";
import { subtractExact } from "../basic/subtract";
import { degree } from "../basic/degree";
import { expIsUnit } from "../basic/is-unit";
import { expIsConst } from "../basic/is-const";
import { prem } from "./pseudo-remainder";
import { expMultiplyByConst } from "../basic/multiply-by-const";
import { abs } from "flo-numerical";
import { scalePolyToIntsExp } from "..";


/**
 * Return the result of applying Yun's Algorithm to the given polynomial.
 * see https://en.wikipedia.org/wiki/Square-free_polynomial
 * @param f a polynomial
 */
function yunExp(f: number[][]): number[][][] {
    let deg = degree(f);
    if (deg <= 1) { return [f]; }
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

        if (expIsConst(bs[i+1])) { break; }
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


export { yunExp }
