import { removeLeadingZeros } from "./remove-leading-zeros.js";

const { max } = Math;


/**
 * Returns the result of multiplying 2 polynomials in double precision.
 * 
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 * 
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial.
 * 
 * @example
 * ```typescript
 * multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 * ```
 * 
 * @doc
 */
function multiply(p1: number[], p2: number[]): number[] {
    const d1 = p1.length-1;
    const d2 = p2.length-1;

    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) { 
        return [];
    }

    const d = d1+d2;
    const r = new Array(d+1).fill(0);
    for (let i=0; i<d1+1; i++) {
        for (let j=0; j<d2+1; j++) {
            r[d-(i+j)] += (p1[d1-i] * p2[d2-j]);
        }
    }

    return removeLeadingZeros(r);
}


/**
 * Returns the result of multiplying 2 polynomials in double precision using
 * the [Karatsuba](https://en.wikipedia.org/wiki/Karatsuba_algorithm)
 * divide-and-conquer algorithm (`O(n^log2(3)) ≈ O(n^1.585)`).
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial.
 *
 * @example
 * ```typescript
 * multiplyKaratsuba([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 * ```
 *
 * @doc
 */
function multiplyKaratsuba(
        p1: number[],
        p2: number[]): number[] {

    const d1 = p1.length - 1;
    const d2 = p2.length - 1;

    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }

    return removeLeadingZeros(karatsuba(p1, p2));
}


/**
 * Karatsuba multiplication of two polynomials given (as everywhere in this
 * module) densely from highest to lowest power. The lowest powers sit at the
 * end of each array, so the polynomials are split by taking the trailing
 * coefficients as the low half, and all coefficient-wise additions are aligned
 * at the right (low-order) end.
 */
function karatsuba(a: number[], b: number[]): number[] {
    const la = a.length;
    const lb = b.length;
    if (la === 0 || lb === 0) { return []; }

    const n = max(la, lb);

    // base case: schoolbook multiplication for small inputs
    if (n <= 9) {
        const r = new Array(la + lb - 1).fill(0);
        for (let i = 0; i < la; i++) {
            for (let j = 0; j < lb; j++) {
                r[i + j] += a[i] * b[j];
            }
        }
        return r;
    }

    const m = n >> 1;

    // the low half holds the lowest `m` powers, which live at the end
    const aSplit = max(0, la - m);
    const bSplit = max(0, lb - m);
    const aHigh = a.slice(0, aSplit);
    const aLow  = a.slice(aSplit);
    const bHigh = b.slice(0, bSplit);
    const bLow  = b.slice(bSplit);

    // z0 = aLow * bLow,  z2 = aHigh * bHigh
    const z0 = karatsuba(aLow, bLow);
    const z2 = karatsuba(aHigh, bHigh);
    // z1 = (aLow + aHigh)(bLow + bHigh) - z0 - z2
    const z1 = subArr(subArr(karatsuba(addArr(aLow, aHigh), addArr(bLow, bHigh)), z0), z2);

    // result = z2 * x^(2m) + z1 * x^m + z0
    const result = new Array(la + lb - 1).fill(0);
    addInto(result, z0, 0);
    addInto(result, z1, m);
    addInto(result, z2, 2 * m);

    return result;
}


/** adds two highest-to-lowest coefficient arrays (aligned at the low end) */
function addArr(a: number[], b: number[]): number[] {
    const l = max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for (let i = 0; i < a.length; i++) { r[oa + i] += a[i]; }
    for (let i = 0; i < b.length; i++) { r[ob + i] += b[i]; }
    return r;
}


/** subtracts `b` from `a` (highest-to-lowest, aligned at the low end) */
function subArr(a: number[], b: number[]): number[] {
    const l = max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for (let i = 0; i < a.length; i++) { r[oa + i] += a[i]; }
    for (let i = 0; i < b.length; i++) { r[ob + i] -= b[i]; }
    return r;
}


/** adds `src` raised by `shift` powers into the highest-to-lowest `dst` */
function addInto(dst: number[], src: number[], shift: number): void {
    const offset = dst.length - src.length - shift;
    for (let i = 0; i < src.length; i++) {
        dst[offset + i] += src[i];
    }
}


export { multiply, multiplyKaratsuba }
