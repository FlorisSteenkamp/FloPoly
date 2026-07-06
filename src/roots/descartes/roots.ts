import type { RootInterval } from "../root-interval.js";
import { reduceInterval } from "../reduce-interval.js";
import { removeLeadingZeroCoeffs } from "../remove-leading-zero-coeffs.js";
import { isolateRoots } from "./isolate-roots.js";
import { γγ3 } from '../../error-analysis/gamma.js';


/**
 * Finds and returns all ordered *certified* root intervals (bar underflow / 
 * overflow) of the given polynomial (with coefficients given in double or
 * double-double precision, including their multiplicities (see points below).
 * 
 * * The input polynomial can be given in double precision by wrapping each
 *   coefficient in an array, i.e. `polynomial.map(c => [0,c])` with the 'low double'
 *   set to zero.
 * 
 * * returns `undefined` for the zero polynomial
 * 
 * * Let `W = 2 * m * Number.EPSILON * max(1, 2^⌈log₂r⌉)`, where `r` is a root
 *   and `m` is the number of roots (the 'multiplicity') within the 
 *   interval, where multiplicity here includes roots seperated by less than 
 *   `W` and not necessarily only exact multiple roots
 * 
 * * The returned intervals are of max width `W`; use [[refineK1]] to 
 *   reduce the root interval widths further and thus 'resolving' the roots if 
 *   required (although the roots are already *guaranteed* extremely accurate!).
 * 
 * * The retuned root intervals will contain *all* roots.
 * 
 * * The 'multiplicity' can be higher than the actual multiplicity of a root by
 *   an integer multiple of 2 iff there are multiple roots in the interval
 *   (else if a multiplicity of 0 or 1 is reported the result is exact).
 *   [[refineK1]] can be used to resolve them further if required; note however 
 *   that root seperation is a function of polynomial height and can be very small 
 *   (see e.g. [Improving Root Separation Bounds, *Aaron Herman, Hoon Hong, Elias Tsigaridas*](https://hal.inria.fr/hal-01456686/document)
 * 
 * * optimized for polynomials of degree 1 to about 30 (else over/underflow becomes an issue)
 * 
 * * **precondition:** the coefficient magnitudes and degree of the polynomial
 *   must be such that overflow/underflow won't occur at evaluation points where roots
 *   are searched for, e.g. a 20th degree polynomial with coefficients of 
 *   magnitude around `Number.MAX_SAFE_INTEGER (= 9007199254740991)` evaluated at
 *   `x = 1000000` will evaluate to about `10^136` (10 the the power of 136) which 
 *   is way too small for overflow to occur, however when evaluated at `x = 10^15`
 *   overflow will occur; to prevent this possibility limit the bounds `lb` and `ub` 
 *   where roots are to be searched for to the range of interest, i.e. don't set
 *   them to `Infinity` for automatic calculation.
 * 
 * @param pDd a polynomial with coefficients given densely as an array of 
 * double-double precision floating point numbers (if only double precision
 * coefficients are required then wrap each coefficient in an array, i.e.
 * `p.map(c => [0,c])` with the 'low double' set to zero);
 * 
 * the coefficients are given from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`;
 * 
 * @param lb defaults to `-Infinity`; limiting the bound increases performance
 * @param ub defaults to `+Infinity`; limiting the bound increases performance
 * `Infinity` may be given if there is no upper bound
 * 
 * @param pDd_ defaults to `undefined`; if `undefined` then the input polynomial
 * will be assumed exact; an error polynomial that provides a 
 * coefficientwise error bound on the input polynomial with the actual error bound
 * being `Eᵢ * γγ(3)` for the coefficient of `xⁱ`;
 * Note: `γγ(3)` is almost identical to `3*(Number.EPSILON / 2)**2`;
 * all coefficients must be positive; 
 * 
 * @param getPExact defaults to `undefined`; a function returning the exact 
 * polynomial (with coefficients given as Shewchuk expansions (see the example 
 * below)) - `getPExact` will *only* be called if required (and can thus be 
 * lazy loaded) when the error bounds are too high during calculation
 * preventing certification of the root intervals; if `undefined` then the 
 * input polynomial will be assumed exact
 * 
 * @param tryReduceInterval defaults to `false`; if `true` (or if `lb` or `ub`
 * is `Infinity` or `undefined`) then the interval `[lb,ub]` will be reduced to
 * a smaller interval containing all roots (if possible) before starting the algorithm.
 * Since `reduceInterval` is a relatively long running algorithm it is generally
 * faster to set this to `false` and directly specify the interval of interest.
 * 
 * 
 * @example
 * ```typescript
 * 
 * // -------------------------------------------------------------
 * // 1. a basic example of an order 11 polynomial (with 10 roots)
 * // -------------------------------------------------------------
 * const p = [
 *     3.033321234234234,
 *     31.78342995971597,
 *     -115.09145437671532,
 *     -48.18962838294827,
 *     241.04136127393173,
 *     -26.63962334942254,
 *     -81.82713958224285,
 *     13.96128683321424,
 *     7.3963444329341455,
 *     -1.50733058206533,
 *     -0.0015147128834111722
 * ];
 * //console.log(toCasStr(p))
 * // => 3.033321234234234*x^10 + 31.78342995971597*x^9 - 115.09145437671532*x^8 - 
 * //    48.18962838294827*x^7 + 241.04136127393173*x^6 - 26.63962334942254*x^5 - 
 * //    81.82713958224285*x^4 + 13.96128683321424*x^3 + 7.3963444329341455*x^2 - 
 * //    1.50733058206533*x - 0.0015147128834111722
 * // function to convert a double precision number to double-double precision
 * // (note that the 'low double' is zero since the coefficients are assumed exact)
 * const toDoubleDouble = (c: number) => [0,c];
 * const rs = roots(
 *     p.map(toDoubleDouble), 
 *     -Infinity, 
 *     Infinity
 * );
 * //console.log(rs);
 * // => [
 * //   { tS: -13.222221, tE: -13.222220999999996, multiplicity: 1 },
 * //   { tS: -1.3498348570000003, tE: -1.3498348569999998, multiplicity: 1 },
 * //   { tS: -0.4444777699999987, tE: -0.4444777699999985, multiplicity: 1 },
 * //   { tS: -0.43554300000000135, tE: -0.4355430000000011, multiplicity: 1 },
 * //   { tS: -0.001000000000000222, tE: -0.001, multiplicity: 1 },
 * //   { tS: 0.22999999999999984, tE: 0.23000000000000007, multiplicity: 1 },
 * //   { tS: 0.345347, tE: 0.34534700000000024, multiplicity: 1 },
 * //   { tS: 0.5429999999999989, tE: 0.5429999999999993, multiplicity: 1 },
 * //   { tS: 1.3221000000000016, tE: 1.322100000000002, multiplicity: 1 },
 * //   { tS: 2.534533999999997, tE: 2.534533999999998, multiplicity: 1 }
 * // ]
 * //
 *
 * 
 * // -----------------------------------------------------------------------
 * // 2. the Wilkinson polynomial of degree 50 (a hard(ish) case) --
 * // see: https://en.wikipedia.org/wiki/Wilkinson%27s_polynomial
 * // -----------------------------------------------------------------------
 * const _roots = [...Array(50+1).keys()].slice(1).map(c => [c]);  // => [1,2,3,...,50]
 * const { pDd, pDd_, pE } = eFromRoots(_roots);
 * const getPExact = () => pE;
 * // => polynomial of degree 50 with double-double precision coefficients 
 * //    including coefficient-wise error bound polynomial and a function to
 * //    return the exact polynomial with Shewchuk expansion coefficients
 * //console.log(toCasStr(getPExact()));
 * // => x^50 - 1275*x^49 + 791350*x^48 - 318622500*x^47 + 93570498490*x^46 - 
 * //    21366198225750*x^45 + 3949131291964600*x^44 - ...
 * const rs = roots(pDd,0,51,pDd_,getPExact);
 * console.log(rs);  // => [
 * //    { tS: 1, tE: 1, multiplicity: 1 },
 * //    { tS: 2, tE: 2, multiplicity: 1 },
 * //    .
 * //    .
 * //    .
 * //    { tS: 50, tE: 50, multiplicity: 1 }
 * // ]
 * //
 * // ...thus roots are returned accurately.
 * ```
 * 
 * @doc
 */
function roots(
        pDd: number[][] | number[],
        lb = -Infinity,
        ub = +Infinity,
        pDd_?: number[] | undefined,
        getPExact?: (() => number[][]) | undefined,
        tryReduceInterval = false): RootInterval[] | undefined {

    // if (pDd === undefined) { pDd = p.map(c => [0,c]); }
    if (typeof pDd[0] === 'number') {
        pDd = pDd.map(c => [0, c as number]);
    }

    // We cache `pExact`
    let pExact: number[][] | undefined = undefined;
    const getPExact_ = () => {
        // If `getPExact` is not specified then assume the given double-double 
        // precision coefficient polynomial is exact.
        if (getPExact === undefined) { return pDd as number[][]; }
        // If `getPExact` is specified then use it and cache the result.
        if (pExact === undefined) { pExact = getPExact(); }
        return pExact;
    };

    // if `pDd_` is not specified then assume there is no error
    pDd_ = pDd_ || new Array(pDd.length).fill(0);  // no error

    //----------------------------------------------------------------------
    // Remove leading zero coefficients 
    //----------------------------------------------------------------------
    ({ pDd, pDd_, pExact } = removeLeadingZeroCoeffs(pDd as number[][], pDd_, getPExact_, γγ3));

    if (pDd.length === 0) {
        return undefined;  // return `undefined` for the zero polynomial (of degree -1)
    } else if (pDd.length === 1) {
        return [];  // return `[]` for a (a non-zero) degree 0 polynomial
    }

    const p = pDd.map(c => c[0] + c[1]);
    if (tryReduceInterval || lb === -Infinity || ub === Infinity) {
        [lb,ub] = reduceInterval(lb, ub, p);
        if (lb === ub) {  // edge case
            return [{ t: lb, tS: lb, tE: ub, multiplicity: p.length - 1 }];
        }
    }

    return isolateRoots(p, pDd, pDd_, lb, ub, getPExact_);
}


export { roots }


// Quokka tests (keep)
// import { toCasStr } from "../../basic/to-cas-str.js";
// import { eFromRoots } from "../from-roots/expansion/e-from-roots.js";

// // -------------------------------------------------------------
// // 1. a basic example of an order 11 polynomial (with 10 roots)
// // -------------------------------------------------------------
// {
//     const p = [
//         3.033321234234234,
//         31.78342995971597,
//         -115.09145437671532,
//         -48.18962838294827,
//         241.04136127393173,
//         -26.63962334942254,
//         -81.82713958224285,
//         13.96128683321424,
//         7.3963444329341455,
//         -1.50733058206533,
//         -0.0015147128834111722
//     ];
//     // console.log(toCasStr(p));
//     const toDd = (c: number) => [0,c];
//     const rs = roots(p.map(toDd), -Infinity, Infinity);
//     console.log(rs);  //?
//     // => [
//     //   { tS: -13.222221, tE: -13.222220999999996, multiplicity: 1 },
//     //   { tS: -1.3498348570000003, tE: -1.3498348569999998, multiplicity: 1 },
//     //   { tS: -0.4444777699999987, tE: -0.4444777699999985, multiplicity: 1 },
//     //   { tS: -0.43554300000000135, tE: -0.4355430000000011, multiplicity: 1 },
//     //   { tS: -0.001000000000000222, tE: -0.001, multiplicity: 1 },
//     //   { tS: 0.22999999999999984, tE: 0.23000000000000007, multiplicity: 1 },
//     //   { tS: 0.345347, tE: 0.34534700000000024, multiplicity: 1 },
//     //   { tS: 0.5429999999999989, tE: 0.5429999999999993, multiplicity: 1 },
//     //   { tS: 1.3221000000000016, tE: 1.322100000000002, multiplicity: 1 },
//     //   { tS: 2.534533999999997, tE: 2.534533999999998, multiplicity: 1 }
//     // ]
//     //
// }


// // -----------------------------------------------------------------------
// // 2. the Wilkinson polynomial of degree 50 (a hard(ish) case) --
// // see: https://en.wikipedia.org/wiki/Wilkinson%27s_polynomial
// // -----------------------------------------------------------------------
// {
//     const _roots = [...Array(85+1).keys()].slice(1).map(c => [c]);
//     const { pDd, pDd_, pE } = eFromRoots(_roots);
//     const getPExact = () => pE;
//     const rs = roots(pDd,0,71,pDd_,getPExact)!;
//     console.log(rs.slice(rs?.length - 3, rs?.length));//?
//     // => [
//     //    { tS: 1, tE: 1, multiplicity: 1 },
//     //    { tS: 2, tE: 2, multiplicity: 1 },
//     //    .
//     //    .
//     //    .
//     //    { tS: 70, tE: 70, multiplicity: 1 }
//     // ]
// }