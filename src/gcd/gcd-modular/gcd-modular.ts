
import { getPrimitivePart } from "../get-primitive-part";
import { scaleFloatsToInts } from "../../scale-to-int/scale-floats-to-ints";
import { gcdInt } from "../integer-gcd";
import { getContent } from "../get-content";
import { divideByConst } from "../../basic/divide-by-const";
import { degree } from "../../basic/degree";
import { pInfNorm } from '../../norm/p-inf-norm';
import { multiply } from "../../basic/multiply";
import { multiplyByConst } from "../../basic/multiply-by-const";


const min = Math.min;
const max = Math.max;
const deg = degree;


/**
 * Returns the GCD of two polynomials using the fast modular method.
 * 
 * For given non-zero polynomials a,b ∈ ℤ[x], their greatest common 
 * divisor g = gcd(a,b) is computed.
 * 
 * * use this method above others (e.g. PRS)
 */
function gcdMod(F1: number[], F2: number[]): number[] {
    F1 = getPrimitivePart(scaleFloatsToInts(F1));
    F2 = getPrimitivePart(scaleFloatsToInts(F2));

    return _gcdMod(F1,F2);
}


/**
 * * **TODO - FINISH IMPLEMENTATION!**
 * 
 * Returns the GCD of two primitive polynomials using the fast modular method.
 * 
 * For given non-zero primitive polynomials a,b ∈ ℤ[x]*, their greatest common 
 * divisor g = gcd(a, b) is computed.
 * 
 * * **precondition** the polynomials must be primitive (with integer coefficients)
 * * See, e.g. algorithm GCD_MOD from Computer Algebra, F.Winkler, WS 2010/11, 
 * chapter 3.
 * * This is the original algorithm of Brown, 
 * see http://www.cecm.sfu.ca/personal/monaganm/teaching/TopicsinCA19/Brown1971.pdf
 * * See also, e.g. http://www.csd.uwo.ca/~moreno//CS424/Lectures/ResultantGcd.html/node6.html 
 */
//function _gcdMod(F̛1: number[], F̛2: number[]): number[] {
function _gcdMod(F̛1: number[], F̛2: number[]): never {
    throw new Error('Not implemented yet!')
    //let d = gcdInt(a[0], b[0]);
    // In the line below, any other bound for the size of the coefficients can 
    // be used.
    //let M = 2*d*landauMignotteBound(a,b);

    /** some primes - TODO: we should choose better primes */
    let ps = [3,5,7,11,13,17,19,23];

    //---- (1) ---------------------------------------------------------------//
    // Set c₁ = cont(F₁'), c₂ = cont(F₂'), c = gcd(c₁, c₂)
    //------------------------------------------------------------------------//
    let c1 = getContent(F̛1);
    let c2 = getContent(F̛2);
    let c = gcdInt(c1,c2);

    //---- (2) ---------------------------------------------------------------//
    // Set F₁ = F₁'/c₁, F₂ = F₂'/c₂.
    //------------------------------------------------------------------------//
    let F1 = divideByConst(F̛1, c);
    let F2 = divideByConst(F̛2, c);

    //---- (3) ---------------------------------------------------------------//
    // Set f₁ = lc(F₁), f₁ = lc(F₂), ̅g = gcd(f₁, f₂).
    //------------------------------------------------------------------------//
    let f1 = F1[0];
    let f2 = F2[0];
    let g̅ = gcdInt(f1,f2);

    //---- (4) ---------------------------------------------------------------//
    // Set n = 0, e = min(∂(F₁), ∂(F₂)). 
    //------------------------------------------------------------------------//
    // In the above, note that e is a vector but for univariate polynomials it
    // is one-dimensional and can be viewed as a scalar.
    //------------------------------------------------------------------------//
    let n = 0;
    let e = min(deg(F1), deg(F2));

    //---- (5) ---------------------------------------------------------------//
    // Set ̿μ = 2 ̅g·max|ψ|, where ψ ranges over the coefficients of F₁ and F₂
    //------------------------------------------------------------------------//
    let _μ_ = 2*g̅*max(pInfNorm(F1), pInfNorm(F2));
    // From text: "Usually, it will be true that _μ_ > μ, but exceptions are 
    // possible as discussed in Section 5.2."

    let i = 0;
    //while (true) {
        //---- (6) ---------------------------------------------------------------//
        // Let p be a new odd prime not dividing f₁ or f₂.
        //------------------------------------------------------------------------//
        let p = ps[i];

        //---- (7) ---------------------------------------------------------------//
        // Set ̃g = ̅g mod p, F̃₁ = ̃gF₁ mod p, F̃₂ = ̃gF₂ mod p
        //------------------------------------------------------------------------//
        let g̃ = g̅ % p;
        let F̃1 = multiplyByConst(g̃, F1);
        let F̃2 = multiplyByConst(g̃, F2);
        

        //---- (8) ---------------------------------------------------------------//
        // 
        //------------------------------------------------------------------------//

        //---- (9) ---------------------------------------------------------------//
        // 
        //------------------------------------------------------------------------//

        //---- (10) ----//
        // 
        //------------------------------------------------------------------------//

    //---- (11) ----//
    // 
    //------------------------------------------------------------------------//

    //---- (12) ----//
    // 
    //------------------------------------------------------------------------//

    //---- (13) ----//
    // 
    //------------------------------------------------------------------------//

    //---- (14) ----//
    // 
    //------------------------------------------------------------------------//

    //---- (15) ----//
    // 
    //------------------------------------------------------------------------//



    //return [1];
}


export { gcdMod }
