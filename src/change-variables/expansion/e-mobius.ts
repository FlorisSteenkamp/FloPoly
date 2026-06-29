import { eCompress } from "big-float-ts";
import { eTaylorShift } from "./e-taylor-shift.js";
import { eScale } from "./e-scale.js";


function eMobius(
        p: number[][],
        a: number,
        b: number): number[][] {

    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let q = eTaylorShift(p, a);

    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    q = eScale(q, b - a);

    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();

    //-------------------------------------------
    // Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    q = eTaylorShift(q, 1);

    q = q.map(eCompress);

    return q;
}


export { eMobius }
