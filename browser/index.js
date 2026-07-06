
;// ./node_modules/big-float-ts/node/double-expansion/e-estimate.js
/**
 * Returns the result of the given floating point expansion rounded to a double
 * floating point number.
 *
 * The result is within 1 ulps of the actual value, e.g. imagine the worst case
 * situation where we add (in 4dot4) 1111.1000 + 0.000011111111... The result
 * will be 1111.1000 whereas as the correct result should be 1111.1001 and we
 * thus lost 1 ulp of accuracy. It does not matter that the expansion contain
 * several floats since none is overlapping.
 *
 * See Shewchuk https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * @param e a floating point expansion
 */
function eEstimate(e) {
    let Q = e[0];
    for (let i = 1; i < e.length; i++) {
        Q += e[i];
    }
    return Q;
}

//# sourceMappingURL=e-estimate.js.map
;// ./src/basic/to-cas-str.ts

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
 * * **note:** if the polynomial coefficients are given as Shewchuk expansions
 * then the coefficients are first down-converted to double precision
 *
 * @param p a polynomial (with coefficients given densely as an array of Shewchuk
 * floating point expansions **or** double precision floating point numbers **or**
 * bigints) from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([[5],[4],[3],[2],[1]]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([5n,4n,3n,2n,1n]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
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
            ? eEstimate(_v)
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
 * from https://stackoverflow.com/a/46545519/2010061
 *
 * @internal
 */
function nonNegativeNumberToString(num) {
    let numStr = num.toString();
    if (isBigint(num)) {
        return numStr;
    }
    if (abs(num) < 1) {
        const e = parseInt(numStr.split('e-')[1]);
        if (e) {
            num *= 10 ** (e - 1);
            numStr = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
        }
    }
    else {
        let e = parseInt(numStr.split('+')[1]);
        if (e > 20) {
            e -= 20;
            num /= 10 ** e;
            numStr = num.toString() + (new Array(e + 1)).join('0');
        }
    }
    return numStr;
}


;// ./src/basic/bigint/b-abs-coeff.ts
/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bAbsCoeff(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        const v = p[i];
        p_[i] = v < 0n ? -v : v;
    }
    return p_;
}


;// ./src/basic/bigint/b-remove-leading-zeros.ts
/**
 * If the highest power coefficient of the given polynomial is `0` then
 * `bRemoveLeadingZeros` can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 * @param p a polynomial whose leading zeros should be removed
 *
 * @doc
 */
function bRemoveLeadingZeros(p) {
    let lzCount = 0;
    for (let i = 0; i <= p.length - 1; i++) {
        if (p[i] !== 0n) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}


;// ./src/basic/bigint/b-add.ts

const { max } = Math;
/**
 * Returns the result of adding two polynomials with bigint coefficients.
 *
 * @param p1 a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * bAdd([1n,2n,3n],[3n,4n]); //=> [1n,5n,7n]
 * ```
 *
 * @doc
 */
function bAdd(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || 0n;
        const c2 = p2[i + Δd2] || 0n;
        result[i] = c1 + c2;
    }
    // Ensure the result is a valid polynomial representation
    return bRemoveLeadingZeros(result);
}


;// ./src/basic/bigint/b-degree.ts
/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bDegree([9n,8n,7n,6n,5n,4n,3n,2n,1n]); //=> 8
 * ```
 *
 * @doc
 */
function bDegree(p) {
    return p.length - 1;
}


;// ./src/basic/bigint/b-divide-by-const.ts
/**
 * Divides (using **integer division**) a polynomial by a constant.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */
function bDivideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = p[i] / c;
    }
    return r;
}


;// ./src/basic/bigint/b-multiply-by-const.ts
/**
 * Returns the result of multiplies a polynomial (with bigint coefficients) by
 * a constant.
 *
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bMultiplyByConst(c, p) {
    if (c === 0n) {
        return [];
    }
    const d = p.length;
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = c * p[i];
    }
    return r;
}


;// ./src/euclidean-division-related/bigint/b-elevate-degree.ts
/**
 * Returns the result of elevating the given polynomial by the given degree.
 *
 * @param p
 * @param deg
 *
 * @internal
 */
function bElevateDegree(p, deg) {
    const p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push(0n);
    }
    return p_;
}


;// ./src/basic/bigint/b-multiply.ts
/**
 * Returns the result of multiplying 2 polynomials with bigint coefficients.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial.
 *
 * @example
 * ```typescript
 * bMultiply([1n,2n,3n], [2n,5n,3n,5n]); //=> [2n, 9n, 19n, 26n, 19n, 15n]
 * ```
 *
 * @doc
 */
function bMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    const r = new Array(d + 1).fill(0n);
    for (let i = 0; i < da + 1; i++) {
        for (let j = 0; j < db + 1; j++) {
            r[d - (i + j)] += (a[da - i] * b[db - j]);
        }
    }
    return r;
}


;// ./src/basic/bigint/b-subtract.ts

const { max: b_subtract_max } = Math;
/**
 * Returns the result of subtracting the second polynomial from the first with
 * coefficients given as bigints; (p1 - p2).
 *
 * @param a minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param b subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * bSubtract([2n,3n],[4n,4n]); //=> [-2n, -1n]
 * ```
 *
 * @doc
 */
function bSubtract(a, b) {
    // Initialize result array  
    const da = a.length - 1;
    const db = b.length - 1;
    const Δd = da - db;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const d = b_subtract_max(da, db);
    // Add coefficients
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = a[i + Δd1] || 0n;
        const c2 = b[i + Δd2] || 0n;
        result[i] = c1 - c2;
    }
    // Ensure the result is a valid polynomial representation
    return bRemoveLeadingZeros(result);
}


;// ./src/euclidean-division-related/bigint/b-pdiv-internal.ts





/**
 * * **Used internally**
 *
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (`a`, `b`
 * both being polynomials) naively, i.e. in such a way that all intermediate
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the
 * remainder.
 *
 * * **precondition:** `b !== []`, i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial `b` in the formula `a = bq + r`
 *
 * @internal
 */
function bPdivInternal(a, b) {
    let q = [];
    const d = bDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = bDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        const s = bElevateDegree([r[0] / c], deg);
        q = bAdd(q, s);
        r = bSubtract(r, bMultiply(s, b));
    }
}


;// ./src/euclidean-division-related/bigint/b-pdiv-trivial.ts



const b_pdiv_trivial_abs = (n) => n >= 0 ? n : -n;
/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder`
 * of the pseudo division of `a/b` (`a`, `b` both being polynomials) in such a way
 * that all intermediate calculations and the final result are done in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, `a/b`,
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 *
 * * **precondition:** `b !== [0]`, i.e. unequal to the zero polynomial.
 *
 * * see [trivial pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 * * see also [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial `b` in the formula `a = bq + r`
 * @param positiveMultiplier defaults to false - if set to true then the
 * multiplier (of the coefficients of the dividend)
 * `leadingCoeff(b)^(deg(a)-deg(b)+1)` will be
 * modified to `abs(leadingCoeff(b)^(deg(a)-deg(b)+1))`
 *
 * @doc
 */
function bPdivTrivial(a, b, positiveMultiplier = false) {
    const d = bDegree(a) - bDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a };
    }
    let m = b[0] ** BigInt(d);
    m = positiveMultiplier ? b_pdiv_trivial_abs(m) : m;
    const a_ = bMultiplyByConst(m, a);
    return bPdivInternal(a_, b);
}


;// ./src/basic/bigint/b-divides.ts

/**
 * Returns `true` if the polynomial `b` divides the polynomial `a`, i.e. if
 * there exists a polynomial `r` such that `a = b*r`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function bDivides(b, a) {
    if (b.length === 0) {
        return a.length === 0;
    }
    if (a.length === 0) {
        return false;
    }
    const { q, r } = bPdivTrivial(a, b);
    if (r.length !== 0) {
        return false;
    }
    const d = a.length - b.length + 1;
    const multiplier = b[0] ** BigInt(d);
    for (const c of q) {
        if (c % multiplier !== 0n) {
            return false;
        }
    }
    return true;
}

// Quokka tests
// import { bMultiply } from "./b-multiply.js";
// const a = bMultiply([1n,1n],[1n,-1n]);//?
// const { r } = bPdivTrivial([1n, 0n, -1n], [6n, -6n]);//?
// bDivides([4n, 0n, -4n], [2n,2n]);//?

;// ./src/basic/bigint/b-equal.ts
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients,
 * false otherwise.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @example
 * ```typescript
 * bEqual([1n,2n,3n,4n], [1n,2n,3n,4n]);   //=> true
 * bEqual([1n,2n,3n,4n], [1n,2n,3n,4n,5n]); //=> false
 * ```
 *
 * @doc
 */
function bEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/bigint/b-invert.ts
/**
 * @deprecated Use `Array.toReversed()` in modern JavaScript instead.
 *
 * Inverts the given polynomial by reversing the order of the coefficients,
 * i.e. p(x) -> x^deg(p) * p(1/x)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bInvert([3n,2n,-5n]);  // => [-5n,2n,3n]
 * ```
 *
 * @doc
 */
function bInvert(p) {
    return p.toReversed();
}


;// ./src/gcd/bigint/b-integer-gcd.ts
/**
 * Computes and returns the greatest common divisor of two integers `a` and `b`,
 * using the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).
 *
 * @doc
 */
function bGcdInt(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (a === 0n) {
        return b;
    }
    if (b === 0n) {
        return a;
    }
    while (b !== 0n) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @doc
 */
function bGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i];
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = bGcdInt(a, vals_[i]);
    }
    return a;
}
/**
 * * ❗ don't use - too slow - use [[bGcdInts]] instead ❗
 *
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 *
 * * It turns out this method is *slower* than the naive method
 */ /*
function bGcdIntsTree(vals: bigint[]): bigint {
   const vals_ = vals.slice();

   // make array of numbers all positive
   for (const i=0; i<vals_.length; i++) {
       vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i];
   }
   
   // Divide and conquer
   while (vals_.length > 1) {
       const newVals = [];
       const len = vals_.length;
       for (const i=0; i<len-1; i += 2) {
           newVals.push(bGcdInt(vals_[i], vals_[i+1]));
       }
       if (len % 2 !== 0) {
           newVals.push(vals_[len-1]);
       }

       vals_ = newVals;
   }
   
   return vals_[0];
}
*/


;// ./src/basic/bigint/b-is-rational-multiple-of.ts

/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function bIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    const a_ = a[0] < 0n ? a.map(c => -c) : a;
    const b_ = b[0] < 0n ? b.map(c => -c) : b;
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = bGcdInt(lcA, lcB);
    const A = lcA / gcd; // this division is exact
    const B = lcB / gcd; // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = A * b_[i];
        if (Ab % B !== 0n) {
            return false;
        }
        if (Ab / B !== a_[i]) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/bigint/b-negate.ts
/**
 * Returns the negative of the given polynomial (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bNegate([1n, -2n]); //=> [-1n, 2n]
 * ```
 *
 * @doc
 */
function bNegate(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = -p[i];
    }
    return p_;
}


;// ./src/basic/double/abs-coeff.ts
const { abs: abs_coeff_abs } = Math;
/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function absCoeff(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = abs_coeff_abs(p[i]);
    }
    return p_;
}


;// ./src/basic/double/remove-leading-zeros.ts
/**
 * If the highest power coefficient of the given polynomial is 0 then
 * `removeLeadingZeros` can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 *
 * @param p a polynomial whose leading zeros should be removed
 *
 * @example
 * ```typescript
 * removeLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * removeLeadingZeros([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 * ```
 *
 * @doc
 */
function removeLeadingZeros(p) {
    let lzCount = 0;
    for (let i = 0; i <= p.length - 1; i++) {
        if (p[i] !== 0) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}


;// ./src/basic/double/add.ts

const { min, max: add_max } = Math;
/**
 * Returns the result of adding two polynomials in double precision.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * add([1,2,3],[3,4]); //=> [1,5,7]
 * ```
 *
 * @doc
 */
function add(p1, p2) {
    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = add_max(d1, d2);
    // Add coefficients
    const r = new Array(d + 1);
    const minD = min(d1, d2);
    // Add where both polynomials overlap
    for (let i = 0; i <= minD; i++) {
        r[d - i] = p1[d1 - i] + p2[d2 - i];
    }
    // Copy remaining coefficients from longer polynomial
    for (let i = minD + 1; i <= d1; i++) {
        r[d - i] = p1[d1 - i];
    }
    for (let i = minD + 1; i <= d2; i++) {
        r[d - i] = p2[d2 - i];
    }
    // Ensure the result is a valid polynomial representation
    return removeLeadingZeros(r);
}


;// ./src/basic/double/degree.ts
/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * degree([9,8,7,6,5,4,3,2,1]); //=> 8
 * ```
 *
 * @doc
 */
function degree(p) {
    return p.length - 1;
}


;// ./src/basic/double/divide-by-const.ts
/**
 * Divides a polynomial by a constant in double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */
function divideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = p[i] / c;
    }
    return r;
}


;// ./src/basic/double/equal.ts
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients,
 * false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * @example
 * ```typescript
 * equal([1,2,3,4], [1,2,3,4]);   //=> true
 * equal([1,2,3,4], [1,2,3,4,5]); //=> false
 * ```
 *
 * @doc
 */
function equal(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (p1[i] !== p2[i]) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/double/invert.ts
/**
 * @deprecated Use `Array.toReversed()` in modern JavaScript instead.
 *
 * Inverts the given polynomial by reversing the order of the coefficients,
 * i.e. p(x) -> x^deg(p) * p(1/x)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * invert([3,2,-5]);  // => [-5,2,3]
 * ```
 *
 * @doc
 */
function invert(p) {
    return p.toReversed();
}


;// ./node_modules/big-float-ts/node/double-representation/double-to-octets.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 */
function doubleToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
}

//# sourceMappingURL=double-to-octets.js.map
;// ./node_modules/big-float-ts/node/double-representation/parse-double.js
/* unused harmony import specifier */ var doubleToBinaryString;
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 ha been subtracted) and the
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */
function parseDouble(x) {
    const parts = doubleToOctets(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 0b0111_1111) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 0b0000_1111) + hiddenMsb;
    return {
        sign,
        exponent,
        significand
    };
}
/**
 * Returns the relevant parts of the given IEEE-754 double.
 * See https://github.com/bartaz/ieee754-visualization.
 * This is a slower version of parseDouble that gives binary string
 * representations of the components.
 */
function parseDoubleDetailed(x) {
    const str = doubleToBinaryString(x);
    // sign{1} exponent{11} fraction{52} === 64 bits (+1 hidden!)
    const [, sign, exponent, significand] = str.match(/^(.)(.{11})(.{52})$/);
    const exponent_ = parseInt(exponent, 2);
    const hidden = exponent_ === 0 ? "0" : "1";
    return {
        full: sign + exponent + hidden + significand,
        sign,
        exponent,
        hidden,
        significand
    };
}

//# sourceMappingURL=parse-double.js.map
;// ./node_modules/big-float-ts/node/double-representation/exponent.js

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return parseDouble(a).exponent;
}

//# sourceMappingURL=exponent.js.map
;// ./node_modules/big-float-ts/node/double-representation/significand.js

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */
function significand(a) {
    return parseDouble(a).significand;
}

//# sourceMappingURL=significand.js.map
;// ./node_modules/big-float-ts/node/double-representation/get-max-set-bit.js

/**
 * Returns the lowest set bit of the given value in [1, (2**31)-1],
 * i.e. from 1 up to 2147483647 else if no bit is set (input === 0) returns
 * NaN, otherwise if the number is out of range returns a non-finite
 * number.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit_(a) {
    return Math.log2(a & -a);
}
/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // Note: the significand includes the hidden bit!
    const s = significand(a);
    const len = s.length;
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === 0) {
            continue;
        }
        const l = getLowestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}
/**
 * Returns the highest set bit of the given value in [1, 255], i.e. from 1 up
 * to 255. If the input number === 0 returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit_(a) {
    return a >= 128 ? 7
        : a >= 64 ? 6
            : a >= 32 ? 5
                : a >= 16 ? 4
                    : a >= 8 ? 3
                        : a >= 4 ? 2
                            : a >= 2 ? 1
                                : a >= 1 ? 0
                                    : NaN;
}
/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the 
    // number is not a subnormal.
    const s = significand(a);
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const l = getHighestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}

//# sourceMappingURL=get-max-set-bit.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-compress.js
/**
 * Returns the result of compressing the given floating point expansion.
 *
 * * primarily for internal library use
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 23 (Shewchuck): Let e = sum_(i=1)^m(e_i) be a nonoverlapping
 * expansion of m p-bit components, where m >= 3. Suppose that the components of
 * e are sorted in order of increasing magnitude, except that any of the e_i may
 * be zero. Then the following algorithm will produce a nonoverlapping expansion
 * (nonadjacent if round-to even tiebreaking is used) such that
 * h = sum_(i=1)^n(h_i) = e, where the components h_i are in order of increasing
 * magnitude. If h != 0, none of the h_i will be zero. Furthermore, the largest
 * component h_n approximates h with an error smaller than ulp(h_n).
 */
function eCompress(e) {
    //return e;
    const e_ = e.slice();
    const m = e_.length;
    if (m === 1) {
        return e_;
    }
    let Q = e_[m - 1];
    let bottom = m;
    for (let i = m - 2; i >= 0; --i) {
        const a = Q;
        const b = e_[i];
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[--bottom] = Q;
            Q = q;
        }
    }
    let top = 0;
    for (let i = bottom; i < m; ++i) {
        const a = e_[i];
        const b = Q;
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[top++] = q;
        }
    }
    e_[top++] = Q;
    e_.length = top;
    return e_;
}

//# sourceMappingURL=e-compress.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-sign.js
/**
 * Returns the sign of the given expansion such that a negative value means a
 * negative sign and a positive value means a positive sign, 0 meaning 0 of
 * course.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to
 * determine its sign (take the sign of the largest component) ... "
 *
 * @param e A floating point expansion with zeroes eliminated.
 */
function eSign(e) {
    return e[e.length - 1];
}

//# sourceMappingURL=e-sign.js.map
;// ./node_modules/big-float-ts/node/double-representation/bit-length.js




/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return getHighestSetBit(a) - getLowestSetBit(a) + 1;
}
/**
 * Returns the bit-length of the significand of the given floating point
 * expansion in such a way that trailing zeros are not counted.
 * * precondition: subnormals not currently supported
 * @param a A double precision floating point expansion
 */
function expBitLength(a) {
    const a_ = eCompress(a);
    if (eSign(a_) === 0) {
        return 0;
    }
    const msbyte = a_[a_.length - 1];
    const lsbyte = a_[0];
    return exponent(msbyte) - exponent(lsbyte) + (53 - getLowestSetBit(lsbyte));
}

//# sourceMappingURL=bit-length.js.map
;// ./src/scale-to-int/scale-floats-to-ints.ts


/**
 * Returns the result of scaling the given floats by the *same* power of two
 * such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials or Shewchuk expansions
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatsToInts(as) {
    let e = -1024;
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scaleFactor = -exponent(a) + bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }
    return as.map(a => a * 2 ** e);
}


;// ./src/gcd/double/integer-gcd.ts
const { abs: integer_gcd_abs } = Math;
/**
 * Computes the greatest common divisor of two integers `a` and `b`, using the
 * Euclidean Algorithm.
 *
 * **precondition** `a`, `b` must be integers
 *
 * @doc
 */
function gcdInt(a, b) {
    a = integer_gcd_abs(a);
    b = integer_gcd_abs(b);
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * binary GCD algorithm - probably slower than just using gcdInt that uses
 * the Euclidean Algorithm.
 */
function gcdIntBinary(a, b) {
    a = integer_gcd_abs(a);
    b = integer_gcd_abs(b);
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    // Reduce a and/or b to odd numbers and keep track of the greatest power of 
    // 2 dividing both a and b.
    let k = 1;
    while (a % 2 === 0 && b % 2 === 0) {
        a = a / 2; // right shift
        b = b / 2; // right shift
        k = k * 2; // left shift
    }
    // Reduce a to an odd number...
    while (a % 2 === 0) {
        a = a / 2; // right shift
    }
    // Henceforth, a is always odd...
    while (b) {
        // Remove all factors of 2 in b as they are not common
        while (b % 2 === 0) {
            b = b / 2; // right shift
        }
        // a and b are both odd. Swap values such that it is the larger of the 
        // two values, and then set b to the difference (which is even)
        if (a > b) {
            [a, b] = [b, a];
        }
        b = b - a; // b=0 iff b=a
    }
    // Restore common factors of 2...
    return k * a;
}
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @doc
 */
function gcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = integer_gcd_abs(vals_[i]);
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = gcdInt(a, vals_[i]);
    }
    return a;
}
/**
 * :::tip Heads up!
 * don't use - too slow - use [[gcdInts]] instead
 * :::
 *
 * Computes and returns the greatest common divisor of 2 or more integers by
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 *
 * * It turns out this method is *slower* than the naive method
 *
 * @param vals the integers for which the GCD is to be calculated
 *
 * @internal
 */
function gcdIntsTree(vals) {
    let vals_ = vals.slice();
    // make array of numbers all positive
    for (let i = 0; i < vals_.length; i++) {
        vals_[i] = integer_gcd_abs(vals_[i]);
    }
    // Divide and conquer
    while (vals_.length > 1) {
        const newVals = [];
        const len = vals_.length;
        for (let i = 0; i < len - 1; i += 2) {
            newVals.push(gcdInt(vals_[i], vals_[i + 1]));
        }
        if (len % 2 !== 0) {
            newVals.push(vals_[len - 1]);
        }
        vals_ = newVals;
    }
    return vals_[0];
}


;// ./node_modules/big-float-ts/node/basic/two-product.js
const f = 134217729; // 2**27 + 1;
/**
 * Returns the exact result of multiplying two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 18 (Shewchuk): Let a and b be p-bit floating-point numbers, where
 * p >= 6. Then the following algorithm will produce a nonoverlapping expansion
 * x + y such that ab = x + y, where x is an approximation to ab and y
 * represents the roundoff error in the calculation of x. Furthermore, if
 * round-to-even tiebreaking is used, x and y are non-adjacent.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param a A double
 * @param b Another double
 */
function twoProduct(a, b) {
    const x = a * b;
    //const [ah, al] = split(a);
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    //const [bh, bl] = split(b);
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const y = (al * bl) - ((x - (ah * bh)) - (al * bh) - (ah * bl));
    //const err1 = x - (ah * bh);
    //const err2 = err1 - (al * bh);
    //const err3 = err2 - (ah * bl);
    //const y = (al * bl) - err3;
    return [y, x];
}

//# sourceMappingURL=two-product.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-negative-of.js
/**
 * Returns the negative of the given floating point expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eNegativeOf(e) {
    const m = e.length;
    const h = new Array(m);
    for (let i = 0; i < m; i++) {
        h[i] = -e[i];
    }
    return h;
}

//# sourceMappingURL=e-negative-of.js.map
;// ./node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js
// import { eCompress } from "./e-compress.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
// const compress = eCompress;
/**
 * Returns the result of adding two expansions.
 *
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly
 * nonoverlapping expansions of m and n p-bit components, respectively, where
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a
 * machine whose arithmetic uses the round-to-even rule, the following algorithm
 * will produce a strongly nonoverlapping expansion h such that
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in
 * order of increasing magnitude, except that any of the h_i may be zero.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastExpansionSum(e, f) {
    //const g = merge(e,f);
    // inlined (above line)
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const g = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            g.push(e[i]);
            i++;
        }
        else {
            g.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        g.push(e[i]);
        i++;
    }
    while (j < lenF) {
        g.push(f[j]);
        j++;
    }
    if (g.length === 0) {
        return [0];
    }
    // end inlined
    const len = g.length;
    if (len === 1) {
        return g;
    }
    //const h: number[] = new Array(len);
    const h = [];
    //const q: number;
    //[h[0], q] = fastTwoSum(g[1], g[0]);
    // inlined (above line)
    const a = g[1];
    const b = g[0];
    let q = a + b;
    //h[0] = b - (q - a);
    const hh = b - (q - a);
    if (hh !== 0) {
        h.push(hh);
    }
    //let j = 0;
    j = 0;
    for (let i = 2; i < len; i++) {
        //[h[i-1], q] = twoSum(q, g[i]);
        // inlined (above line)
        const b = g[i];
        const R = q + b;
        const _ = R - q;
        //h[i-1] = (q - (R - _)) + (b - _);
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) {
            h.push(hh);
        }
        q = R;
    }
    //h[len-1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}
/**
 * Returns the result of merging an expansion e and f into a single expansion,
 * in order of nondecreasing magnitude (possibly with interspersed zeros).
 * (This function is zero-eliminating)
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e, f) {
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const merged = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        }
        else {
            merged.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        merged.push(e[i]);
        i++;
    }
    while (j < lenF) {
        merged.push(f[j]);
        j++;
    }
    if (merged.length === 0) {
        return [0];
    }
    return merged;
}

//# sourceMappingURL=fast-expansion-sum.js.map
;// ./node_modules/big-float-ts/node/double-expansion/grow-expansion.js
/* unused harmony import specifier */ var grow_expansion_eCompress;

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = (/* unused pure expression or super */ null && (grow_expansion_eCompress));
/**
 * Returns the result of adding a double to an expansion.
 *
 * Let e be a nonoverlapping expansion of m p-bit components, and let b be a
 * p-bit value where p >= 3. Suppose that the components e_1, ..., e_m are
 * sorted in order of *increasing* magnitude, except that any of the ei may be
 * zero.
 * Then the following algorithm will produce a nonoverlapping expansion such
 * that h = sum_i(h_i) = e + b, where the components h_1, ..., h_(m+1) are also
 * in order of increasing magnitude, except that any of the h_i may be zero.
 * Furthermore, if e is nonadjacent and round-to-even tiebreaking is used, then
 * h is nonadjacent.
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param e A floating point expansion
 * @param b Another floating point expansion
 */
function growExpansion(e, b) {
    const m = e.length;
    let q = b;
    //const h: number[] = new Array(m+1);
    const h = [];
    //let j = 0;
    for (let i = 0; i < m; i++) {
        // Note the use of twoSum and not fastTwoSum.
        //[h[i], q] = ts(q, e[i]);
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        const hh = (q - (x - bv)) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q = x;
    }
    //h[j] = q;
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}

//# sourceMappingURL=grow-expansion.js.map
;// ./node_modules/big-float-ts/node/basic/two-sum.js
/**
 * Returns the exact result of adding two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 7 (Knuth): Let a and b be p-bit floating-point numbers. Then the
 * following algorithm will produce a nonoverlapping expansion x + y such that
 * a + b = x + y, where x is an approximation to a + b and y is the roundoff
 * error in the calculation of x.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]

//# sourceMappingURL=two-sum.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-sum.js



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = twoSum;
const addDouble = growExpansion;
const e_sum_add = fastExpansionSum;
/**
 * Returns the result of summing an array of floating point expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of numbers to be summed; A term is represented by a
 * floating point expansion.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eSum(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        // add
        if (term.length === 1) {
            if (total.length === 1) {
                total = ts(total[0], term[0]);
            }
            else {
                total = addDouble(total, term[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(term, total[0]);
            }
            else {
                total = e_sum_add(total, term);
            }
        }
    }
    return total;
}

//# sourceMappingURL=e-sum.js.map
;// ./node_modules/big-float-ts/node/double-expansion/scale-expansion.js
/* unused harmony import specifier */ var scale_expansion_twoProduct;
/* unused harmony import specifier */ var scale_expansion_twoSum;
/* unused harmony import specifier */ var fastTwoSum;
/* unused harmony import specifier */ var scale_expansion_eCompress;




const scale_expansion_f = 134217729; // 2**27 + 1;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = (/* unused pure expression or super */ null && (scale_expansion_twoProduct));
const scale_expansion_ts = (/* unused pure expression or super */ null && (scale_expansion_twoSum));
const fts = (/* unused pure expression or super */ null && (fastTwoSum));
const scale_expansion_compress = (/* unused pure expression or super */ null && (scale_expansion_eCompress));
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion(e, b) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = scale_expansion_f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = scale_expansion_f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = scale_expansion_f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = scale_expansion_f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion2(b, e) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = scale_expansion_f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = scale_expansion_f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = scale_expansion_f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = scale_expansion_f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}

//# sourceMappingURL=scale-expansion.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-diff.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const negativeOf = eNegativeOf;
const e_diff_add = fastExpansionSum;
/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = negativeOf(f);
    return e_diff_add(e, g);
}

//# sourceMappingURL=e-diff.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-long-divide.js







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_long_divide_eNegativeOf = eNegativeOf;
const e_long_divide_fastExpansionSum = fastExpansionSum;
const e_long_divide_eCompress = eCompress;
const e_long_divide_growExpansion = growExpansion;
const e_long_divide_eSum = eSum;
const e_long_divide_scaleExpansion = scaleExpansion;
const e_long_divide_eDiff = eDiff;
const sign = Math.sign;
function eLongDivide(N, D) {
    N = e_long_divide_eCompress(N);
    D = e_long_divide_eCompress(D);
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    const d = D[D.length - 1];
    // trivial cases
    if (D.length === 1) {
        if (d === 0) {
            throw new Error('division by zero');
        }
        if (d === 1) {
            return { div: N, rem: [0] };
        }
        if (d === -1) {
            return { div: e_long_divide_eNegativeOf(N), rem: [0] };
        }
    }
    const signN = sign(N[N.length - 1]);
    if (signN === 0) {
        return { div: [0], rem: [0] };
    }
    const signD = sign(d);
    const divs = [];
    let oldLen = 0;
    while (true) {
        const rems = [];
        // loop from big `n[i]` to small `n[i]`
        for (let i = N.length - 1; i >= 0; i--) {
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            const div = Math.round((n - (n % d)) / d);
            // get the remainder by calculating `rem = n - d*div`
            rems.push(e_long_divide_scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = e_long_divide_eCompress(e_long_divide_eDiff(N, e_long_divide_eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = e_long_divide_growExpansion(div, divs[i]);
    }
    div = e_long_divide_eCompress(div);
    //----------------------
    // fix signs (possibly)
    //----------------------
    //const signDiv = sign(div[div.length-1]);
    const signRem = sign(rem[rem.length - 1]);
    //const signND = signN * signD;
    // We must have:
    // sign(div) === sign(n) * sign(d)
    // sign(rem) === sign(n)
    // At this point: `signN !== 0` and `signD !== 0`
    if (signRem !== 0 && signRem !== signN) {
        if (signN > 0) {
            if (signD > 0) {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}

//# sourceMappingURL=e-long-divide.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-compare.js


/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * "The easiest way to compare two expansions is to subtract one from the other,
 * and test the sign of the result. An expansion’s sign can be easily tested
 * because of the nonoverlapping property; simply check the sign of the
 * expansion's most significant nonzero component..."
 *
 * @param a a floating point expansion
 * @param b another floating point expansion
 */
function eCompare(a, b) {
    return eSign(eDiff(a, b));
}

//# sourceMappingURL=e-compare.js.map
;// ./src/basic/double/is-rational-multiple-of.ts



/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function isRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scaleFloatsToInts(a[0] < 0 ? a.map(c => -c) : a);
    const b_ = scaleFloatsToInts(b[0] < 0 ? b.map(c => -c) : b);
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = gcdInt(lcA, lcB);
    const A = lcA / gcd; // this division is exact
    const B = lcB / gcd; // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = twoProduct(A, b_[i]);
        const { div, rem } = eLongDivide(Ab, [B]);
        if (eSign(rem) !== 0) {
            return false;
        }
        if (eCompare(div, [a_[i]]) !== 0) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/double/multiply-by-const.ts

/**
 * Returns the result of multiplies a polynomial by a constant in double
 * precision.
 *
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]
 * ```
 *
 * @doc
 */
function multiplyByConst(c, p) {
    if (c === 0) {
        return [];
    }
    const d = p.length;
    const p_ = new Array(d);
    for (let i = 0; i < d; i++) {
        p_[i] = c * p[i];
    }
    // We *have* to clip due to possible floating point underflow
    return removeLeadingZeros(p_);
}


;// ./src/basic/double/multiply.ts
/* unused harmony import specifier */ var multiply_removeLeadingZeros;

const { max: multiply_max } = Math;
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
function multiply(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    const d = d1 + d2;
    const r = new Array(d + 1).fill(0);
    for (let i = 0; i < d1 + 1; i++) {
        for (let j = 0; j < d2 + 1; j++) {
            r[d - (i + j)] += (p1[d1 - i] * p2[d2 - j]);
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
function multiplyKaratsuba(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    return multiply_removeLeadingZeros(karatsuba(p1, p2));
}
/**
 * Karatsuba multiplication of two polynomials given (as everywhere in this
 * module) densely from highest to lowest power. The lowest powers sit at the
 * end of each array, so the polynomials are split by taking the trailing
 * coefficients as the low half, and all coefficient-wise additions are aligned
 * at the right (low-order) end.
 */
function karatsuba(a, b) {
    const la = a.length;
    const lb = b.length;
    if (la === 0 || lb === 0) {
        return [];
    }
    const n = multiply_max(la, lb);
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
    const aSplit = multiply_max(0, la - m);
    const bSplit = multiply_max(0, lb - m);
    const aHigh = a.slice(0, aSplit);
    const aLow = a.slice(aSplit);
    const bHigh = b.slice(0, bSplit);
    const bLow = b.slice(bSplit);
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
function addArr(a, b) {
    const l = multiply_max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for (let i = 0; i < a.length; i++) {
        r[oa + i] += a[i];
    }
    for (let i = 0; i < b.length; i++) {
        r[ob + i] += b[i];
    }
    return r;
}
/** subtracts `b` from `a` (highest-to-lowest, aligned at the low end) */
function subArr(a, b) {
    const l = multiply_max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for (let i = 0; i < a.length; i++) {
        r[oa + i] += a[i];
    }
    for (let i = 0; i < b.length; i++) {
        r[ob + i] -= b[i];
    }
    return r;
}
/** adds `src` raised by `shift` powers into the highest-to-lowest `dst` */
function addInto(dst, src, shift) {
    const offset = dst.length - src.length - shift;
    for (let i = 0; i < src.length; i++) {
        dst[offset + i] += src[i];
    }
}


;// ./src/basic/double/negate.ts
/**
 * Returns the negative of the given polynomial (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @example
 * ```typescript
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 * ```
 *
 * @doc
 */
function negate(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = -p[i];
    }
    return p_;
}


;// ./src/basic/double/subtract.ts

/**
 * Returns the result of subtracting the second polynomial from the first in
 * double precision; (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of double floating point numbers
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * subtract([2,3],[4,4]); //=> [-2, -1]
 * ```
 *
 * @doc
 */
function subtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const r = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || 0;
        const c2 = p2[i + Δd2] || 0;
        r[i] = c1 - c2;
    }
    // Ensure the result is a valid polynomial representation
    return removeLeadingZeros(r);
}


;// ./node_modules/double-double/node/double-double/unary/dd-abs.js
/**
 * Returns the absolute value of the given double-double precision floating
 * point number.
 * @param f a double-double precision floating point number
 */
function ddAbs(f) {
    const Q = f[1];
    return (Q < 0) ? [-f[0], -Q] : f;
}

//# sourceMappingURL=dd-abs.js.map
;// ./src/basic/double-double/dd-abs-coeff.ts

/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
function ddAbsCoeff(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = ddAbs(p[i]);
    }
    return p_;
}


;// ./node_modules/double-double/node/double-double/binary/dd-add-dd.js
/**
 * Returns the result of adding two double-double-precision floating point
 * numbers.
 *
 * * relative error bound: 3u^2 + 13u^3, i.e. fl(a+b) = (a+b)(1+ϵ),
 * where ϵ <= 3u^2 + 13u^3, u = 0.5 * Number.EPSILON
 * * the error bound is not sharp - the worst case that could be found by the
 * authors were 2.25u^2
 *
 * ALGORITHM 6 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y another double-double precision floating point number
 */
function ddAddDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    //const [sl,sh] = twoSum(xh,yh);
    const sh = xh + yh;
    const _1 = sh - xh;
    const sl = (xh - (sh - _1)) + (yh - _1);
    //const [tl,th] = twoSum(xl,yl);
    const th = xl + yl;
    const _2 = th - xl;
    const tl = (xl - (th - _2)) + (yl - _2);
    const c = sl + th;
    //const [vl,vh] = fastTwoSum(sh,c)
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    //const [zl,zh] = fastTwoSum(vh,w)
    const zh = vh + w;
    const zl = w - (zh - vh);
    return [zl, zh];
}

//# sourceMappingURL=dd-add-dd.js.map
;// ./src/basic/double-double/dd-remove-leading-zeros.ts
/**
 * If the highest power coefficient of the given polynomial is 0 then
 * `ddRemoveLeadingZeros` can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 *
 * @param p a polynomial whose leading zeros should be removed
 *
 * @doc
 */
function ddRemoveLeadingZeros(p) {
    let lzCount = 0;
    for (let i = 0; i <= p.length - 1; i++) {
        if (p[i][1] !== 0) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}


;// ./src/basic/double-double/dd-add.ts


/**
 * Returns the result of adding two polynomials in double-double precision.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial
 *
 * @doc
 */
function ddAdd(p1, p2) {
    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    const minD = Math.min(d1, d2);
    // Add where both polynomials overlap
    for (let i = 0; i <= minD; i++) {
        result[d - i] = ddAddDd(p1[d1 - i], p2[d2 - i]);
    }
    // Copy remaining coefficients from longer polynomial
    for (let i = minD + 1; i <= d1; i++) {
        result[d - i] = p1[d1 - i];
    }
    for (let i = minD + 1; i <= d2; i++) {
        result[d - i] = p2[d2 - i];
    }
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}

// Quokka tests
// ddAdd([[0,1],[0,2],[0,3]],[[0,3],[0,4]]);  /*?*/  //=> [1,5,7]

;// ./src/basic/double-double/dd-degree.ts
/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
function ddDegree(p) {
    return p.length - 1;
}


;// ./node_modules/double-double/node/double-double/binary/dd-div-dd.js
/** @internal */
const dd_div_dd_f = 134217729; // 2**27 + 1;
/**
 * Returns the result of dividing two double-double-precision floating point
 * numbers, i.e. returns x/y.
 *
 * * relative error bound: 15u^2 + 56u^3, i.e. fl(a/b) = (a/b)(1+ϵ),
 * where ϵ <= 15u^2 + 56u^3, u = 0.5 * Number.EPSILON
 * * the largest error found was 8.465u^2
 *
 * * ALGORITHM 17 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y another double-double precision floating point number
 */
function ddDivDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    const th = xh / yh;
    // approximation to th*(yh + yl) using Algorithm 7
    //const [rl,rh] = ddMultDouble1(th,[yl,yh]);  
    const ch = yh * th;
    const c = dd_div_dd_f * yh;
    const ah = c - (c - yh);
    const al = yh - ah;
    const d = dd_div_dd_f * th;
    const bh = d - (d - th);
    const bl = th - bh;
    const cl1 = (al * bl) - ((ch - (ah * bh)) - (al * bh) - (ah * bl));
    const cl2 = yl * th;
    const th_ = ch + cl2;
    const tl1 = cl2 - (th_ - ch);
    const tl2 = tl1 + cl1;
    const rh = th_ + tl2;
    const rl = tl2 - (rh - th_);
    const πh = xh - rh; // exact operation
    const δl = xl - rl;
    const δ = πh + δl;
    const tl = δ / yh;
    //return fastTwoSum(th,tl);
    const xx = th + tl;
    return [tl - (xx - th), xx];
}

//# sourceMappingURL=dd-div-dd.js.map
;// ./src/basic/double-double/dd-divide-by-const.ts

/**
 * Divides a polynomial by a constant in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-double precision
 *
 * @doc
 */
function ddDivideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = ddDivDd(p[i], c);
    }
    return r;
}


;// ./node_modules/double-double/node/double-double/binary/dd-mult-dd.js
/** @internal */
const dd_mult_dd_f = 2 ** 27 + 1;
/**
 * Returns the product of two double-double-precision floating point numbers.
 *
 * * relative error bound: 7u^2, i.e. fl(a+b) = (a+b)(1+ϵ),
 * where ϵ <= 7u^2, u = 0.5 * Number.EPSILON
 * the error bound is not sharp - the worst case that could be found by the
 * authors were 5u^2
 *
 * * ALGORITHM 10 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y another double-double precision floating point number
 */
function ddMultDd(x, y) {
    const xh = x[1];
    const yh = y[1];
    //const [cl1,ch] = twoProduct(xh,yh);
    const ch = xh * yh;
    const c = dd_mult_dd_f * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d = dd_mult_dd_f * yh;
    const bh = d - (d - yh);
    const bl = yh - bh;
    const cl1 = (al * bl) - ((ch - (ah * bh)) - (al * bh) - (ah * bl));
    //return fastTwoSum(ch,cl1 + (xh*yl + xl*yh));
    const b = cl1 + (xh * y[0] + x[0] * yh);
    const xx = ch + b;
    return [b - (xx - ch), xx];
}

//# sourceMappingURL=dd-mult-dd.js.map
;// ./src/basic/double-double/dd-multiply-by-const.ts


/**
 * Returns the result of multiplies a polynomial by a constant in double-double
 * precision.
 *
 * @param c a constant in double-double precision
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
function ddMultiplyByConst(c, p) {
    if (c[1] === 0) {
        return [[0, 0]];
    }
    const d = p.length;
    const p_ = new Array(d);
    for (let i = 0; i < d; i++) {
        p_[i] = ddMultDd(c, p[i]);
    }
    // We *have* to clip due to possible floating point underflow
    return ddRemoveLeadingZeros(p_);
}

// Quokka tests
// ddMultiplyByConst([0,0.25], [[0,3],[0,2],[0,1]]);  /*?*/ //=> [0.75, 0.5, 0.25]

;// ./src/basic/double-double/dd-multiply.ts


/**
 * Returns the result of multiplying 2 double-double precision coefficient
 * polynomials.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial.
 *
 * @doc
 */
function ddMultiply(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    const d = d1 + d2;
    const r = new Array(d + 1).fill([0, 0]);
    for (let i = 0; i < d1 + 1; i++) {
        for (let j = 0; j < d2 + 1; j++) {
            // r[d-(i+j)] += (p1[d1-i] * p2[d2-j]);
            r[d - (i + j)] = ddAddDd(r[d - (i + j)], ddMultDd(p1[d1 - i], p2[d2 - j]));
        }
    }
    return ddRemoveLeadingZeros(r);
}

// Quokka tests
// ddMultiply([[0,1],[0,2],[0,3]], [[0,2],[0,5],[0,3],[0,5]]); /*?*/  //=> [2, 9, 19, 26, 19, 15]

;// ./src/basic/double-double/dd-negate.ts
/**
 * Returns the negative of the given polynomial (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of double-dboule
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
function ddNegate(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = [-p[i][0], -p[i][1]];
    }
    return p_;
}


;// ./node_modules/double-double/node/double-double/binary/dd-diff-dd.js
/**
 * Returns the result of subtracting the second given double-double-precision
 * floating point number from the first.
 *
 * * relative error bound: 3u^2 + 13u^3, i.e. fl(a-b) = (a-b)(1+ϵ),
 * where ϵ <= 3u^2 + 13u^3, u = 0.5 * Number.EPSILON
 * * the error bound is not sharp - the worst case that could be found by the
 * authors were 2.25u^2
 *
 * ALGORITHM 6 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y another double-double precision floating point number
 */
function ddDiffDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    //const [sl,sh] = twoSum(xh,yh);
    const sh = xh - yh;
    const _1 = sh - xh;
    const sl = (xh - (sh - _1)) + (-yh - _1);
    //const [tl,th] = twoSum(xl,yl);
    const th = xl - yl;
    const _2 = th - xl;
    const tl = (xl - (th - _2)) + (-yl - _2);
    const c = sl + th;
    //const [vl,vh] = fastTwoSum(sh,c)
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    //const [zl,zh] = fastTwoSum(vh,w)
    const zh = vh + w;
    const zl = w - (zh - vh);
    return [zl, zh];
}

//# sourceMappingURL=dd-diff-dd.js.map
;// ./src/basic/double-double/dd-subtract.ts


/**
 * Returns the result of subtracting the second polynomial from the first in
 * double-double precision; (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of double-double floating point numbers
 * from highest to lowest power
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @doc
 */
function ddSubtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0, 0];
        const c2 = p2[i + Δd2] || [0, 0];
        result[i] = ddDiffDd(c1, c2);
    }
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}


;// ./node_modules/big-float-ts/node/double-expansion/e-abs.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_abs_negativeOf = eNegativeOf;
/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return e_abs_negativeOf(e);
    }
    return e;
}

//# sourceMappingURL=e-abs.js.map
;// ./src/basic/expansion/e-abs-coeff.ts

/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eAbsCoeff(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = eAbs(p[i]);
    }
    return p_;
}


;// ./src/basic/expansion/e-remove-leading-zeros.ts

/**
 * If the highest power coefficient of the given polynomial is 0 then
 * removeLeadingZeros can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 *
 * @internal
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eRemoveLeadingZeros([[1e-18], [1e-10], [1e-1]]); //=> [[1e-18], [1e-10], [1e-1]]
 * eRemoveLeadingZeros([[0], [1e-10], [1e-1]]); //=> [[1e-10], [1e-1]]
 * ```
 *
 * @doc
 */
function eRemoveLeadingZeros(p) {
    let lzCount = 0;
    for (let i = 0; i <= p.length - 1; i++) {
        if (eSign(p[i]) !== 0) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}


;// ./src/basic/expansion/e-add.ts


/**
 * Returns the exact result (bar underflow / overflow) of adding two
 * polynomials with coefficients given as Shewchuk floating point expansions.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eAdd([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 * ```
 *
 * @doc
 */
function eAdd(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result[i] = fastExpansionSum(c1, c2);
    }
    // Ensure the result is a valid polynomial representation
    return eRemoveLeadingZeros(result);
}


;// ./src/basic/expansion/e-degree.ts
/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eDegree([[9],[8],[7],[6],[5],[4],[3],[2],[1]]); //=> 8
 * ```
 *
 * @doc
 */
function eDegree(p) {
    return p.length - 1;
}


;// ./src/basic/expansion/e-equal.ts

/**
 * Returns true if two polynomials (with coefficients given as Shewchuk floating
 * point expansions) are exactly equal by comparing coefficients, false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eEqual([[1],[2],[3],[0,4]], [[1],[2],[3],[4]]);   //=> true
 * eEqual([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 * ```
 *
 * @doc
 */
function eEqual(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (eCompare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/expansion/e-invert.ts
/**
 * Inverts the given polynomial (with coefficients given as Shewchuk floating
 * point expansions) by reversing the order of the coefficients,
 * i.e. p(x) -> x^deg(p) * p(1/x)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eInvert([[3],[2],[-5]]);  // => [[-5],[2],[3]]
 * ```
 *
 * @doc
 */
function eInvert(p) {
    return p.slice().reverse();
}


;// ./src/basic/expansion/e-is-const-or-zero.ts
/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk
 * floating point expansions) is a constant or the zero polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eIsConstOrZero(p) {
    return p.length <= 1;
}


;// ./node_modules/big-float-ts/node/double-expansion/e-int-div.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_div_eLongDivide = eLongDivide;
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(a, b) {
    return e_int_div_eLongDivide(a, b).div;
}

//# sourceMappingURL=e-int-div.js.map
;// ./node_modules/big-float-ts/node/double-expansion/expansion-product.js
/* unused harmony import specifier */ var expansion_product_eCompress;



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scaleExpansion;
const expansion_product_add = fastExpansionSum;
const expansion_product_compress = (/* unused pure expression or super */ null && (expansion_product_eCompress));
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations.
 *
 * Implemented naively and not as described by Shewchuk (i.e. the algorithm
 * takes O(k^2) operations).
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    let sum = [0];
    for (let i = 0; i < e.length; i++) {
        sum = expansion_product_add(sum, multByDouble(f, e[i]));
    }
    //return compress(sum);
    return sum;
}

//# sourceMappingURL=expansion-product.js.map
;// ./src/scale-to-int/scale-floatss-to-intss.ts


/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatssToIntss(ass) {
    let e = -1024;
    for (let i = 0; i < ass.length; i++) {
        const c = ass[i];
        for (let j = 0; j < c.length; j++) {
            const a = c[j];
            if (a === 0) {
                continue;
            }
            const scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }
    return ass.map(as => as.map(a => a * 2 ** e));
}


;// ./node_modules/big-float-ts/node/double-expansion/e-rem.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_rem_eLongDivide = eLongDivide;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return e_rem_eLongDivide(a, b).rem;
}

//# sourceMappingURL=e-rem.js.map
;// ./src/gcd/expansion/e-integer-gcd.ts

/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** `a`, `b` must be integers given as Shewchuk expansions
 *
 * @doc
 */
function eGcdInt(a, b) {
    a = eAbs(a);
    b = eAbs(b);
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (eSign(a) === 0) {
        return b;
    }
    if (eSign(b) === 0) {
        return a;
    }
    while (eSign(b) !== 0) {
        const t = b;
        b = eRem(a, b);
        a = t;
    }
    return a;
}
/**
 * Naively computes and returns the greatest common divisor of 2 or more
 * integers by taking each integer in turn and calculating the GCD of that
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 *
 * @param vals the integers (given as Shewchuk expansions) for which the GCD is
 * to be calculated
 */
function eGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for (let i = 0; i < len; i++) {
        vals_[i] = eAbs(vals_[i]);
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = eGcdInt(a, vals_[i]);
    }
    return a;
}


;// ./src/basic/expansion/e-is-rational-multiple-of.ts



/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function eIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scaleFloatssToIntss(eSign(a[0]) < 0 ? a.map(c => eNegativeOf(c)) : a);
    const b_ = scaleFloatssToIntss(eSign(b[0]) < 0 ? b.map(c => eNegativeOf(c)) : b);
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = eGcdInt(lcA, lcB);
    const A = eIntDiv(lcA, gcd); // this division is exact
    const B = eIntDiv(lcB, gcd); // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = expansionProduct(A, b_[i]);
        const { div, rem } = eLongDivide(Ab, B);
        if (eSign(rem) !== 0) {
            return false;
        }
        if (eCompare(div, a_[i]) !== 0) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/expansion/e-is-unit.ts
/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk
 * floating point expansions) is the unit polynomial, i.e. === 1.
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eIsUnit(p) {
    return p.length === 1 && p[0].length === 1 && p[0][0] === 1;
}


;// ./src/basic/expansion/e-multiply-by-const.ts


/**
 * Returns the exact result (bar underflow / overflow) of multiplying a
 * polynomial (with coefficients given as Shewchuk floating point expansions)
 * by a constant (given as a Shewchuk floating point expansion)
 *
 * @param c a constant (given as a Shewchuk floating point expansion)
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eMultiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]
 * ```
 *
 * @doc
 */
function eMultiplyByConst(c, p) {
    if (eSign(c) === 0) {
        return [];
    }
    const d = p.length - 1;
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        result[i] = expansionProduct(c, p[i]);
    }
    return result;
}


;// ./src/basic/expansion/e-multiply.ts



/**
 * Returns the exact result (bar underflow / overflow) of multiplying two
 * polynomials (with coefficients given as Shewchuk floating point expansions).
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param a a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial.
 *
 * @example
 * ```typescript
 * eMultiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 * ```
 *
 * @doc
 */
function eMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    const result = new Array(d + 1).fill([0]);
    for (let i = 0; i < da + 1; i++) {
        for (let j = 0; j < db + 1; j++) {
            result[d - (i + j)] = fastExpansionSum(result[d - (i + j)], expansionProduct(a[da - i], b[db - j]));
        }
    }
    return eRemoveLeadingZeros(result);
}


;// ./src/basic/expansion/e-negate.ts

/**
 * Returns the negative of the given polynomial (with coefficients given as
 * Shewchuk floating point expansions), i.e. (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 * ```
 *
 * @doc
 */
function eNegate(p) {
    const result = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        result[i] = eNegativeOf(p[i]);
    }
    return result;
}


;// ./src/basic/expansion/e-product.ts

/**
 * Returns the exact result (bar underflow / overflow) of the product of 0 or
 * more polynomials.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param ps an array of polynomials each with coefficients given densely as an
 * array of Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eProduct([[[1],[2],[3]], [[2],[5],[3],[5]]]); //=> [[2], [9], [19], [26], [19], [15]]
 * ```
 *
 * @doc
 */
function eProduct(ps) {
    if (ps.length === 0) {
        return [[1]];
    }
    let p = ps[0];
    for (let i = 1; i < ps.length; i++) {
        p = eMultiply(p, ps[i]);
    }
    return p;
}


;// ./src/basic/expansion/e-subtract.ts


/**
 * Returns the exact result (bar underflow / overflow) of subtracting the
 * second polynomial from the first (both with coefficients given as Shewchuk
 * floating point expansions); (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as Shewchuk floating point expansions
 * from highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * eSubtract([[2],[3]],[[4],[4]]); //=> [[-2], [-1]]
 * ```
 *
 * @doc
 */
function eSubtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result[i] = eDiff(c1, c2);
    }
    // Ensure the result is a valid polynomial representation
    return eRemoveLeadingZeros(result);
}


;// ./src/calculus/bigint/b-differentiate.ts
/**
 * Returns the result of differentiating the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bDifferentiate([5n, 4n, 3n, 2n, 1n]); //=> [20n, 12n, 6n, 2n]
 * ```
 *
 * @doc
 */
function bDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = BigInt((d - i)) * p[i];
    }
    return r;
}


;// ./src/calculus/double/differentiate.ts
/**
 * Returns the result of differentiating the given polynomial in double
 * precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 * ```
 *
 * @doc
 */
function differentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const result = new Array(d);
    for (let i = 0; i < d; i++) {
        result[i] = (d - i) * p[i];
    }
    return result;
}


;// ./src/calculus/double/integrate.ts
/**
 * Returns the result of integrating the given polynomial in double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([3, 2, 1]); //=> [1, 1, 1, c]
 * ```
 *
 * @doc
 */
function integrate(p, c) {
    const d = p.length - 1;
    const result = new Array(d + 2);
    for (let i = 0; i < d + 1; i++) {
        result[i] = p[i] / (d + 1 - i);
    }
    result[d + 1] = c;
    return result;
}


;// ./node_modules/double-double/node/double-mixed-double-double/dd-mult-double.js
/** @internal */
const dd_mult_double_f = 134217729; // 2**27 + 1;
/**
 * Returns the product of a double-double-precision floating point number and a
 * double.
 *
 * * slower than ALGORITHM 8 (one call to fastTwoSum more) but about 2x more
 * accurate
 * * relative error bound: 1.5u^2 + 4u^3, i.e. fl(a+b) = (a+b)(1+ϵ),
 * where ϵ <= 1.5u^2 + 4u^3, u = 0.5 * Number.EPSILON
 * * the bound is very sharp
 * * probably prefer `ddMultDouble2` due to extra speed
 *
 * * ALGORITHM 7 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param y a double
 * @param x a double-double precision floating point number
 */
function ddMultDouble1(y, x) {
    const xl = x[0];
    const xh = x[1];
    //const [cl1,ch] = twoProduct(xh,y);
    const ch = xh * y;
    const c = dd_mult_double_f * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d = dd_mult_double_f * y;
    const bh = d - (d - y);
    const bl = y - bh;
    const cl1 = (al * bl) - ((ch - (ah * bh)) - (al * bh) - (ah * bl));
    const cl2 = xl * y;
    //const [tl1,th] = fastTwoSum(ch,cl2);
    const th = ch + cl2;
    const tl1 = cl2 - (th - ch);
    const tl2 = tl1 + cl1;
    //const [zl,zh] = fastTwoSum(th,tl2);
    const zh = th + tl2;
    const zl = tl2 - (zh - th);
    return [zl, zh];
}
/**
 * Returns the product of a double-double-precision floating point number and a double.
 *
 * * faster than ALGORITHM 7 (one call to fastTwoSum less) but about 2x less
 * accurate
 * * relative error bound: 3u^2, i.e. fl(a*b) = (a*b)(1+ϵ),
 * where ϵ <= 3u^2, u = 0.5 * Number.EPSILON
 * * the bound is sharp
 * * probably prefer this algorithm due to extra speed
 *
 * * ALGORITHM 8 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param y a double
 * @param x a double-double precision floating point number
 */
function ddMultDouble2(y, x) {
    const xl = x[0];
    const xh = x[1];
    //const [cl1,ch] = twoProduct(xh,y);
    const ch = xh * y;
    const c = dd_mult_double_f * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d = dd_mult_double_f * y;
    const bh = d - (d - y);
    const bl = y - bh;
    const cl1 = (al * bl) - ((ch - (ah * bh)) - (al * bh) - (ah * bl));
    const cl2 = xl * y;
    const cl3 = cl1 + cl2;
    //return fastTwoSum(ch,cl3);
    const xx = ch + cl3;
    return [cl3 - (xx - ch), xx];
}

//# sourceMappingURL=dd-mult-double.js.map
;// ./src/calculus/double-double/dd-differentiate.ts

/**
 * Returns the result of differentiating the given polynomial (with coefficients
 * given in double-double precision) in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * ddDifferentiate([[0,5], [0,4], [0,3], [0,2], [0,1]]); //=> [[0,20], [0,12], [0,6], [0,2]]
 * ```
 *
 * @doc
 */
function ddDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const r = new Array(d);
    for (let i = 0; i < d; i++) {
        r[i] = ddMultDouble2((d - i), p[i]);
    }
    return r;
}


;// ./src/error-analysis/gamma.ts
/** `2 * 2^-53` -> 2x the standard round-of unit `=== Number.EPSILON` */
const eps = Number.EPSILON;
/** `2^-53` -> the standard round-of unit `=== eps/2` */
const u = Number.EPSILON / 2;
/** `2^-106` -> the standard round-of unit for double-double precision `=== (eps/2)**2` */
const uu = u * u;
/**
 * the standard floating point error function evaluated at `1`
 *
 * * `=== 1.1102230246251568e-16`
 * * very close to being `=== Number.EPSILON / 2`
 */
const γ1 = γ(1);
/**
 * the standard double-double floating point error function evaluated at `3`;
 * the `3` factor is due to double-double arithmetic accuracy constraints
 *
 * * `=== 3.697785493223493e-32`
 * * very close to being `=== 3*(Number.EPSILON / 2)**2`
 */
const γγ3 = γγ(3);
/**
 * The canonical floating point error function, γ.
 *
 * * very close to being `=== n * (Number.EPSILON / 2)`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this `=== 2*d + 1`, where `d` is the degree of the
 * polynomial
 *
 * @doc
 */
function γ(n) {
    const nu = n * u;
    return nu / (1 - nu);
}
/**
 * The canonical, once compensated (implying double-double precision),
 * floating point error function.
 *
 * * very close to being `=== n * (Number.EPSILON / 2)**2`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this === 2*d + 1, where d is the degree of the
 * polynomial
 *
 * @doc
 */
function γγ(n) {
    const nuu = n * uu;
    return nuu / (1 - nuu);
}
// cache some standard error bound units
const _γs = new Array(20).fill(0).map((_, i) => γ(i));
/** @internal */
function γs(n) {
    return _γs[n] || γ(n);
}


;// ./src/calculus/double-double/dd-differentiate-with-err.ts



const dd_differentiate_with_err_3 = γγ(3);
/**
 * Returns the result (and resulting coefficient-wise error bound) of
 * differentiating the given polynomial (with coefficients given in
 * double-double precision) in double-double precision.
 *
 * @param pWithErr an object with 2 properties: `p`: a polynomial with
 * coefficients given densely as an array of double-double precision floating
 * point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]` represents
 * the polynomial `5x^2 - 3x` **and** `pE`: the coefficient-wise error bound of
 * the input polynomial
 *
 * @doc
 */
function ddDifferentiateWithError(pWithErr) {
    const { p, pE } = pWithErr;
    const d = p.length - 1;
    if (d <= 0) {
        return { p: [], pE: [] };
    }
    const dp = new Array(d);
    const dpE = new Array(d);
    for (let i = 0; i < d; i++) {
        const deg = d - i;
        const c = ddMultDouble2(deg, p[i]);
        dp[i] = c;
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        const extraErr = (deg & deg - 1) === 0 ? 0 : dd_differentiate_with_err_3;
        const $c = eEstimate(c);
        dpE[i] = deg * pE[i] + Math.abs($c) * extraErr;
    }
    return { p: dp, pE: dpE };
}


;// ./node_modules/double-double/node/double-mixed-double-double/dd-div-double.js
/** @internal */
const dd_div_double_f = 134217729; // 2**27 + 1;
/**
 * Returns the result of dividing a double-double-precision floating point
 * number by a double.
 *
 * * relative error bound: 3u^2, i.e. fl(a/b) = (a/b)(1+ϵ), where ϵ <= 3u^2,
 * u = 0.5 * Number.EPSILON
 * * the bound is very sharp
 *
 * * ALGORITHM 15 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y the double-precision divisor
 */
function ddDivDouble(x, y) {
    const xl = x[0];
    const xh = x[1];
    const th = xh / y;
    //const [πl,πh] = twoProduct(th,y);
    const πh = th * y;
    const c = dd_div_double_f * th;
    const ah = c - (c - th);
    const al = th - ah;
    const d = dd_div_double_f * y;
    const bh = d - (d - y);
    const bl = y - bh;
    const πl = (al * bl) - ((πh - (ah * bh)) - (al * bh) - (ah * bl));
    const δh = xh - πh; // exact operation
    const δt = δh - πl; // exact operation
    const δ = δt + xl;
    const tl = δ / y;
    //return fastTwoSum(th,tl);
    const rl = th + tl;
    return [tl - (rl - th), rl];
}

//# sourceMappingURL=dd-div-double.js.map
;// ./src/calculus/double-double/dd-integrate.ts

/**
 * Returns the result of integrating the given polynomial in double-double
 * precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest
 * power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([[0,3], [0,2], [0,1]]); //=> [[0,1], [0,1], [0,1], [0,c]]
 * ```
 *
 * @doc
 */
function ddIntegrate(p, c) {
    const d = p.length - 1;
    const r = new Array(d + 2);
    for (let i = 0; i < d + 1; i++) {
        r[i] = ddDivDouble(p[i], (d + 1 - i));
    }
    r[d + 1] = c;
    return r;
}


;// ./src/calculus/expansion/e-differentiate.ts

/**
 * Returns the exact result (bar underflow / overflow) of differentiating the
 * given polynomial (with Shewchuk expansion coefficients).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eDifferentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 * ```
 *
 * @doc
 */
function eDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const result = new Array(d);
    for (let i = 0; i < d; i++) {
        result[i] = scaleExpansion(p[i], d - i);
    }
    return result;
}


;// ./src/util/double/binomial.ts
/** The highest value double precision can handle */
const ABS_MAX_LIMIT = 60;
let maxLimit = 10;
const binomialTable = precomputeBinomialCoefficients(maxLimit);
function precomputeBinomialCoefficients(maxN) {
    // Initialize a 2D array matrix of size (maxN + 1) x (maxN + 1) filled with 0
    const dp = Array.from({ length: maxN + 1 }, () => new Array(maxN + 1).fill(0));
    for (let i = 0; i <= maxN; i++) {
        // The inner loop only needs to run up to 'i' (Pascal's triangle width grows with the row index)
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                dp[i][j] = 1; // Base cases: nC0 = 1 and nCn = 1
            }
            else {
                // Pascal's Identity: nCk = (n-1)C(k-1) + (n-1)Ck
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
        }
    }
    return dp;
}
function extendBinomialCoefficients(binomialTable, maxN) {
    const currentMaxN = binomialTable.length - 1;
    if (maxN <= currentMaxN) {
        return binomialTable;
    }
    // Keep rows rectangular to simplify indexing.
    for (let i = 0; i <= currentMaxN; i++) {
        const row = binomialTable[i];
        for (let j = row.length; j <= maxN; j++) {
            row.push(0);
        }
    }
    // Add new rows using Pascal's identity.
    for (let i = currentMaxN + 1; i <= maxN; i++) {
        const row = new Array(maxN + 1).fill(0);
        row[0] = 1;
        row[i] = 1;
        for (let j = 1; j < i; j++) {
            row[j] = binomialTable[i - 1][j - 1] + binomialTable[i - 1][j];
        }
        binomialTable.push(row);
    }
    maxLimit = maxN;
    return binomialTable;
}
function binomial(n, k) {
    if (n > ABS_MAX_LIMIT) {
        throw new Error(`n = ${n} exceeds the maximum limit of ${ABS_MAX_LIMIT}.`);
    }
    if (n > maxLimit) {
        extendBinomialCoefficients(binomialTable, n);
    }
    return binomialTable[n][k];
}
/** An earier simpler implementation */
// function binomial(
//         n: number,
//         k: number): number {
//     k = min(k, n - k);
//     if (k === 0 || k === n) { return 1; }
//     let c = 1;
//     for (let i=1; i<=k; i++) {
//         c = c*(n - k + i)/i;
//     }
//     return c;
// }


;// ./src/change-basis/double/bernstein-to-power-basis-01.ts

/**
 * Returns the power basis representation from the given
 * Bernstein (in [0,1]) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p
 *
 */
function bernsteinToPowerBasis01(p) {
    const n = p.length - 1;
    if (n >= 4) {
        // Power coefficients by degree in ascending order: c[i] for x^i.
        const c = new Array(n + 1).fill(0);
        for (let i = 0; i <= n; i++) {
            let s = 0;
            for (let j = 0; j <= i; j++) {
                const sign = ((i - j) % 2) === 0 ? 1 : -1;
                s += sign * binomial(i, j) * p[j];
            }
            c[i] = binomial(n, i) * s;
        }
        // Convert ascending-by-degree to dense descending power basis.
        return c.reverse();
    }
    if (n === 3) {
        const [x0, x1, x2, x3] = p;
        return [
            (x3 - x0) + 3 * (x1 - x2),
            3 * ((x2 + x0) - 2 * x1),
            3 * (x1 - x0),
            x0
        ];
    }
    if (n === 2) {
        const [x0, x1, x2] = p;
        return [(x2 + x0) - 2 * x1, 2 * (x1 - x0), x0];
    }
    if (n === 1) {
        const [x0, x1] = p;
        return [x1 - x0, x0];
    }
    return p;
}


;// ./src/change-variables/double/scale.ts
const changeVariablesScale = scale;
/**
* Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
* in double precision.
*
* @param p a polynomial with coefficients given densely as an array of double
* floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
* represents the polynomial `5x^2 - 3x`
* @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
*
* @example
* ```typescript
* changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
* ```
*
* @doc
*/
function scale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    let sPow = s;
    for (let i = 1; i <= n; i++) {
        r[n - i] = p[n - i] * sPow;
        sPow *= s;
    }
    return r;
}
/**
 * ❗**MODIFIES**❗ the polynomial such that `p(x)` -> `p(s·x)`,
 * i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 *
 * @doc
 */
function inplaceScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    let sPow = s;
    for (let i = 1; i <= n; i++) {
        p[n - i] = p[n - i] * sPow;
        sPow *= s;
    }
}


;// ./src/change-variables/double/taylor-shift.ts
const changeVariablesTranslateX = taylorShift;
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 *
 * @doc
 */
function taylorShift(p, h) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            q[i] = q[i] + h * q[i - 1];
        }
    }
    return q;
}


;// ./src/change-variables/double/change-variables-linear.ts


/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax + b) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * changeVariablesLinear([1,2,7], 3, 4); //=> [9, 30, 31]
 * ```
 *
 * @doc
 */
function changeVariablesLinear(p, a, b) {
    return scale(taylorShift(p, b), a);
}


;// ./src/change-basis/double/bernstein-to-power-basis.ts


/**
 * Returns the power basis representation from the given Bernstein basis on
 * the interval `[a,b]`.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p the Bernstein coefficients `[b_0,...,b_n]`
 * @param a the lower bound of the Bernstein basis interval
 * @param b the upper bound of the Bernstein basis interval
 *
 */
function bernsteinToPowerBasis(p, a = 0, b = 1) {
    if (p.length <= 1) {
        return p;
    }
    const p01 = bernsteinToPowerBasis01(p);
    return changeVariablesLinear(p01, 1 / (b - a), -a / (b - a));
}


;// ./src/change-basis/double/power-to-bernstein-basis-01.ts

/**
 * Returns the Bernstein basis representation (in [0, 1]) from the given
 * power (monomial) basis.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`.
 *
 * @doc
 */
function powerToBernsteinBasis01(p) {
    const n = p.length - 1;
    if (n >= 4) {
        // Step 1: Scale by 1 / binom(n, j)
        const bc = new Array(n + 1);
        for (let i = 0; i <= n; i++) {
            bc[i] = p[n - i] / binomial(n, i);
        }
        // Step 2: In-place triangular addition
        for (let i = n; i > 0; i--) {
            for (let j = i; j <= n; j++) {
                bc[j] += bc[j - 1];
            }
        }
        return bc;
    }
    if (n === 3) {
        const [a3, a2, a1, a0] = p;
        return [
            a0,
            a0 + a1 / 3,
            a0 + 2 * a1 / 3 + a2 / 3,
            a0 + a1 + a2 + a3
        ];
    }
    if (n === 2) {
        const [a2, a1, a0] = p;
        return [a0, a0 + a1 / 2, a0 + a1 + a2];
    }
    if (n === 1) {
        const [a1, a0] = p;
        return [a0, a0 + a1];
    }
    if (n === 0) {
        return [p[0]];
    }
    return [];
}


;// ./src/change-basis/double/power-to-bernstein-basis.ts


/**
 * Returns the Bernstein basis representation on the interval `[a,b]` from
 * the given power (monomial) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the lower bound of the Bernstein basis interval (default `0`)
 * @param b the upper bound of the Bernstein basis interval (default `1`)
 *
 * @doc
 */
function powerToBernsteinBasis(p, a = 0, b = 1) {
    if (p.length <= 1) {
        return p.slice();
    }
    // Substitute x = a + (b - a)*t so that t in [0,1] corresponds to x in [a,b].
    const q = changeVariablesLinear(p, b - a, a);
    return powerToBernsteinBasis01(q);
}


;// ./src/change-variables/bigint/b-scale.ts
const bChangeVariablesScale = bScale;
/**
* Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
*
* @param p a polynomial with coefficients given densely as an array of bigint
* numbers from highest to lowest power, e.g. `[5n,-3n,0n]`
* represents the polynomial `5x^2 - 3x`
* @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
*
* @example
* ```typescript
* bScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
* ```
*
* @doc
*/
function bScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    let sPow = s;
    for (let i = 1; i <= n; i++) {
        r[n - i] = p[n - i] * sPow;
        sPow *= s;
    }
    return r;
}
/**
 * Returns the polynomial `p((1/s)·x)`, i.e. the coefficient of `xⁱ` scaled by `(1/s)ⁱ`.
 *
 * * it is assumed that all coefficients are exactly divisible by `s`.
 *
 * @param p a polynomial with coefficients given densely as an array of bigint
 * numbers from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `s` in `p(x) <- p((1/s)x)`
 *
 * @example
 * ```typescript
 * bInvScale([16n, 8n, 7n], 4n); //=> [1n, 2n, 7n]
 * ```
 *
 * @doc
 */
function bInvScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    let sPow = s;
    for (let i = 1; i <= n; i++) {
        r[n - i] = p[n - i] / sPow;
        sPow *= s;
    }
    return r;
}


;// ./src/change-variables/bigint/b-taylor-shift.ts
const bChangeVariablesTranslateX = bTaylorShift;
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 *
 * @doc
 */
function bTaylorShift(p, h) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            q[i] = q[i] + h * q[i - 1];
        }
    }
    return q;
}


;// ./src/change-variables/bigint/b-change-variables-linear.ts


/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax + b).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * bChangeVariablesLinear([1n,2n,7n], 3n, 4n); //=> [9n, 30n, 31n]
 * ```
 *
 * @doc
 */
function bChangeVariablesLinear(p, a, b) {
    return bScale(bTaylorShift(p, b), a);
}


;// ./src/change-variables/bigint/b-reflect-about-y-axis.ts
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bReflectAboutYAxis([5n, 4n, 3n, 2n, 1n]); //=> [5n, -4n, 3n, -2n, 1n]
 * ```
 *
 * @doc
 */
function bReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2 === (d - 1) % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}


;// ./src/change-variables/double/taylor-shift-with-inp-err.ts
const { abs: taylor_shift_with_inp_err_abs } = Math;
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function taylorShiftWithInpErr(p, h, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = taylor_shift_with_inp_err_abs(h);
    const q = p.slice();
    const q_ = p_.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];
            const hq = h * qi1;
            const hq_ = _h * qi1_ + taylor_shift_with_inp_err_abs(hq);
            q[i] = q[i] + hq;
            q_[i] = q_[i] + hq_ + taylor_shift_with_inp_err_abs(q[i]);
        }
    }
    return [q, q_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(x + 1)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function inplaceTaylorShiftBy1WithInpErr(p, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + 1)`.
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            const qi1 = p[i - 1];
            const qi1_ = p_[i - 1];
            const hq_ = qi1_ + taylor_shift_with_inp_err_abs(qi1);
            p[i] = p[i] + qi1;
            p_[i] = p_[i] + hq_ + taylor_shift_with_inp_err_abs(p[i]);
        }
    }
}


;// ./src/change-variables/double/mobius.ts



/**
 * Applies a Mobius transformation to the given polynomial:
 * * `p(x) -> (x + 1)^n * p((ax + b) / (x + 1))`
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 *
 * * uses double precision internally
 *
 * * Runs in `O(n^2)` arithmetic operations (where `n` is the degree) by
 *   decomposing the Mobius map into elementary steps, rather than the `O(n^3)`
 *   of expanding and summing `Σ cᵢ (ax + b)^i (x + 1)^(n-i)` directly.
 *
 * * The decomposition (see https://math.stackexchange.com/questions/694565)
 *   uses the identity `(ax + b)/(x + 1) = a + (b - a)/(x + 1)`, which yields
 *   `(x + 1)^n * p((ax + b)/(x + 1)) = S₁( R( Scₐ₋ᵦ( Sₐ(p) ) ) )`
 *
 *   where
 *     - `Sₕ(f) = f(x + h)`           is a Taylor shift (`O(n^2)`),
 *     - `Sc_s(f)` scales the coefficient of `xⁱ` by `sⁱ` (`O(n)`),
 *     - `R(f)` reverses the coefficient array, i.e. `xⁿ f(1/x)` (`O(n)`).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 */
function mobius(p, a, b) {
    const n = p.length - 1;
    // the zero polynomial
    if (n < 0) {
        return [];
    }
    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let q = taylorShift(p, a);
    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    inplaceScale(q, b - a); // Exact if `b - a` is a power of 2
    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();
    //-------------------------------------------
    // Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    q = taylorShift(q, 1);
    return removeLeadingZeros(q);
}


;// ./src/change-variables/double/scale-with-inp-err.ts
const { abs: scale_with_inp_err_abs } = Math;
/**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
 * in double precision inlcuding an error bound that has **not** been scaled
 * by `γ1` yet.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 *
 * @doc
 */
function scaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return [[], []];
    }
    const r = new Array(n + 1);
    const r_ = new Array(n + 1);
    r[n] = p[n];
    r_[n] = p_[n];
    let sPow = s;
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = scale_with_inp_err_abs(pn_i);
        const pn_i_ = p_[j];
        const absRn_i = _pn_i * sPow;
        r[j] = pn_i * sPow;
        r_[j] = pn_i_ * sPow + _pn_i * sPow_ + absRn_i;
        sPow = sPow * s;
        sPow_ = sPow_ * s + sPow; // `s` is required to be positive
    }
    return [r, r_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be
 *   incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function inplaceScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    let sPow = s;
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = scale_with_inp_err_abs(pn_i);
        const pn_i_ = p_[j];
        const scaledPn_i = pn_i * sPow;
        p[j] = scaledPn_i;
        p_[j] = pn_i_ * sPow + _pn_i * sPow_ + scale_with_inp_err_abs(scaledPn_i);
        const nextSPow = sPow * s;
        sPow_ = sPow_ * s + nextSPow; // `s` is required to be positive
        sPow = nextSPow;
    }
}


;// ./src/change-variables/double/reflect-about-y-axis.ts
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 * ```
 *
 * @doc
 */
function reflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2 === (d - 1) % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}


;// ./src/change-variables/double-double/dd-scale-with-inp-err.ts

const { abs: dd_scale_with_inp_err_abs } = Math;
/**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
 * in double precision inlcuding an error bound that has **not** been scaled
 * by `γγ(3)` yet.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 *
 * @doc
 */
function ddScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return [[], []];
    }
    const r = new Array(n + 1);
    const r_ = new Array(n + 1);
    r[n] = p[n];
    r_[n] = p_[n];
    let sPow = [0, s];
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = dd_scale_with_inp_err_abs(pn_i[1]);
        const pn_i_ = p_[j];
        const absRn_i = _pn_i * sPow[1];
        r[j] = ddMultDd(sPow, pn_i);
        r_[j] = pn_i_ * sPow[1] + _pn_i * sPow_ + absRn_i;
        sPow = ddMultDd(sPow, [0, s]);
        sPow_ = sPow_ * s + sPow[1]; // `s` is required to be positive
    }
    return [r, r_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be
 *   incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function ddInplaceScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    let sPow = [0, s];
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = dd_scale_with_inp_err_abs(pn_i[1]);
        const pn_i_ = p_[j];
        const scaledPn_i = ddMultDd(sPow, pn_i);
        p[j] = scaledPn_i;
        p_[j] = pn_i_ * sPow[1] + _pn_i * sPow_ + dd_scale_with_inp_err_abs(scaledPn_i[1]);
        const nextSPow = ddMultDd(sPow, [0, s]);
        sPow_ = sPow_ * s + nextSPow[1]; // `s` is required to be positive
        sPow = nextSPow;
    }
}


;// ./src/change-variables/double-double/dd-taylor-shift.ts

/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function ddTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            q[i] = ddAddDd(q[i], ddMultDouble2(h, q[i - 1]));
        }
    }
    return q;
}


;// ./src/change-variables/expansion/e-scale.ts

const eChangeVariablesScale = eScale;
/**
 * Returns the polynomial `f(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 */
function eScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    // Keep powers of `s` as expansions to avoid rounding drift from repeated
    // double multiplication (`sPow *= s`).
    let sPow = [1];
    for (let i = 1; i <= n; i++) {
        sPow = scaleExpansion(sPow, s);
        r[n - i] = expansionProduct(p[n - i], sPow);
    }
    return r;
}


;// ./src/change-variables/expansion/e-taylor-shift.ts

const eChangeVariablesTranslateX = eTaylorShift;
/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk expansion
 * floating point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function eTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            q[i] = eCompress(fastExpansionSum(q[i], scaleExpansion(q[i - 1], h)));
        }
    }
    return q;
}


;// ./src/change-variables/expansion/e-change-variables-linear.ts


/**
 * Returns the exact result (bar underflow / overflow) of performing a change
 * of variables of the form: p(x) <- p(ax + b) on the given polynomial (with
 * coefficients given as Shewchuk expansions).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the `a` in `ax + b`
 * @param b the `b` in `ax + b`
 *
 * @example
 * ```typescript
 * eChangeVariablesLinear([[1],[2],[7]], 3, 4); //=> [[9], [30], [31]]
 * ```
 *
 * @doc
 */
function eChangeVariablesLinear(p, a, b) {
    return eScale(eTaylorShift(p, b), a);
}


;// ./src/change-variables/expansion/e-mobius.ts



function eMobius(p, a, b) {
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


;// ./src/change-variables/expansion/e-reflect-about-y-axis.ts

/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 * ```
 *
 * @doc
 */
function eReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2 === (d - 1) % 2) {
            result[i] = eNegativeOf(result[i]);
        }
    }
    return result;
}


;// ./src/change-variables/expansion/ee-taylor-shift.ts

/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 *
 * @doc
 */
function eeTaylorShift(p, h) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            // q[i] = q[i] + h*q[i - 1];
            q[i] = fastExpansionSum(q[i], expansionProduct(h, q[i - 1]));
        }
    }
    return q;
}


;// ./src/composition/double/compose.ts


/**
 * Returns the polynomial composition `p(q(x))` over double coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function compose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p) {
        r = add(multiply(r, q), [c]);
    }
    return r;
}


;// ./src/composition/bigint/b-compose.ts


/**
 * Returns the polynomial composition `p(q(x))` over bigint coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function bCompose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p) {
        r = bAdd(bMultiply(r, q), [c]);
    }
    return r;
}


;// ./src/composition/bigint/b-decompose-power-substitution.ts


/**
 * Detects decompositions of the form `p(x) = f(x^k)` over bigint coefficients.
 *
 * If such a nontrivial decomposition exists (`k > 1`), returns `{ f, g, k }`
 * where `g(x) = x^k`. Otherwise returns `undefined`.
 *
 * @param p polynomial coefficients from highest to lowest power
 */
function bDecomposePowerSubstitution(p) {
    const q = bRemoveLeadingZeros(p);
    if (q.length <= 1) {
        return undefined;
    }
    const n = q.length - 1;
    let k = 0;
    let nonZeroCount = 0;
    for (let i = 0; i < q.length; i++) {
        const c = q[i];
        if (c === 0n) {
            continue;
        }
        nonZeroCount++;
        const exp = n - i;
        k = gcdInt(k, exp);
    }
    // Constant/zero or no nontrivial common exponent factor.
    if (nonZeroCount <= 1 || k <= 1) {
        return undefined;
    }
    const d = n / k;
    const f = new Array(d + 1).fill(0n);
    for (let i = 0; i < q.length; i++) {
        const c = q[i];
        if (c === 0n) {
            continue;
        }
        const exp = n - i;
        const j = exp / k;
        f[d - j] = c;
    }
    const g = [1n, ...new Array(k).fill(0n)];
    return { f: bRemoveLeadingZeros(f), g, k };
}


;// ./src/composition/bigint/b-ritt-decompose.ts








const DEFAULT_OPTIONS = {
    completeInnerLeadingCoeffSearch: true
};
/**
 * Returns the exact decomposition of a polynomial over bigint coefficients.
 *
 * Returns composition factors `[f1, f2, ..., fk]` such that
 * `p = f1(f2(...fk(x)...))` and each factor is indecomposable by this method.
 *
 * This implementation searches proper degree divisors and verifies each
 * candidate by exact recomposition. It is substantially more general than the
 * power-substitution detector.
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param options decomposition options
 */
function bRittDecompose(p, options = {}) {
    const opts = getOptions(options);
    const ctx = newMemoContext();
    return bRittDecomposeInternal(p, opts, ctx);
}
function bRittDecomposeInternal(p, options, ctx) {
    const q = bRemoveLeadingZeros(p);
    if (q.length <= 2) {
        return [q];
    }
    const step = findOneStep(q, options, ctx);
    if (!step) {
        return [q];
    }
    const canonical = canonicalizeStep(step.g, step.h);
    return [
        ...bRittDecomposeInternal(canonical.g, options, ctx),
        ...bRittDecomposeInternal(canonical.h, options, ctx)
    ];
}
/** Recompose factors returned by `bRittDecompose`. */
function bRittRecompose(factors) {
    if (factors.length === 0) {
        return [];
    }
    let r = factors[factors.length - 1];
    for (let i = factors.length - 2; i >= 0; i--) {
        r = bCompose(factors[i], r);
    }
    return r;
}
function findOneStep(p, options, ctx) {
    const n = bDegree(p);
    if (n <= 1) {
        return undefined;
    }
    const c0 = p[p.length - 1];
    const p0 = c0 === 0n ? p : subConst(p, c0);
    const lc = p0[0];
    const divisors = properDivisors(n);
    for (const s of divisors) {
        const r = n / s;
        const innerLeadingCoeffs = candidateInnerLeadingCoeffs(lc, r, options, ctx);
        for (const lcInner of innerLeadingCoeffs) {
            const lcInnerPow = powBigInt(lcInner, r, ctx);
            if (lcInnerPow === 0n || lc % lcInnerPow !== 0n) {
                continue;
            }
            const lcOuter = lc / lcInnerPow;
            const h = buildInnerCandidate(p0, s, r, lcOuter, lcInner, ctx);
            if (!h) {
                continue;
            }
            const g0 = solveOuterFromInner(p0, h, r);
            if (!g0) {
                continue;
            }
            const g = g0.slice();
            g[g.length - 1] += c0;
            if (!bEqual(bCompose(g, h), p)) {
                continue;
            }
            if (bDegree(g) >= 1 && bDegree(h) >= 1 && bDegree(g) < n && bDegree(h) < n) {
                return { g, h };
            }
        }
    }
    return undefined;
}
function buildInnerCandidate(p, s, r, lcOuter, lcInner, ctx) {
    // h(x) = x^s + ... + 0
    const h = new Array(s + 1).fill(0n);
    h[0] = lcInner;
    for (let k = 1; k <= s - 1; k++) {
        const deg = s * r - k;
        // Coefficient with current unknown fixed to zero; unknown contributes
        // linearly with factor (lcOuter * r * lcInner^(r-1)).
        const known = coeffAtHighOffsetPower(h, r, k);
        const target = coeffAtDegree(p, deg);
        const num = target - lcOuter * known;
        const den = lcOuter * BigInt(r) * powBigInt(lcInner, r - 1, ctx);
        if (den === 0n || num % den !== 0n) {
            return undefined;
        }
        const b = num / den;
        // degree(s-k) coefficient is at index k
        h[k] = b;
    }
    return bRemoveLeadingZeros(h);
}
function candidateInnerLeadingCoeffs(lc, r, options, ctx) {
    const absLc = lc < 0n ? -lc : lc;
    if (absLc === 0n) {
        return [1n];
    }
    if (!options.completeInnerLeadingCoeffSearch) {
        // Fast heuristic set.
        return [1n, -1n, 2n, -2n];
    }
    const divisors = allPositiveDivisors(absLc, ctx);
    const candidates = [];
    for (const d of divisors) {
        const p = powBigInt(d, r, ctx);
        if (p !== 0n && lc % p === 0n) {
            candidates.push(d);
            candidates.push(-d);
        }
    }
    // Prefer small absolute values first.
    candidates.sort((a, b) => {
        const aa = a < 0n ? -a : a;
        const bb = b < 0n ? -b : b;
        if (aa < bb) {
            return -1;
        }
        if (aa > bb) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    return uniqueBigints(candidates);
}
function allPositiveDivisors(n, ctx) {
    if (n <= 0n) {
        return [1n];
    }
    const key = n.toString();
    const cached = ctx.divisorsCache.get(key);
    if (cached !== undefined) {
        return cached;
    }
    const fs = factorizePositiveBigint(n);
    const out = [];
    genDivisors(fs, 0, 1n, out);
    out.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    ctx.divisorsCache.set(key, out);
    return out;
}
function factorizePositiveBigint(n) {
    let m = n;
    const factors = [];
    let e2 = 0;
    while (m % 2n === 0n) {
        e2++;
        m /= 2n;
    }
    if (e2 > 0) {
        factors.push([2n, e2]);
    }
    let p = 3n;
    while (p * p <= m) {
        let e = 0;
        while (m % p === 0n) {
            e++;
            m /= p;
        }
        if (e > 0) {
            factors.push([p, e]);
        }
        p += 2n;
    }
    if (m > 1n) {
        factors.push([m, 1]);
    }
    return factors;
}
function genDivisors(factors, idx, acc, out) {
    if (idx >= factors.length) {
        out.push(acc);
        return;
    }
    const [p, e] = factors[idx];
    let pow = 1n;
    for (let i = 0; i <= e; i++) {
        genDivisors(factors, idx + 1, acc * pow, out);
        pow *= p;
    }
}
function uniqueBigints(ns) {
    const seen = new Set();
    const out = [];
    for (const n of ns) {
        const k = n.toString();
        if (seen.has(k)) {
            continue;
        }
        seen.add(k);
        out.push(n);
    }
    return out;
}
function powBigInt(a, n, ctx) {
    if (n < 0) {
        throw new Error('negative exponent not supported');
    }
    const key = `${a.toString()}^${n}`;
    const cached = ctx.powCache.get(key);
    if (cached !== undefined) {
        return cached;
    }
    const v = a ** BigInt(n);
    ctx.powCache.set(key, v);
    return v;
}
function solveOuterFromInner(p, h, r) {
    const hPows = new Array(r + 1);
    hPows[0] = [1n];
    for (let i = 1; i <= r; i++) {
        hPows[i] = bMultiply(hPows[i - 1], h);
    }
    let rem = p;
    const g = new Array(r + 1).fill(0n);
    const lcH = h[0];
    for (let i = r; i >= 0; i--) {
        const deg = i * bDegree(h);
        const num = coeffAtDegree(rem, deg);
        const den = lcH ** BigInt(i);
        if (den === 0n || num % den !== 0n) {
            return undefined;
        }
        const ci = num / den;
        g[r - i] = ci;
        if (ci !== 0n) {
            rem = bSubtract(rem, bMultiplyByConst(ci, hPows[i]));
        }
    }
    rem = bRemoveLeadingZeros(rem);
    if (rem.length !== 0) {
        return undefined;
    }
    return bRemoveLeadingZeros(g);
}
function coeffAtHighOffsetPower(h, r, offset) {
    if (offset < 0) {
        return 0n;
    }
    // If h(x) = sum a_i x^(s-i), then h(x)^r = x^(sr) * H(1/x)^r where
    // H(y)=sum a_i y^i. Coefficient at x^(sr-offset) is coefficient of
    // y^offset in H(y)^r.
    const a = new Array(offset + 1).fill(0n);
    const m = Math.min(offset, h.length - 1);
    for (let i = 0; i <= m; i++) {
        a[i] = h[i];
    }
    const p = powSeriesTruncLow(a, r, offset);
    return p[offset] ?? 0n;
}
function powSeriesTruncLow(a, n, maxDeg) {
    let e = n;
    let base = a.slice(0, maxDeg + 1);
    let acc = [1n];
    while (e > 0) {
        if (e & 1) {
            acc = mulSeriesTruncLow(acc, base, maxDeg);
        }
        e >>= 1;
        if (e > 0) {
            base = mulSeriesTruncLow(base, base, maxDeg);
        }
    }
    return acc;
}
function mulSeriesTruncLow(a, b, maxDeg) {
    const out = new Array(maxDeg + 1).fill(0n);
    const la = Math.min(a.length - 1, maxDeg);
    const lb = Math.min(b.length - 1, maxDeg);
    for (let i = 0; i <= la; i++) {
        if (a[i] === 0n) {
            continue;
        }
        const jMax = Math.min(lb, maxDeg - i);
        for (let j = 0; j <= jMax; j++) {
            if (b[j] === 0n) {
                continue;
            }
            out[i + j] += a[i] * b[j];
        }
    }
    return out;
}
function coeffAtDegree(p, deg) {
    const d = bDegree(p);
    const idx = d - deg;
    if (idx < 0 || idx >= p.length) {
        return 0n;
    }
    return p[idx] ?? 0n;
}
function subConst(p, c) {
    const r = p.slice();
    if (r.length === 0) {
        return r;
    }
    r[r.length - 1] -= c;
    return bRemoveLeadingZeros(r);
}
function properDivisors(n) {
    const ds = [];
    for (let d = 2; d * d <= n; d++) {
        if (n % d !== 0) {
            continue;
        }
        ds.push(d);
        const q = n / d;
        if (q !== d && q !== n) {
            ds.push(q);
        }
    }
    ds.sort((a, b) => a - b);
    return ds;
}
function canonicalizeStep(g, h) {
    let g_ = g;
    let h_ = h;
    // Normalize inner constant to zero via conjugation:
    // g(h(x)) = (g(u + c))(h(x) - c), where c = h(0).
    const c = h_[h_.length - 1] ?? 0n;
    if (c !== 0n) {
        h_ = subConst(h_, c);
        g_ = bCompose(g_, [1n, c]);
    }
    // Prefer positive inner leading coefficient using u -> -u.
    if (h_[0] < 0n) {
        h_ = bNegate(h_);
        g_ = bCompose(g_, [-1n, 0n]);
    }
    return { g: bRemoveLeadingZeros(g_), h: bRemoveLeadingZeros(h_) };
}
function getOptions(options) {
    return {
        ...DEFAULT_OPTIONS,
        ...options
    };
}
function newMemoContext() {
    return {
        powCache: new Map(),
        divisorsCache: new Map()
    };
}


;// ./src/composition/expansion/e-compose.ts


/**
 * Returns the polynomial composition `p(q(x))` over expansion coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
function eCompose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p) {
        r = eAdd(eMultiply(r, q), [c]);
    }
    return r;
}


;// ./src/division/double/divmod.ts





/**
 * Returns the quotient and remainder of Euclidean long division of `a` by `b`
 * over double coefficients, i.e. `a = b*q + r` with `degree(r) < degree(b)`.
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 */
function divmod(a, b) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    let q = [];
    let r = removeLeadingZeros(a);
    const d = degree(b);
    const c = b[0];
    while (true) {
        const deg = degree(r) - d;
        if (deg < 0) {
            return { q: removeLeadingZeros(q), r: removeLeadingZeros(r) };
        }
        const s = elevateDegree([r[0] / c], deg);
        q = add(q, s);
        r = subtract(r, multiply(s, b));
    }
}
function elevateDegree(p, deg) {
    if (deg <= 0 || p.length === 0) {
        return p;
    }
    return p.concat(new Array(deg).fill(0));
}


;// ./src/division/bigint/b-divmod.ts


/**
 * Returns quotient and remainder of trivial pseudo-division of `a` by `b`.
 *
 * The result satisfies `m*a = b*q + r` with `degree(r) < degree(b)`, where
 * `m = leadingCoeff(b)^(deg(a)-deg(b)+1)` (or its absolute value if
 * `positiveMultiplier === true`).
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 * @param positiveMultiplier if true, force a non-negative multiplier `m`
 */
function bDivmod(a, b, positiveMultiplier = false) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    const d = bDegree(a) - bDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a, m: 1n };
    }
    let m = b[0] ** BigInt(d);
    if (positiveMultiplier && m < 0n) {
        m = -m;
    }
    const { q, r } = bPdivTrivial(a, b, positiveMultiplier);
    return { q, r, m };
}


;// ./node_modules/big-float-ts/node/double-expansion/e-product.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const e_product_tp = twoProduct;
const e_product_multByDouble = scaleExpansion;
const e_product_compress = eCompress;
/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms an array of multiplicands
 */
function e_product_eProduct(term) {
    let product = term[0];
    for (let j = 1; j < term.length; j++) {
        const multiplicant = term[j];
        if (multiplicant.length == 1) {
            if (product.length === 1) {
                product = e_product_tp(product[0], multiplicant[0]);
            }
            else {
                product = e_product_multByDouble(product, multiplicant[0]);
            }
        }
        else if (product.length === 1) {
            product = e_product_multByDouble(multiplicant, product[0]);
        }
        else {
            product = mult(multiplicant, product);
        }
    }
    return e_product_compress(product);
    //return product;
}

//# sourceMappingURL=e-product.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-int-pow.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_pow_mult = expansionProduct;
const prod = e_product_eProduct;
/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    if (p === 2) {
        return e_int_pow_mult(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return prod(as);
}

//# sourceMappingURL=e-int-pow.js.map
;// ./node_modules/big-float-ts/node/double-representation/msb-exponent.js


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    // Will return e for all but subnormal numbers
    return getHighestSetBit(a) - 52 + e;
}

//# sourceMappingURL=msb-exponent.js.map
;// ./node_modules/big-float-ts/node/basic/reduce-significand.js
/**
 * Truncates a floating point value's significand and returns the result.
 * Similar to split, but with the ability to specify the number of bits to keep.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param a a double
 * @param bits the number of significand bits to leave intact
 */
function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}

//# sourceMappingURL=reduce-significand.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_bitlength_sign = eSign;
const e_to_bitlength_compress = eCompress;
/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = e_to_bitlength_compress(a);
    if (e_to_bitlength_sign(a) === 0) {
        return [0];
    }
    const maxMsb = msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        const msb_ = msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    const keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduceSignificand(b, keepBits);
    const result = a.slice(i);
    result[0] = b;
    return result;
}

//# sourceMappingURL=e-to-bitlength.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-div.js





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_div_mult = expansionProduct;
const toBitlength = eToBitlength;
const e_div_bitLength = expBitLength;
const diff = eDiff;
const estimate = eEstimate;
/**
 * Returns the result of a/b using Goldschmidt division.
 *
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the
 * result will be rounded to the longest bitlength between a and b.
 *
 * @param a the numerator
 * @param b the denominator
 *
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means double-double, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm)
 * then set expansionLength === 0 and an exact division will be done.
 */
// TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        const bitlengthN = e_div_bitLength(N_);
        const bitlengthD = e_div_bitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1 / estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = e_div_mult(N_, F);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = toBitlength(N_, resultBitlengthUpperBound);
                // TODO - below is just for testing - remove later
                //if (compare(mult(D, N_), N) !== 0) {
                //    console.log(mult(D, N_))
                //    throw new Error(`division in-exact - probably due to underflow, N: ${N}, D: ${D}, Result: ${N_}, product: ${mult(D, N_)}`); 
                //} 
                return N_;
            }
            // Returning only significant bits helps with sign determination later on.
            return N_.slice(N_.length - expansionLength, N_.length);
        }
        D_ = e_div_mult(D_, F);
        F = diff([2], D_);
        i *= 2;
    }
}

//# sourceMappingURL=e-div.js.map
;// ./src/euclidean-division-related/expansion/e-elevate-degree.ts
/**
 * Returns the result of elevating the given polynomial by the given degree.
 *
 * @param p
 * @param deg
 *
 * @internal
 */
function eElevateDegree(p, deg) {
    const p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push([0]);
    }
    return p_;
}


;// ./src/euclidean-division-related/expansion/e-pdiv-internal.ts






/**
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (a, b
 * both being polynomials) naively, i.e. in such a way that all intermediate
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the
 * remainder.
 *
 * * **precondition:** the coefficients must be integers; if they are not they
 * can easily be scaled from floating point numbers to integers by calling
 * [[scaleFloatsToBigints]] or similar before calling this function (recall that
 * all floating point numbers are rational).
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 *
 * @internal
 */
function ePdivInternal(a, b) {
    let q = [];
    const d = eDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = eDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        let s = [eDiv(r[0], c, 0)];
        s = eElevateDegree(s, deg);
        q = eAdd(q, s);
        r = eSubtract(r, eMultiply(s, b));
    }
}


;// ./src/euclidean-division-related/expansion/e-pdiv-trivial.ts





/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder`
 * of the pseudo division of `a/b` (a, b both being polynomials) in such a way
 * that all intermediate calculations and the final result are done in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 *
 * * **precondition:** the coefficients must integers (and also Shewchuk
 * floating point expansions); if they are not they can easily be scaled from
 * floating point numbers to Shewchuk expansions by calling [[scaleFloatsToInts]]
 * or similar before calling this function (recall that all floating point
 * numbers are rational).
 *
 * * Intermediate calculations (and the input coefficients) are done in
 * infinite precision up to overlow (meaning integers can be represented
 * *exactly* up to `2^1024 === 1797...(300 more digits)...37216`) and may
 * thus not be applicable to very high degree polynomials (in which case it is
 * better to use [[bPdivTrivial]])
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [trivial pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 * * see also [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 * * see also [subresultant pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Subresultant_pseudo-remainder_sequence)
 *
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of integer Shewchuk expansions from
 * highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier defaults to false - if set to true then the
 * multiplier (of the coefficients of the dividend)
 * `leadingCoeff(b)^(deg(a)-deg(b)+1)` will be
 * modified to `abs(leadingCoeff(b)^(deg(a)-deg(b)+1))`
 *
 * @doc
 */
function ePdivTrivial(a, b, positiveMultiplier = false) {
    // change to pseudo-remainder, i.e. not simply r = a; this allows the 
    // remainders to stay in 'Z', i.e. let m = leadingCoeff(b)^(deg(a)-deg(b)+1)
    const d = eDegree(a) - eDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a };
    }
    let m = eIntPow(b[0], d);
    m = positiveMultiplier
        ? eAbs(m)
        : m;
    const a_ = eMultiplyByConst(m, a);
    return ePdivInternal(a_, b);
}


;// ./src/division/expansion/e-divmod.ts



/**
 * Returns quotient and remainder of trivial pseudo-division of `a` by `b`.
 *
 * The result satisfies `m*a = b*q + r` with `degree(r) < degree(b)`, where
 * `m = leadingCoeff(b)^(deg(a)-deg(b)+1)` (or `abs(m)` if
 * `positiveMultiplier === true`).
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 * @param positiveMultiplier if true, force a non-negative multiplier `m`
 */
function eDivmod(a, b, positiveMultiplier = false) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    const d = eDegree(a) - eDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a, m: [1] };
    }
    let m = eIntPow(b[0], d);
    if (positiveMultiplier) {
        m = eAbs(m);
    }
    const { q, r } = ePdivTrivial(a, b, positiveMultiplier);
    return { q, r, m };
}


;// ./src/evaluate/double/vec-sum.ts

/**
 * * helper function
 *
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 *
 * @param x
 * @param K
 *
 * @internal
 */
function vecSum(p_) {
    const p = p_.slice();
    for (let i = 1; i < p.length; i++) {
        [p[i - 1], p[i]] = twoSum(p[i], p[i - 1]);
    }
    return p;
}


;// ./src/evaluate/double/sum-k.ts

/**
 * * helper function - K compensated vector sum
 *
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 *
 * @param x
 * @param K
 *
 * @internal
 */
function SumK(p, K) {
    for (let i = 1; i < K; i++) {
        p = vecSum(p);
    }
    let res = p[0];
    for (let i = 1; i < p.length; i++) {
        res += p[i];
    }
    return res;
}


;// ./src/evaluate/double/eft-horner.ts


/**
 * Returns an EFT (error free transformation) for the Horner evaluation of a
 * polymial at a specified x. The result is returned as an object with
 * properties: `r̂ ->` the calculated evaluation, `pπ` and `pσ` -> two polynomials
 * with coefficients around 2^53 times smaller than the input polynomial.
 *
 * * `r̂ + pπ(x) + pσ(x) ===` the *exact* evaluation (no error)
 *
 * * see [[1] Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [[2] *Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [[3] Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function EFTHorner(p, x) {
    //--------------------------------------------------------------------------
    // This is exactly *Algorithm 5* from [2] above
    //--------------------------------------------------------------------------
    const pπ = []; // A polynomial containing part of the error
    const pσ = []; // Another polynomial containing part of the error
    let σ;
    let r̂ = p[0];
    for (let i = 1; i < p.length; i++) {
        const [π, pi] = twoProduct(r̂, x);
        [σ, r̂] = twoSum(pi, p[i]);
        // inlined
        //r̂ = pi + p[i]; const bv = r̂ - pi; σ = (pi - (x-bv)) + (p[i]-bv);
        pπ.push(π);
        pσ.push(σ);
    }
    return { r̂, pπ, pσ };
}
// inlined
//const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];    for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); } return { r̂, pπ, pσ }


;// ./src/evaluate/double/eft-horner-k.ts

/**
 * @param p
 * @param x
 * @param K
 *
 * @internal
 */
function EFTHornerK(p, x, K) {
    const ps = [p];
    const hs = [];
    const card = (2 ** K) - 1; // size of the tree, i.e. cardinality of the nodes
    for (let i = 0; i < card; i++) {
        const { r̂, pπ, pσ } = EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    return { hs, ps: ps.slice(2 ** (K - 1)) };
}


;// ./src/evaluate/double/horner.ts
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method in double precision floating point arithmetic.
 *
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * * the worst-case forward error bound for Horner's method is explicitly given
 * by: |P(x) - P̂(x)| ≤ (2d·u / (1-2d·u)) ∑ᵢ₌₀ⁿ |aᵢ| |x|ⁱ, i.e.
 * by: |P(x) - P̂(x)| ≤ γ(2d) ∑ᵢ₌₀ⁿ |aᵢ| |x|ⁱ where d is the degree of the polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function Horner(p, x) {
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * x + p[i];
    }
    return q;
}
// inlined (with q => E, p => p0)
//let E = p0[0]; for (let i=1; i<p0.length; i++) {E = E*x + p0[i]; }


;// ./src/evaluate/double/comp-horner-k.ts



/**
 * Returns a result of evaluating a univariate polynomial using K times compensated
 * Horner's method.
 *
 * * K times compensated means the error in the evaluation is reduced by roughly
 * `(1 / Number.EPSILON)**K` which is again roughly `2^(53*K)` - it is the same as using
 * double-double-.... (K times) precision in a normal Horner evaluation
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, `Stef Graillat, Philippe Langlois, Nicolas Louvet`](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * * for K-times compensated with K <= 4 this is the fastest known method, but
 * the running time grows exponentially with K.
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param K (K - 1) === the number of compensations to do
 *
 * @doc
 */
function CompHornerK(p, x, K) {
    K = Math.min(p.length - 1, K);
    const { hs, ps } = EFTHornerK(p, x, K);
    const leafStart = 2 ** (K - 1); // cardinality and start of the leaves
    for (let i = 0; i < leafStart; i++) {
        hs.push(Horner(ps[leafStart + i], x));
    }
    const r̄ = SumK(hs, K);
    return r̄;
}


;// ./src/error-analysis/condition-number.ts


/**
 * Returns an accurate estimate (K === 4 => double-double-double-double
 * precision) of the condition number of the given polynomial when evaluated at
 * a given point.
 *
 * * **for testing purposes**
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function conditionNumber(p, x) {
    const pN = absCoeff(p);
    const pD = p;
    const N = CompHornerK(pN, x, 4);
    const D = Math.abs(CompHornerK(pD, x, 4));
    return Math.abs(N / D);
}


;// ./node_modules/double-double/node/double-representation/double-to-octets.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 * @internal
 */
function double_to_octets_doubleToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
}

//# sourceMappingURL=double-to-octets.js.map
;// ./node_modules/double-double/node/double-representation/parse-double.js
/* unused harmony import specifier */ var parse_double_doubleToBinaryString;
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 ha been subtracted) and the
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */
function parse_double_parseDouble(x) {
    const parts = double_to_octets_doubleToOctets(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 0b0111_1111) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 0b0000_1111) + hiddenMsb;
    return {
        sign,
        exponent,
        significand
    };
}
/**
 * Returns the relevant parts of the given IEEE-754 double.
 * See https://github.com/bartaz/ieee754-visualization.
 * This is a slower version of parseDouble that gives binary string
 * representations of the components.
 */
function parse_double_parseDoubleDetailed(x) {
    const str = parse_double_doubleToBinaryString(x);
    // sign{1} exponent{11} fraction{52} === 64 bits (+1 hidden!)
    const [, sign, exponent, significand] = str.match(/^(.)(.{11})(.{52})$/);
    const exponent_ = parseInt(exponent, 2);
    const hidden = exponent_ === 0 ? "0" : "1";
    return {
        full: sign + exponent + hidden + significand,
        sign,
        exponent,
        hidden,
        significand
    };
}

//# sourceMappingURL=parse-double.js.map
;// ./src/error-analysis/get-ulp.ts

/**
 * Returns the unit in the last place (ulp) value of the given number.
 *
 * * not optimized; use in tests only!
 *
 * @param x
 */
function getUlp(x) {
    // ULP is only defined for finite IEEE-754 numbers.
    if (!Number.isFinite(x)) {
        return Number.NaN;
    }
    const { exponent: exp } = parse_double_parseDouble(x);
    const r = 2 ** (exp - 52);
    return r;
}


;// ./src/util/sum.ts
/**
 * Returns the sum of an array of doubles.
 *
 * @param vs
 */
function sum(vs) {
    let sum = 0;
    for (let i = 0; i < vs.length; i++) {
        sum += vs[i];
    }
    return sum;
}


;// ./src/error-analysis/is-exact-power-of-2.ts


/**
 * Returns `true` if `n` is an exact power of 2, i.e. if there exists an
 * integer `k` such that `n === 2^k`.
 *
 * @param n
 */
function isExactPowerOf2(n) {
    const { sign, exponent: exp, significand: sig } = parse_double_parseDouble(n);
    if (n === 0 || Number.isNaN(n) || !Number.isFinite(n) || sign === 1) {
        return false;
    }
    if (sig[0] === 16 && sum(sig) === 16) {
        return true; // not a subnormal number and a power of 2
    }
    let idx = -1;
    for (let i = 0; i < sig.length; i++) {
        if (sig[i] !== 0) {
            if (idx !== -1) {
                return false; // more than one non-zero significand limb
            }
            idx = i;
        }
    }
    // check if the single non-zero limb is a power of 2
    return (sig[idx] & (sig[idx] - 1)) === 0;
}


;// ./src/error-analysis/is-subnormal.ts
const { abs: is_subnormal_abs } = Math;
const MIN_NON_SUBNORMAL = 2.2250738585072014e-308; // === 2**-1022
function isSubnormal(n) {
    return (!Number.isNaN(n) &&
        Number.isFinite(n) &&
        n !== 0 &&
        is_subnormal_abs(n) < MIN_NON_SUBNORMAL);
}


;// ./src/error-analysis/nextup.ts


/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup2` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - -Number.MIN_VALUE => -0 (since `getUlp(5e-324)/2 === 0`)
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
function nextup(n) {
    if (Number.isNaN(n)) {
        return Number.NaN;
    }
    if (n === Infinity) {
        return Infinity;
    }
    if (n === -Infinity) {
        return -Number.MAX_VALUE;
    }
    if (n === 0) {
        return Number.MIN_VALUE;
    }
    if (n === -Number.MIN_VALUE) {
        return -0;
    } // since `getUlp(5e-324)/2 === 0`
    const r = n < 0 && isExactPowerOf2(-n)
        ? n + getUlp(n) / 2
        : n + getUlp(n);
    return r;
}
/**
 * Returns the next representable floating-point number greater than
 * `n` toward `+Infinity`.
 *
 * * identical to `nextup` but with different implementation
 *
 * * For most numbers, this adds one unit in the last place (ulp) to the given
 * number, but there are some special cases, they are:
 *   - `Infinity` => `Infinity`,
 *   - `NaN` => `NaN`,
 *   - `-0` => `Number.MIN_VALUE`,
 *   - `+0` => `Number.MIN_VALUE`,
 *   - `-Infinity` => `-Number.MAX_VALUE`
 *   - `Number.MAX_VALUE => Infinity`
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */
function nextup2(x) {
    if (Number.isNaN(x)) {
        return Number.NaN;
    }
    if (x === Infinity) {
        return Infinity;
    }
    if (x === -Infinity) {
        return -Number.MAX_VALUE;
    }
    if (x === 0) {
        return Number.MIN_VALUE;
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, x, false);
    let bits = view.getBigUint64(0, false);
    bits = x > 0 ? bits + 1n : bits - 1n;
    view.setBigUint64(0, bits, false);
    return view.getFloat64(0, false);
}


;// ./src/error-analysis/nextdown.ts

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


;// ./node_modules/squares-rng/node/index.js
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
//const isNode = new Function("try {return this===global;}catch(e){return false;}");
const base64ToArrayBuffer = isBrowser()
    ? browserBase64ToArrayBuffer
    : nodeBase64ToArrayBuffer;
const arrayBuffer = base64ToArrayBuffer(
// The WASM code (from .wasm file) that is Base64 encoded
`AGFzbQEAAAABBgFgAX8BfAMDAgAABQMBAAAHHwMGbWVtb3J5AgAHc3F1YXJlcwAA\
CHNxdWFyZXM0AAEKjgECPwECfiAArULHuuXf9tjQm2p+IgEgASABfnxCIIoiAiAC\
fiABQse65d/22NCbanx8QiCKIgIgAn4gAXxCIIi6C0wBAn4gAK1Cx7rl3/bY0Jtq\
fiIBQse65d/22NCbanwiAiABIAIgASABIAF+fEIgiiIBIAF+fEIgiiIBIAF+fEIg\
iiIBIAF+fEIgiLoL`);
const $module$ = new WebAssembly.Module(arrayBuffer);
const $instance$ = new WebAssembly.Instance($module$);
const squares = $instance$.exports.squares;
const squares4 = $instance$.exports.squares4;
/** From https://stackoverflow.com/a/21797381 */
function browserBase64ToArrayBuffer(base64) {
    const str = window.atob(base64);
    const len = str.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}
function nodeBase64ToArrayBuffer(base64) {
    return toArrayBuffer(Buffer.from(base64, 'base64'));
}
/** From https://stackoverflow.com/a/12101012 */
function toArrayBuffer(buffer) {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

//# sourceMappingURL=index.js.map
;// ./src/error-analysis/random.ts

/**
 * Returns a random number in [0,1) using `Math.random()` or a custom RNG based
 * on the `squares-rng` library.
 *
 * @param rngIdx optional; index for the custom RNG
 */
function random(rngIdx) {
    if (rngIdx === undefined) {
        return Math.random();
    }
    return (squares(2 * rngIdx) + squares(2 * rngIdx + 1) * 2 ** -32) * 2 ** -32;
}


;// ./src/error-analysis/random-int-in-range.ts


const { round } = Math;
/**
 * Returns a random integer in the range `[minV, maxV]`
 *
 * * range includes its endpoints
 *
 * @param minV
 * @param maxV
 * @param rngIdx
 *
 * * **not optimized**; **use in tests only!**
 */
function randomIntInRange(minV, maxV, rngIdx) {
    const terms = [];
    const range = maxV - minV + 1;
    for (let i = 0; i < 32; i++) {
        const rand = random(rngIdx !== undefined ? 32 * rngIdx + i : undefined);
        const v = round(rand / (Number.EPSILON / 2)) % (2 ** 32);
        const multiplier = 2 ** (32 * i);
        if (multiplier > range) {
            break;
        }
        terms.push(multiplier * v);
    }
    return (sum(terms) % range) + minV;
}


;// ./src/euclidean-division-related/bigint/b-inverse-mod-p.ts
/**
 * Returns the multiplicative inverse of `a` modulo `p`.
 *
 * * see also the function `bXgcd`
 */
function bInverseModP(a, p) {
    let oldR = a;
    let r = p;
    let oldS = 1n;
    let s = 0n;
    while (r !== 0n) {
        const q = oldR / r;
        [oldR, r] = [r, oldR - q * r];
        [oldS, s] = [s, oldS - q * s];
    }
    return oldS;
}

// Quokka tests
// bInverseModP(3n, 11n);//?

;// ./src/gcd/bigint/b-mod.ts
/**
 * Returns the least non-negative residue of `a` modulo `m`.
 */
function bMod(a, m) {
    const r = a % m;
    return r < 0n ? r + m : r;
}


;// ./src/euclidean-division-related/bigint/b-pdiv-mod-p.ts







function modPoly(p_, p) {
    return bRemoveLeadingZeros(p_.map(c => bMod(c, p)));
}
/**
 * Returns the `quotient` and `remainder` of the division of `a/b` (`a`, `b`
 * both being polynomials), i.e. performs Euclidean (i.e. long) division on
 * the two given polynomials, a/b, and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`.
 *
 * * calculations are done in `ℤ_p`, i.e. modulo the prime `p`.
 *
 * * **precondition:** `b !== []`, i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial `b` in the formula `a = bq + r`
 *
 * @internal
 */
function bPdivModP(a, b, p) {
    let q = [];
    b = modPoly(b, p);
    const d = bDegree(b);
    const c = b[0];
    let r = modPoly(a, p);
    while (true) {
        const deg = bDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // multiplicative inverse of leading coefficient of b
        const lcBInv = bInverseModP(c, p);
        const s = [bMod(r[0] * lcBInv, p), ...Array(deg).fill(0n)];
        q = modPoly(bAdd(q, s), p);
        r = modPoly(bSubtract(r, bMultiply(s, b)), p);
    }
}

// Quokka tests
// bPdivModP([1n, 0n, 1n], [1n, 1n], 5n);  /*?*/  // => { q: [1n, 4n], r: [2n] }
// bPdivModP([1n, 2n, 3n], [1n, 1n], 5n);  /*?*/  // => { q: [1n, 1n], r: [2n] }
// bPdivModP(
//     bMultiply([1000n, 2000n, 3000n], [1234n, 5678n])
//     .map(c => bMod(c, 101n)), [1234n, 5678n], 101n
// );  /*?*/  // => { q: [91n, 81n, 71n], r: [] }
// bPdivModP([1n, 0n, -1n], [1n, -1n], 5n);  /*?*/  // => { q: [1n, 1n], r: [] }

;// ./src/factor/bigint/b-content.ts

/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the
 * greatest common divisor of its coefficients.
 *
 * * the sign is chosen such that dividing the polynomial by cont(p) will
 * always result in a positive leading coefficient
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bContent(p) {
    if (p.length === 0) {
        // the zero polynomial
        return 1n;
    }
    return p[0] < 0n ? -bGcdInts(p) : bGcdInts(p);
}


;// ./src/factor/bigint/b-primitive-part.ts

/**
 * Returns the primitive part of the given polynomial.
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bPrimitivePart(p) {
    const c = bContent(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}


;// ./src/euclidean-division-related/bigint/b-prem-sequence-primitive.ts


/**
 * Returns the primitive pseudo remainder sequence of `a/b`.
 *
 * * **precondition:** `g !== []`, i.e. unequal to the zero polynomial.
 *
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 *
 * @param f the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial `b` in the formula `a = bq + r`
 *
 * @doc
 */
function bPremSequencePrimitive(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = bPdivTrivial(r[i - 1], r[i]).r;
        r_ = bPrimitivePart(r_);
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// ./src/euclidean-division-related/bigint/b-prem-sequence-subresultant.ts


/**
 * Returns the subresultant pseudo remainder sequence of `a/b`.
 *
 * * **precondition:** `g !== []`, i.e. unequal to the zero polynomial.
 *
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 * @param sturm if set to true then calculate a Sturm sequence instead
 *
 * @doc
 */
function bPremSequenceSubresultant(f, g, sturm = false) {
    const r = [f, g]; // Initialize the PRS
    const d = [bDegree(f), bDegree(g)];
    const a = [1n]; // a_1 === 1
    const c = [1n]; // c_1 === 1
    let i = 1;
    while (true) {
        a.push(r[i][0]); // leading coefficient of r[i-1]
        const d_ = d[i - 1] - d[i];
        const bD_ = BigInt(d_);
        const sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        const D = a[i - 1] * c[i - 1] ** bD_;
        const exp = -bD_ + 1n;
        const cTerm1 = a[i] ** bD_;
        const cTerm2 = c[i - 1] ** (exp < 0n ? -exp : exp);
        c.push(exp < 0
            ? cTerm1 / cTerm2
            : cTerm1 * cTerm2);
        let r_ = bPdivTrivial(r[i - 1], r[i], sturm).r
            .map(coeff => coeff / D);
        r_ = sgn > 0 ? r_ : r_.map(c => -c);
        d.push(bDegree(r_));
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// ./src/euclidean-division-related/bigint/b-prem-sequence-trivial.ts

/**
 * ❗ DON'T USE - coefficients grow way too big, making it slow - use
 * [[bPremSequenceSubresultant]] instead. ❗
 *
 * Returns the trivial pseudo remainder sequence of `a/b`.
 *
 * * **precondition:** `g !== []`, i.e. unequal to the zero polynomial.
 *
* * see [Trivial Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
function bPremSequenceTrivial(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        const r_ = bPdivTrivial(r[i - 1], r[i]).r;
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// ./src/euclidean-division-related/bigint/b-sturm-chain.ts


/**
 * Returns the **Sturm Chain** for the given polynomial using pseudo remainders.
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bSturmChain([-3n,4n,2n,-2n]); //=> [[-3n, 4n, 2n, -2n], [-9n, 8n, 2n], [-204n, 138n], [-1692n]]
 * ```
 *
 * @doc
 */
function bSturmChain(p) {
    const dp = bDifferentiate(p);
    return bPremSequenceSubresultant(p, dp, true);
}


;// ./src/euclidean-division-related/expansion/e-prem-sequence-subresultant.ts







/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
 * * **precondition:** the coefficients must be integer Shewchuk floating point
 * expansions; if they are not they can easily be scaled from
 * floating point numbers to Shewchuk expansions by calling [[scaleFloatsToInts]]
 * or similar before calling this function (recall that all floating point
 * numbers are rational).
 *
 * * Intermediate calculations (and the input coefficients) are done in
 * infinite precision up to overlow (meaning integers can be represented
 * *exactly* up to `2^1024 === 1797...(300 more digits)...37216`) and may
 * thus not be applicable to very high degree polynomials (in which case it is
 * better to use [[bPremSequenceSubresultant]])
 *
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of integer Shewchuk expansions from
 * highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r
 * @param sturm if set to true then calculate a Sturm sequence instead
 *
 * @doc
 */
function ePremSequenceSubresultant(f, g, sturm = false) {
    const r = [f, g]; // Initialize the PRS
    const d = [eDegree(f), eDegree(g)];
    const a = [[1]]; // a_1 === 1
    const c = [[1]]; // c_1 === 1
    let i = 2;
    while (true) {
        a.push(r[i - 1][0]); // leading coefficient of r[i-1]
        const d_ = d[i - 2] - d[i - 1];
        const sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        const D = expansionProduct(a[i - 2], eIntPow(c[i - 2], d_));
        const exp = -d_ + 1;
        const cTerm1 = eIntPow(a[i - 1], d_);
        const cTerm2 = eIntPow(c[i - 2], Math.abs(exp));
        c.push(exp < 0
            ? eDiv(cTerm1, cTerm2, 0)
            : expansionProduct(cTerm1, cTerm2));
        let r_ = ePdivTrivial(r[i - 2], r[i - 1], sturm).r
            .map(coeff => eDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(eNegativeOf);
        d.push(eDegree(r_));
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (eIsConstOrZero(r_)) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// ./src/euclidean-division-related/double/prem-sequence-subresultant.ts

/**
 * Returns the subresultant pseudo remainder sequence of a/b with the resulting
 * polynomials given with coefficients as Shewchuk expansions.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
 * * Intermediate calculations are done in infinite precision up to
 * overlow (meaning integers can be represented *exactly* up to
 * `2^1024 === 1797...(300 more digits)...37216`) and may
 * thus not be applicable to very high degree polynomials (in which case it is
 * better to use [[bPremSequenceSubresultant]])
 *
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of double precision floating point numbers
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 * @param sturm if set to true then calculate a Sturm sequence instead
 *
 * @doc
 */
function premSequenceSubresultant(f, g, sturm = false) {
    return ePremSequenceSubresultant(f.map(c => [c]), g.map(c => [c]), sturm);
}


;// ./src/euclidean-division-related/double/sturm-chain.ts


/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders
 * with the resulting polynomials given with coefficients as Shewchuk
 * expansions.
 *
 * * intermediate calculations use Shewchuk expansions and the final result is
 * given as an array of polynomials with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * sturmChain([-3,4,2,-2]); //=> [[[-3],[4],[2],[-2]],[[-9],[8],[2]],[[-204],[138]],[[-1692]]]
 * ```
 *
 * @doc
 */
function sturmChain(p) {
    // convert from double precision to Shewchuk expansion
    const p_ = p.map(c => [c]);
    const dp = eDifferentiate(p_);
    return ePremSequenceSubresultant(p_, dp, true);
}


;// ./src/factor/expansion/e-content.ts



/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the
 * greatest common divisor of its coefficients.
 *
 * * the sign is chosen such that dividing the polynomial by cont(p) will
 * always result in a positive leading coefficient
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eContent(p) {
    if (p.length === 0) {
        // the zero polynomial
        return [1];
    }
    return eSign(p[0]) < 0 ? eNegativeOf(eGcdInts(p)) : eGcdInts(p);
}


;// ./src/factor/expansion/e-primitive-part.ts


/**
 * Returns the primitive part of the given polynomial.
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function ePrimitivePart(p) {
    const c = eContent(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(eDiv(p[i], c, 0));
    }
    return p_;
}


;// ./src/euclidean-division-related/expansion/e-prem-sequence-primitive.ts


/**
 * Returns the primitive pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of Shewchuk expansions from highest to
 * lowest power, e.g. `[[5],[-3],[0]]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
function ePremSequencePrimitive(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = ePdivTrivial(r[i - 1], r[i]).r;
        r_ = ePrimitivePart(r_);
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// ./src/euclidean-division-related/expansion/e-sturm-chain.ts



/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders.
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eSturmChain([[-3],[4],[2],[-2]]); //=> [[[-3],[4],[2],[-2]],[[-9],[8],[2]],[[-204],[138]],[[-1692]]]
 * ```
 *
 * @doc
 */
function eSturmChain(p) {
    p = scaleFloatssToIntss(p);
    const dp = eDifferentiate(p);
    return ePremSequenceSubresultant(p, dp, true);
}


;// ./src/evaluate/bigint/b-horner.ts
/**
 * Returns the result of evaluating (at an integer value) a univariate
 * polynomial with bigint coefficients using Horner's method.
 *
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function bHorner(p, x) {
    let q = 0n;
    for (let i = 0; i < p.length; i++) {
        q = q * x + p[i];
    }
    return q;
}


;// ./src/evaluate/bigint/b-evaluate-at-0.ts
/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bEvaluateAt0([3n,2n,99n]); //=> 99n
 * ```
 *
 * @doc
 */
function bEvaluateAt0(p) {
    return p.length === 0 ? 0n : p[p.length - 1];
}


;// ./src/evaluate/bigint/b-evaluate-at-1.ts
/**
 * Returns the exact result of evaluating the given polynomial at 1.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bEvaluateAt1(p) {
    let res = 0n;
    for (let i = 0; i < p.length; i++) {
        res += p[i];
    }
    return res;
}


;// ./src/evaluate/double/abs-horner.ts
const abs_horner_abs = Math.abs;
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method and where:
 *  1. the absolute value of each coefficient is taken
 *  2. the absolute value of `x` is taken
 *
 * * i.e. P(x) = ∑ᵢ₌₀ⁿ |aᵢ| |x|ⁱ
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which `p` should be evaluated
 *
 * @doc
 */
function AbsHorner(p, x) {
    const _x = abs_horner_abs(x);
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * _x + abs_horner_abs(p[i]);
    }
    return q;
}
// inlined (with q => e2, p => p0)
//let e2 = abs(p0[0]); for (let i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }


;// ./src/evaluate/double/horner-sum.ts
/**
 * * helper function
 *
 * @param p1
 * @param p2
 *
 * @internal
 */
function HornerSum(p1, p2, a) {
    let result = 0;
    for (let i = 0; i < p1.length; i++) {
        result = p1[i] + p2[i] + result * a;
    }
    return result;
}


;// ./src/evaluate/double/horner-abs-sum.ts
const { abs: horner_abs_sum_abs } = Math;
/**
 * * used in algorithms within [2] below, see e.g. eq. (7) and (8) in that paper.
 *
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * * see [[1] Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [[2] *Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [[3] Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @internal
 */
function HornerAbsSum(p1, p2, x) {
    //--------------------------------------------------------------------------
    // This is used in algorithms in [2] above
    //--------------------------------------------------------------------------
    let q = 0;
    for (let i = 0; i < p1.length; i++) {
        // NOTE: The line below should **NOT** be `abs(p1[i]) + abs(p2[i])` as
        // one would expect, see [2] above eq. (7).
        q = horner_abs_sum_abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}


;// ./src/evaluate/double/comp-horner-is-faithful.ts





const comp_horner_is_faithful_u = Number.EPSILON;
/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a dynamic check for faithfull rounding and a
 * certified running error bound.
 *
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is the same as using
 * double-double precision in a normal Horner evaluation
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function compHornerIsFaithful(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    const ĉ = HornerSum(pπ, pσ, x);
    const [e, r̄] = twoSum(r̂, ĉ);
    const b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
    const α̂ = (γs(2 * n - 1) * b̂) / ((1 - 2 * (n + 1) * comp_horner_is_faithful_u));
    const β̂ = (α̂ + Math.abs(e)) / (1 - 2 * comp_horner_is_faithful_u);
    return {
        isFaithful: α̂ < (comp_horner_is_faithful_u / 2) * Math.abs(r̄),
        errBound: β̂,
        r̄
    };
}


;// ./src/evaluate/double/comp-horner-with-running-error.ts





const { abs: comp_horner_with_running_error_abs } = Math;
/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound as an array in the
 * form: [result, max absolute error].
 *
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
 *
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is the same as using
 * double-double precision in a normal Horner evaluation
 *
 * * see [[1] Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [[2] *Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [[3] Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function compHornerWithRunningError(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    // inlined
    //const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];    for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
    const ĉ = HornerSum(pπ, pσ, x);
    const [e, r̄] = twoSum(r̂, ĉ);
    const b̂ = HornerAbsSum(pπ, pσ, comp_horner_with_running_error_abs(x));
    const α̂ = b̂ * γs(2 * n - 1) / (1 - 2 * (n + 1) * u); // [2] Eq. (20)
    const β̂ = (α̂ + comp_horner_with_running_error_abs(e)) / (1 - 2 * u);
    return [r̄, β̂];
}


;// ./src/evaluate/double/comp-horner.ts


/**
 * Returns a result of evaluating a univariate polynomial using once compensated
 * Horner's method.
 *
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is equivalent as using
 * double-double precision in a normal Horner evaluation
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function compHorner(p, x) {
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    const ĉ = HornerSum(pπ, pσ, x);
    return r̂ + ĉ;
}


;// ./src/evaluate/double/horner-with-running-error.ts

const { abs: horner_with_running_error_abs } = Math;
/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound as an array in the form `[r,e]` where `r` is the result
 * of the evaluation and `e` is the error.
 *
 * * the error bound can also be calculated as `γ(2d) * AbsHorner(p,x)` but
 *   the running error bound is considerably tighter (about 20x typically)
 *
 * * see e.g. page 95 (at bottom) of [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function hornerWithRunningError(p, x) {
    const _x = horner_with_running_error_abs(x);
    let r̂ = p[0];
    let e = horner_with_running_error_abs(r̂) * 0.5;
    for (let i = 1; i < p.length; i++) {
        r̂ = r̂ * x + p[i];
        e = e * _x + horner_with_running_error_abs(r̂);
    }
    e = u * (2 * e - horner_with_running_error_abs(r̂));
    return [r̂, e];
}


;// ./src/evaluate/double/eval-certified.ts





const { abs: eval_certified_abs } = Math;
const eval_certified_1 = γ(1);
const γ2 = γ(2);
/**
 * Returns the result of evaluating the given polynomial (with specified
 * coefficient-wise error bounds) at x such that the sign is correct when
 * positive or negative and undecided when 0 - an additional `multiplier`
 * parameter can enforce additional bits (beyond the sign) to be correct.
 *
 * * designed to be fast in 'easy' cases (say condition number < 2^53) and
 * harder cases (condition number < 2^106) since nearly all typical
 * calculations will have condition number < 2^106
 * * a staggered approach is used - first double precision, then simulated
 * double-double precision (i.e. once compensated Horner evluation) is tried
 * before giving up and returning 0 - see point below
 * * if zero is returned then the calculated result is too close to 0 to
 * determine the sign; the caller of this function can then resort to a more
 * accurate (possibly exact) evaluation
 *
 * @param p an array of 2 polynomials with coefficients given densely as an
 * array of double precision floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`;
 * the first polynomial's coefficients represent the 'high part' (a double) of a
 * double-double precision value, while the second polynomial's coefficients
 * represent the 'low part', i.e. designating `hp` for high part and `lp` for
 * low part it must be that they are non-overlapping -> `twoSum(lp,hp)` will
 * equal `[lp,hp]`; put another way, if the given polynomial is given as e.g. a
 * linear polynomial with coefficients in double precision,
 * e.g. `[[1.7053025658242404e-13, 2354.33721613], [-7.105427357601002e-15,284.5673337]]`
 * then this parameter, `p`, should be `[[2354.33721613], 284.5673337], [1.7053025658242404e-13, -7.105427357601002e-15]]`
 * which is simply the result of transposing the original polynomial if it is
 * seen as a matrix
 * @param pE defaults to `undefined`; an error polynomial that provides a
 * coefficient-wise error bound on the input polynomial; all coefficients must
 * be positive; if `undefined` then the input polynomial will be assumed exact
 * @param x the value at which to evaluate the polynomial
 * @param multiplier defaults to 1; the final calculation error needs to be a
 * multiple of this number smaller than the evaluated value, otherwise zero is
 * returned - useful if not only the sign is important but also some bits, e.g.
 * if multiplier = 8 then 3 bits will have to be correct otherwise 0 is returned
 *
 * @doc
 */
function evalCertified(p, x, pE = undefined, multiplier = 1) {
    const p0 = p[0];
    // first do a fast evaluation
    const [r, e1] = hornerWithRunningError(p0, x);
    // inlined above line:
    //const r = p0[0]; const e1 = Math.abs(r) / 2; for (const i=1; i<p0.length; i++) { r = r*x + p0[i]; e1 = Math.abs(x)*e1 + Math.abs(r); } e1 = Number.EPSILON * (2*e1 - Math.abs(r));
    /** the error due to not considering p[1] */
    const e2 = γ2 * AbsHorner(p0, x);
    // inlined above line:
    //const e2 = abs(p0[0]); for (const i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }
    /** error due to imprecision in coefficients */
    // the line below was changed due to negative values of x now also allowed
    const E = pE !== undefined ? Horner(pE, eval_certified_abs(x)) : 0;
    //const E = p0[0]; for (const i=1; i<p0.length; i++) {E = E*x + p0[i]; }
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < Math.abs(r)) {
        // we are within bounds
        return r;
    }
    // error is too large - do a more precise evaluation (i.e. once compensated
    // with K === 2)
    const EFTHorner_ = EFTHorner(p0, x);
    const { pπ, pσ } = EFTHorner_;
    let { r̂ } = EFTHorner_;
    const [C1, c1] = hornerWithRunningError(pπ, x);
    const [C2, c2] = hornerWithRunningError(pσ, x);
    const [C3, c3] = hornerWithRunningError(p[1], x);
    // typically: c1,c2 < c3 < E
    let e = (c1 + c2 + c3) + E;
    // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    r̂ = (C1 + C2 + C3) + r̂;
    e += eval_certified_1 * r̂;
    if (e * multiplier < Math.abs(r̂)) {
        return r̂;
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return 0;
}


;// ./src/evaluate/double/eval-certified-incl-error.ts





const { abs: eval_certified_incl_error_abs } = Math;
const eval_certified_incl_error_1 = γ(1);
const eval_certified_incl_error_2 = γ(2);
/**
 * Returns the result of evaluating the given polynomial (with specified
 * coefficient-wise error bounds) at `x` such that the sign is correct when
 * positive or negative and undecided when 0 - an additional `multiplier`
 * parameter can enforce additional bits (beyond the sign bit) to be correct.
 *
 * * designed to be fast in 'easy' cases (say condition number < 2^53) and
 * harder cases (condition number < 2^106) since nearly all typical
 * calculations will have condition number < 2^106
 * * a staggered approach is used - first double precision, then simulated
 * double-double precision (i.e. once compensated Horner evluation) is tried
 * before giving up and returning 0 - see point below
 * * if zero is returned then the calculated result is too close to 0 to
 * determine the sign; the caller of this function can then resort to a more
 * accurate (possibly exact) evaluation
 *
 * @param p an array of 2 polynomials with coefficients given densely as an
 * array of double precision floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`;
 * the first polynomial's coefficients represent the 'high part' (a double) of a
 * double-double precision value, while the second polynomial's coefficients
 * represent the 'low part', i.e. designating `hp` for high part and `lp` for
 * low part it must be that they are non-overlapping -> `twoSum(lp,hp)` will
 * equal `[lp,hp]`; put another way, if the given polynomial is given as e.g. a
 * linear polynomial with coefficients in double precision,
 * e.g. `[[1.7053025658242404e-13, 2354.33721613], [-7.105427357601002e-15,284.5673337]]`
 * then this parameter, `p`, should be `[[2354.33721613], 284.5673337], [1.7053025658242404e-13, -7.105427357601002e-15]]`
 * which is simply the result of transposing the original polynomial if it is
 * seen as a matrix
 * @param pE defaults to `undefined`; an error polynomial that provides a
 * coefficient-wise error bound on the input polynomial; all coefficients must
 * be positive; if `undefined` then the input polynomial will be assumed exact
 * @param x the value at which to evaluate the polynomial
 * @param multiplier defaults to 1; the final calculation error needs to be a
 * multiple of this number smaller than the evaluated value, otherwise zero is
 * returned - useful if not only the sign is important but also some bits, e.g.
 * if multiplier = 8 then 3 bits will have to be correct otherwise 0 is returned
 *
 * @doc
 */
function evalCertifiedInclError(p, x, pE = undefined, multiplier = 1) {
    // first do a fast evaluation
    const [r, e1] = hornerWithRunningError(p[0], x);
    // the line below was changed due to negative values of x now also allowed
    const e2 = eval_certified_incl_error_2 * AbsHorner(p[0], x); // the error due to not considering p[1]
    // error due to imprecision in coefficients
    // the line below was changed due to negative values of x now also allowed
    //const E = pE ? Horner(pE, x) : 0; 
    const E = pE !== undefined
        ? Horner(pE, eval_certified_incl_error_abs(x))
        : 0;
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < eval_certified_incl_error_abs(r)) {
        // we are within bounds
        return { r̂: r, e: ee };
    }
    // error is too large - do a more precise evaluation
    const EFTHorner_ = EFTHorner(p[0], x);
    const { pπ, pσ } = EFTHorner_;
    let { r̂ } = EFTHorner_;
    const [C1, c1] = hornerWithRunningError(pπ, x);
    const [C2, c2] = hornerWithRunningError(pσ, x);
    const [C3, c3] = hornerWithRunningError(p[1], x);
    let e = (c1 + c2 + c3) + E; // typically: c1,c2 < c3 < E
    r̂ = (C1 + C2 + C3) + r̂; // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    e += eval_certified_incl_error_1 * r̂;
    if (e * multiplier < eval_certified_incl_error_abs(r̂)) {
        return { r̂, e };
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return { r̂: 0, e };
}


;// ./src/evaluate/double/eval-k.ts



/**
 * Returns the result of evaluating the given polynomial at `x` such that at least
 * the sign bit is correct *up to 3-times compensated evaluation (K = 4)*, i.e.
 * as if evaluating in double-double-double-double precision.
 *
 * * uses a staggered algorithm, first trying in double precision, then in
 * double-double and finally in double-double-double-double
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function evalK(p, x) {
    const [r̂, e] = hornerWithRunningError(p, x);
    // inlined 
    //const r̂ = p[0]; const e = Math.abs(r̂) / 2; for (const i=1; i<p.length; i++) { r̂ = r̂*x + p[i]; e = Math.abs(x)*e + Math.abs(r̂); } e = Number.EPSILON * (2*e - Math.abs(r̂));
    if (Math.abs(r̂) - e < 0) {
        return evalK2(p, x);
        // inlined
        //[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
    }
    return r̂;
}
function evalK2(p, x) {
    const [r̂, e] = compHornerWithRunningError(p, x);
    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }
    return r̂;
}
// inlined
//[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
function evalK4(p, x) {
    const r̂ = CompHornerK(p, x, 4);
    return r̂;
}


;// ./src/evaluate/double/evaluate-at-0.ts
/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * evaluateAt0([3,2,99]); //=> 99
 * ```
 *
 * @doc
 */
function evaluateAt0(p) {
    return p.length === 0 ? 0 : p[p.length - 1];
}


;// ./src/evaluate/double/evaluate-at-1.ts
/**
 * Returns the result of evaluating the given polynomial at 1 using double
 * precision for intermediate calculations.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function evaluateAt1(p) {
    let res = 0;
    for (let i = 0; i < p.length; i++) {
        res += p[i];
    }
    return res;
}


;// ./src/evaluate/double-double/dd-horner-with-inp-error.ts
/* unused harmony import specifier */ var dd_horner_with_inp_error_ddMultDd;

const qmq = (/* unused pure expression or super */ null && (dd_horner_with_inp_error_ddMultDd));
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const { abs: dd_horner_with_inp_error_abs } = Math;
/**
 * Returns the value of the polynomial `p` evaluated at `x` along with an
 * error bound on the result that has **NOT** yet been scaled by `γγ(3)`.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]`  represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * on the input polynomial **NOT** yet scaled by `γγ(3)`
 */
function ddHornerWithInpError(p, x, p_) {
    const _x = dd_horner_with_inp_error_abs(x);
    let r̂ = p[0];
    let r̂_ = p_[0];
    for (let i = 1; i < p.length; i++) {
        const r̂x = qmd(x, r̂);
        r̂ = qaq(r̂x, p[i]);
        r̂_ = r̂_ * _x + dd_horner_with_inp_error_abs(r̂x[1]) + p_[i] + dd_horner_with_inp_error_abs(r̂[1]);
    }
    return [r̂, r̂_];
}


;// ./src/evaluate/double-double/dd-horner.ts

/**
 * Returns the result of evaluating a univariate polynomial using Horner's
 * method with intermediate calculations done in double-double precision and
 * the result returned in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function ddHorner(p, x) {
    let q = [0, 0];
    for (let i = 0; i < p.length; i++) {
        // q = p[i] + x*q;
        q = ddAddDd(p[i], ddMultDouble2(x, q));
    }
    return q;
}


;// ./src/evaluate/expansion/e-e-horner.ts


/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial at a point given as a Shewchuk expansion using
 * Horner's method - the result is returned as a Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function eeHorner(p, x) {
    let result = [0];
    for (let i = 0; i < p.length; i++) {
        result = fastExpansionSum(p[i], expansionProduct(result, x));
    }
    return result;
}


;// ./src/evaluate/expansion/e-evaluate-at-0.ts
/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * evaluateAt0([[3],[2],[99]]); //=> [99]
 * ```
 *
 * @doc
 */
function eEvaluateAt0(p) {
    return p.length === 0 ? [0] : p[p.length - 1];
}


;// ./src/evaluate/expansion/e-evaluate-at-1.ts

/**
 * Returns the exact result (bar underflow / overflow) of evaluating the given
 * polynomial at 1.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eEvaluateAt1(p) {
    let res = [0];
    for (let i = 0; i < p.length; i++) {
        res = fastExpansionSum(res, p[i]);
    }
    return res;
}


;// ./src/evaluate/expansion/e-horner.ts

/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial using Horner's method - the result is returned as a
 * Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function eHorner(p, x) {
    let q = [0];
    for (let i = 0; i < p.length; i++) {
        // q = p[i] + x*q;
        q = fastExpansionSum(p[i], scaleExpansion(q, x));
    }
    return q;
}


;// ./src/factor/double/content.ts

const { sign: content_sign } = Math;
/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the
 * greatest common divisor of its coefficients.
 *
 * * the sign is chosen such that dividing the polynomial by cont(p) will
 * always result in a positive leading coefficient
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * * **precondition** p must have integer coefficients, else use e.g. [[scaleFloatsToInts]]
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power, e.g.
 * `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function content(p) {
    if (p.length === 0) {
        // the zero polynomial
        return 1;
    }
    return content_sign(p[0]) * gcdInts(p);
}


;// ./src/factor/double/primitive-part.ts

/**
 * Returns the primitive part of the given polynomial.
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * * **precondition** p must have integer coefficients, else use e.g. [[scaleFloatsToInts]]
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power, e.g.
 * `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function primitivePart(p) {
    const c = content(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}


;// ./src/gcd/bigint/b-gcd-mod-p.ts

/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials modulo
 * the given prime `p`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function bGcdModP(a, b, p) {
    if (a.length === 0) {
        return b;
    }
    else if (b.length === 0) {
        return a;
    }
    const r = [a, b];
    let i = 1;
    while (true) {
        const r_ = bPdivModP(r[i - 1], r[i], p).r;
        if (r_.length === 0) {
            break;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            break;
        }
        i++;
    }
    return r[r.length - 1];
}


;// ./src/norm/double/p-2-norm.ts
const { sqrt } = Math;
/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of numbers
 * (with intermediate calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function p2Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += p[i] ** 2;
    }
    return sqrt(s);
}


;// ./src/gcd/bigint/landau-mignotte-bound.ts


const { abs: landau_mignotte_bound_abs, min: landau_mignotte_bound_min } = Math;
/**
 * Every coeﬃcient of the gcd of `a` and `b` in `Z[x]` is bounded in absolute
 * value by `2^min(deg(a),deg(b)) * gcd(lc(a),lc(b)) * min(||a||/|lc(a)|, ||b||/|lc(b)|)`.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q
 */
function bLandauMignotteBound(p, q) {
    const lcP = p[0];
    const lcQ = q[0];
    const dP = BigInt(p.length - 1);
    const dQ = BigInt(q.length - 1);
    const pD = p.map(c => Number(c));
    const qD = q.map(c => Number(c));
    const lcPD = Number(p[0]);
    const lcQD = Number(q[0]);
    const A = 2n ** (dP < dQ ? dP : dQ);
    const B = bGcdInt(lcP, lcQ);
    const C1 = p2Norm(pD) / landau_mignotte_bound_abs(lcPD);
    const C2 = p2Norm(qD) / landau_mignotte_bound_abs(lcQD);
    return Number(A) * Number(B) * landau_mignotte_bound_min(C1, C2);
}


;// ./src/gcd/bigint/b-xgcd.ts
/**
 * Returns the GCD of `a` and `p` together with Bezout coefficients `x` and `y`
 * such that `a*x + p*y = gcd(a,p)`.
 */
function bXgcd(a, p) {
    let oldR = a;
    let r = p;
    let oldS = 1n;
    let s = 0n;
    let oldT = 0n;
    let t = 1n;
    while (r !== 0n) {
        const q = oldR / r;
        [oldR, r] = [r, oldR - q * r];
        [oldS, s] = [s, oldS - q * s];
        [oldT, t] = [t, oldT - q * t];
    }
    return { gcd: oldR, x: oldS, y: oldT };
}


;// ./src/gcd/bigint/chinese-remainder-algorithm.ts


/**
 * Combines the two congruences `x ≡ r1 (mod m1)` and `x ≡ r2 (mod m2)` and
 * returns the least nonnegative solution modulo `m1*m2`.
 *
 * * **precondition:** `m1` and `m2` must be non-zero and coprime.
 */
function chineseRemainderAlgorithm(r1, r2, m1, m2) {
    // if (m1 === 0n || m2 === 0n) {
    //     throw new Error('Moduli must be non-zero.');
    // }
    const m1_ = m1 < 0n ? -m1 : m1;
    const m2_ = m2 < 0n ? -m2 : m2;
    const a1 = bMod(r1, m1_);
    const a2 = bMod(r2, m2_);
    const { gcd, x } = bXgcd(m1_, m2_);
    // if (gcd !== 1n) {
    //     throw new Error('Moduli must be coprime.');
    // }
    const m = m1_ * m2_;
    const k = bMod((a2 - a1) * x, m2_);
    return bMod(a1 + m1_ * k, m);
}


;// ./src/gcd/bigint/build-large-prime-pool.ts
/** @internal */
function buildLargePrimePool(count) {
    const pool = [];
    // Start near 2^32 and walk down over odd candidates.
    let n = 4294967291;
    while (pool.length < count) {
        if (isPrime32(n)) {
            pool.push(BigInt(n));
        }
        n -= 2;
    }
    return pool;
}
/** @internal */
function isPrime32(n) {
    if (n < 2) {
        return false;
    }
    if (n % 2 === 0) {
        return n === 2;
    }
    if (n % 3 === 0) {
        return n === 3;
    }
    // 6k +/- 1 wheel trial division is fast enough for 32-bit candidates.
    for (let d = 5; d * d <= n; d += 6) {
        if (n % d === 0 || n % (d + 2) === 0) {
            return false;
        }
    }
    return true;
}
// buildLargePrimePool(96);  <-- 96 primes below 2^32
const primes = [
    4294967291n, 4294967279n, 4294967231n, 4294967197n, 4294967189n, 4294967161n,
    4294967143n, 4294967111n, 4294967087n, 4294967029n, 4294966997n, 4294966981n,
    4294966943n, 4294966927n, 4294966909n, 4294966877n, 4294966829n, 4294966813n,
    4294966769n, 4294966667n, 4294966661n, 4294966657n, 4294966651n, 4294966639n,
    4294966619n, 4294966591n, 4294966583n, 4294966553n, 4294966477n, 4294966447n,
    4294966441n, 4294966427n, 4294966373n, 4294966367n, 4294966337n, 4294966297n,
    4294966243n, 4294966237n, 4294966231n, 4294966217n, 4294966187n, 4294966177n,
    4294966163n, 4294966153n, 4294966129n, 4294966121n, 4294966099n, 4294966087n,
    4294966073n, 4294966043n, 4294966007n, 4294966001n, 4294965977n, 4294965971n,
    4294965967n, 4294965949n, 4294965937n, 4294965911n, 4294965887n, 4294965847n,
    4294965841n, 4294965839n, 4294965821n, 4294965793n, 4294965767n, 4294965757n,
    4294965737n, 4294965733n, 4294965721n, 4294965691n, 4294965683n, 4294965679n,
    4294965673n, 4294965671n, 4294965659n, 4294965641n, 4294965617n, 4294965613n,
    4294965601n, 4294965581n, 4294965529n, 4294965487n, 4294965461n, 4294965457n,
    4294965413n, 4294965383n, 4294965361n, 4294965347n, 4294965331n, 4294965313n,
    4294965307n, 4294965263n, 4294965251n, 4294965229n, 4294965203n, 4294965193n
];


;// ./src/gcd/bigint/b-gcd-modular.ts










const { ceil } = Math;
let primesShuffled;
function buildShuffledPrimePool() {
    const pool = primes;
    const arr = pool.slice();
    // Deterministic Fisher-Yates shuffle using squares-rng output as entropy.
    for (let i = arr.length - 1; i > 0; i--) {
        const r = squares(i) >>> 0;
        const j = r % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * the (fast) modular algorithm.
 *
 * * `bGcdPrs` is faster in most cases
 *
 * @param a a polynomial with coefficients given densely as an array of
 * BigInts from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function bGcdModular(a, b) {
    if (a.length === 0) {
        return b;
    }
    if (b.length === 0) {
        return a;
    }
    // (1)
    // d := gcd(lc(a), lc(b));
    // M := 2·d·(Landau Mignotte Bound for a, b);
    const d = bGcdInt(a[0], b[0]);
    const M = 2n * d * BigInt(ceil(bLandauMignotteBound(a, b)));
    let primeIdx = 0;
    let p;
    let dModP;
    let g;
    while (true) {
        // (2)
        // p := a new prime not dividing d;
        // c(p) := gcd(a(p), b(p)); [with lc(c(p)) = 1]
        // g(p) := (d mod p)·c(p);
        // Find a new prime not dividing d;
        ({ p, dModP, primeIdx, g } = getNextGoodGp(a, b, d, primeIdx));
        // (3)
        // if deg(g(p)) = 0 then {g := 1; return};
        // P := p;
        // g := g(p);
        if (g.length <= 1) {
            return [1n];
        }
        let P = p;
        // (4)
        // while P ≤ M do
        //    p := a new prime not dividing d;
        //    c(p) := gcd(a(p), b(p)); [with lc(c(p)) = 1]
        //    g(p) := (d mod p) · c(p);
        //    if deg(g(p)) < deg(g) then goto (3);
        //    if deg(g(p)) = deg(g) then g := CRA(g, g(p), P, p); P := P·p
        while (P <= M) {
            let g$p;
            ({ p, dModP, primeIdx, g: g$p } = getNextGoodGp(a, b, d, primeIdx));
            if (g$p.length < g.length) {
                g = g$p;
                if (g.length <= 1) {
                    return [1n];
                }
                P = p;
                continue; // goto (3)
            }
            if (g$p.length === g.length) {
                g = g.map((c, idx) => chineseRemainderAlgorithm(c, g$p[idx], P, p));
                P = P * p;
            }
        }
        // (5)
        // g := pp(g);  (pp -> Primitive Part)
        // if g | a and g | b then return g;
        // goto (2)
        g = bPrimitivePart(fromResidues(g, P));
        if (bDivides(g, a) && bDivides(g, b)) {
            return g;
        }
    }
}
function getNextGoodGp(a, b, d, primeIdx) {
    while (true) {
        const nextPrime = newPrimeNotDividingD(d, primeIdx);
        const { p, dModP } = nextPrime;
        primeIdx = nextPrime.primeIdx;
        const g = getGp(a, b, dModP, p);
        if (g !== undefined) {
            return { p, dModP, primeIdx, g };
        }
    }
}
function getGp(a, b, dModP, p) {
    const a$p = a.map(c => bMod(c, p));
    const b$p = b.map(c => bMod(c, p));
    // If `b` reduces to zero modulo `p`, modular division in bGcdModP would
    // be ill-defined for this prime; skip this prime.
    if (b$p.every(c => c === 0n)) {
        return undefined;
    }
    const c$p = makeMonicModP(bGcdModP(a$p, b$p, p), p);
    return c$p.map(c => bMod(dModP * c, p));
}
function makeMonicModP(p_, p) {
    if (p_.length === 0) {
        return [];
    }
    const lcInv = bInverseModP(p_[0], p);
    return p_.map(c => bMod(c * lcInv, p));
}
function fromResidues(p_, m) {
    const halfM = m / 2n;
    return p_.map(c => {
        const r = bMod(c, m);
        return r > halfM ? r - m : r;
    });
}
function newPrimeNotDividingD(d, primeIdx) {
    let p;
    let dModP;
    while (true) {
        p = (primesShuffled || (primesShuffled = buildShuffledPrimePool()))[primeIdx];
        if (p === undefined) {
            throw new Error('Ran out of primes in modular GCD.');
        }
        primeIdx++;
        dModP = bMod(d, p);
        if (dModP === 0n) {
            continue;
        }
        return { p, dModP, primeIdx };
    }
}


;// ./src/gcd/bigint/b-gcd-prs.ts

/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs).
 *
 * * the modular GCD algorithm, [[bGcdModular]], can also be used; it should
 *   be faster for high degree polynomials or when `bGcdPrs` encounters pathological
 *   cases. However, `bGcdPrs` is faster in general.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function bGcdPrs(a, b) {
    if (a.length === 0) {
        return b;
    }
    else if (b.length === 0) {
        return a;
    }
    const seq = bPremSequenceSubresultant(a, b, false);
    return seq[seq.length - 1];
}


;// ./src/scale-to-int/scale-floats-to-bigints.ts


/**
 * Returns the result of scaling the given array of floats by the *same* power
 * of two such that all floats become bigints.
 *
 * * can be used to scale polynomials
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatsToBigints(as) {
    let e = -1024;
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scalePower = -exponent(a) + bitLength(a) - 1;
        if (scalePower > e) {
            e = scalePower;
        }
    }
    // check for the trivial case
    if (e === 0) {
        return as.map(a => BigInt(a));
    }
    if (e > 0) {
        return as.map(a => {
            if (a === 0) {
                return 0n;
            }
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        });
    }
    // overflow / underflow cannot occur
    return as.map(a => BigInt(a * 2 ** e));
}


;// ./src/scale-to-int/scale-floatss-to-bigintss.ts


/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become bigints.
 *
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatssToBigintss(ass) {
    let e = -1024;
    for (let i = 0; i < ass.length; i++) {
        const c = ass[i];
        for (let j = 0; j < c.length; j++) {
            const a = c[j];
            if (a === 0) {
                continue;
            }
            const scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }
    // check for the trivial case
    if (e === 0) {
        return ass.map(as => as.map(a => BigInt(a)));
    }
    if (e > 0) {
        return ass.map(as => as.map(a => {
            if (a === 0) {
                return 0n;
            }
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        }));
    }
    // overflow / underflow cannot occur
    return ass.map(as => as.map(a => BigInt(a * 2 ** e)));
}


;// ./src/gcd/double/gcd-prs.ts



/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs) as `bigint`s.
 *
 * * the modular GCD algorithm, [[gcdModular]], can also be used; it should
 *   be faster for high degree polynomials or when `gcdPrs` encounters pathological
 *   cases. However, `gcdPrs` is faster in general.
 *
 * * since the final polynomial coefficients can be too large and overflow can
 *   occur in the **final** result is returned as a `bigint` coefficient polynomial
 *   (see `bLandauMignotteBound`).
 *
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @internal
 */
function gcdPrs(a, b) {
    if (a.length === 0) {
        return scaleFloatsToBigints(b);
    }
    else if (b.length === 0) {
        return scaleFloatsToBigints(a);
    }
    const [A, B] = scaleFloatssToBigintss([a, b]);
    const seq = bPremSequenceSubresultant(A, B, false);
    return seq[seq.length - 1];
}


;// ./src/norm/bigint/b-p-1-norm.ts
/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of bigints.
 *
 * * if the array of bigints represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of bigints
 *
 * @doc
 */
function bP1Norm(p) {
    let s = 0n;
    for (let i = 0; i < p.length; i++) {
        const n = p[i];
        s += n < 0n ? -n : n;
    }
    return s;
}


;// ./src/norm/bigint/b-p-2-norm-squared.ts
/**
 * Returns the `p-2 norm` squared, i.e. the square of the `Euclidean norm` of
 * the given array of bigints.
 *
 * @param p an array of bigints; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function bP2NormSquared(p) {
    let s = 0n;
    for (let i = 0; i < p.length; i++) {
        s += p[i] ** 2n;
    }
    return s;
}


;// ./src/norm/bigint/b-p-inf-norm.ts
/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of bigints / coefficients.
 *
 * @param p an array of bigints; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function bPInfNorm(p) {
    let max = 0n;
    for (let i = 0; i < p.length; i++) {
        let v = p[i];
        v = v < 0n ? -v : v;
        if (v > max) {
            max = v;
        }
    }
    return max;
}


;// ./src/norm/double/p-1-norm.ts
const { abs: p_1_norm_abs } = Math;
/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of numbers (with intermediate calculations done
 * in double precision).
 *
 * * if the array of numbers represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of numbers
 *
 * @doc
 */
function p1Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += p_1_norm_abs(p[i]);
    }
    return s;
}


;// ./src/norm/double/p-inf-norm.ts
/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of numbers / coefficients (with intermediate
 * calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function pInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        const v = Math.abs(p[i]);
        if (v > max) {
            max = v;
        }
    }
    return max;
}


;// ./src/norm/expansion/e-p-1-norm.ts

/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of Shewchuk expansions (with intermediate
 * calculations (and the final result) done in double precision).
 *
 * * if the array of expansions represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of Shewchuk expansions
 *
 * @doc
 */
function eP1Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += Math.abs(eEstimate(p[i]));
    }
    return s;
}


;// ./src/norm/expansion/e-p-2-norm.ts

/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of Shewchuk
 * expansions (with intermediate calculations (and the final result) done in
 * double precision).
 *
 * @param p an array of Shewchuk expansions; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function eP2Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += eEstimate(p[i]) ** 2;
    }
    return Math.sqrt(s);
}


;// ./src/norm/expansion/e-p-inf-norm.ts

/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of numbers / coefficients (with intermediate
 * calculations (and the final result) done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function ePInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        const v = Math.abs(eEstimate(p[i]));
        if (v > max) {
            max = v;
        }
    }
    return max;
}


;// ./src/roots/from-roots/double/from-roots.ts

/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2) in double precision
 *
 * * the resulting polynomial may have complex roots close to zero due to
 * round-off caused by working in double precision.
 *
 * * mostly for testing purposes.
 *
 * * the real roots of the constructed polynomial is unlikely to be exactly
 * the same as the roots that the polynomial has been constructed from due to
 * floating-point round-off.
 *
 * @param roots an array of roots
 *
 * @example
 * ```typescript
 * fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]
 * allRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]
 *
 * // In the above note the rounding error. Also note the multiple root of 3 that has been missed.
 * allRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]
 * allRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]
 * ```
 *
 * @doc
 */
function fromRoots(roots) {
    let p = [1];
    for (let i = 0; i < roots.length; i++) {
        p = multiply(p, [1, -roots[i]]);
    }
    return p;
}


;// ./src/predictive-random/double/random.ts

/**
 * Arbitrary seed value for the simple random number generator.
 *
 * @internal
 */
const SEED = 123456789;
/**
 * The range for the simple random number generator, i.e. the generated
 * numbers will be in [0,RANGE].
 *
 * @internal
 */
const RANGE = 4294967296;
/**
 * Creates a function from the given function with parameters similar
 * to flatRoots but with an extra parameter in the beginning indicating
 * the length of the array generated by the original function.
 *
 * @param f
 *
 * @internal
 */
function createArrFunction(f) {
    return function (n, d, a, b, seed = SEED, odds = 0) {
        const res = [];
        for (let i = 0; i < n; i++) {
            const v = f(d, a, b, seed, odds);
            const p = v.p;
            seed = v.seed;
            res.push(p);
        }
        return res;
    };
}
/**
 * Generates and returns an array of polynomials with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * ```
 *
 * @doc
 */
const flatRootsArr = createArrFunction(flatRoots);
/**
 * Generates and returns an array of polynomials with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * ```
 *
 * @doc
 */
const flatCoefficientsArr = createArrFunction(flatCoefficients);
/**
 * Returns a quasi-random number to be used as the next input to this function.
 *
 * * see [stackoverflow](https://stackoverflow.com/questions/3062746/special-simple-random-number-generator)
 *
 * @param seed
 *
 * @internal
 */
function predictiveRandom(seed) {
    const a = 134775813;
    return (a * seed + 1) % RANGE;
}
/**
 * Generates a random array of numbers picked from a bounded flat
 * distribution (i.e. a rectangular distribution) with specified odds of
 * duplication of consecutive values.
 *
 * @param n the number of values to generate
 * @param a defaults to 0; the lower bound of the distribution
 * @param b defaults to 1; the upper bound of the distribution
 * @param seed defaults to 123456789; a seed
 * @param odds defaults to 0; the odds that a number will be doubled (applied
 * recursively so that some numbers will be tripled, etc.
 *
 * @internal
 */
function randomArray(n, a, b, seed, odds = 0) {
    let vs = [];
    for (let i = 0; i < n; i++) {
        seed = predictiveRandom(seed);
        const v = ((seed / RANGE) * (b - a)) + a;
        seed = push(seed, vs, v, odds);
    }
    vs = vs.slice(0, n);
    return { vs, seed };
}
/**
 * Helper function that will add more numbers to the passed array - modifies the
 * values parameter.
 *
 * @param seed
 * @param values an existing array of values - will be modified!
 * @param x the number that will be added (possibly multiple times)
 * @param odds the odds that the number will be added again (recursively).
 *
 * @internal
 */
function push(seed, values, x, odds) {
    seed = predictiveRandom(seed);
    values.push(x);
    if ((seed / RANGE) < odds) {
        seed = push(seed, values, x, odds);
    }
    return seed;
}
/**
 * Generates and returns an array of polynomials with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed value that can be used as the input to the next
 * call to a predictive random function
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRoots(3,0,10); //=> { p: [1, -17.27247918024659, 97.33487287168995, -179.34094494147305], seed: 939629312 }
 * ```
 *
 * @doc
 */
function flatRoots(d, a = 0, b = 1, seed = SEED, odds = 0) {
    const randArr = randomArray(d, a, b, seed, odds);
    seed = randArr.seed;
    const p = fromRoots(randArr.vs);
    return { p, seed };
}
/**
 * Generates and returns an array of polynomials with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed value that can be used as the input to the next
 * call to a predictive random function
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatCoefficients(3,-5,5); //=> { p: [0.437291506677866, -0.5087333917617798, 2.3439210653305054], seed: 939629312 }
 * ```
 *
 * @doc
 */
function flatCoefficients(d, a = -1, b = +1, seed = SEED) {
    const randArr = randomArray(d, a, b, seed);
    seed = randArr.seed;
    const p = randArr.vs;
    return { p, seed };
}


;// ./src/predictive-random/bigint/b-random.ts


/**
 * Some seed value for the simple random number generator.
 *
 * @internal
 */
const b_random_SEED = 123456789;
/**
 * Generates and returns a polynomial with random **roots** (with coefficients
 * given densely as an array of bigints from highest to
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @doc
 */
function bFlatRoots(d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
    const res = flatRoots(d, a, b, seed, odds);
    return { p: scaleFloatsToBigints(res.p), seed: res.seed };
}
/**
 * Generates and returns an array of polynomials with random **roots** (with
 * coefficients given densely as an array of bigints from highest to
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @doc
 */
function bFlatRootsArr(n, d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
    return flatRootsArr(n, d, a, b, seed, odds).map(scaleFloatsToBigints);
}
/**
 * Generates and returns a polynomial with random **coefficients**
 * (with coefficients given densely as an array of bigints from highest to
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @doc
 */
function bFlatCoefficients(d, a = 0, b = 1, seed = b_random_SEED) {
    const res = flatCoefficients(d, a, b, seed);
    return { p: scaleFloatsToBigints(res.p), seed: res.seed };
}
/**
 * Generates and returns an array of polynomials with random **coefficients**
 * (with coefficients given densely as an array of bigints from highest to
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @doc
 */
function bFlatCoefficientsArr(n, d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
    return flatCoefficientsArr(n, d, a, b, seed, odds).map(scaleFloatsToBigints);
}


;// ./src/roots/root-interval.ts
/**
 * Simple function that creates and returns an exact root (with a bracketing
 * interval width of 0 and multiplicity 1)
 *
 * @param t
 *
 * @doc
 */
function createRootExact(t) {
    return { tS: t, tE: t, multiplicity: 1 };
}
/**
 * Simple function that returns the middle of the root bracketing interval - can
 * be used to estimate the root
 *
 * @param ri a root interval
 *
 * @doc
 */
function mid(ri) {
    return (ri.tS + ri.tE) / 2;
}


;// ./src/roots/certified/root-interval-to-exp.ts
/**
 * Returns the result of converting a double precision root interval to a
 * double-double precision one
 *
 * @param ri a root interval
 *
 * @doc
 */
function rootIntervalToExp(ri) {
    return {
        tS: [0, ri.tS],
        tE: [0, ri.tE],
        multiplicity: ri.multiplicity
    };
}


;// ./src/roots/transpose-poly.ts
/**
 * Transposes the given polynomial (given with multi-precision coefficients)
 * into multiple polynomials with each consecutive polynomial 'adjusting'
 * the prior one to higher precision.
 *
 * @param p
 *
 * @internal
 */
function transposePoly(p) {
    // transpose the polynomial coefficients into multiple polynomials
    const len = p[0].length;
    const p_ = [];
    for (let i = 0; i < len; i++) {
        const _p = [];
        for (let j = 0; j < p.length; j++) {
            _p.push(p[j][len - (i + 1)]); // from highest to lowest
        }
        p_.push(_p);
    }
    return p_;
}


;// ./src/evaluate/eval-adaptive.ts



/**
 * Returns the result of evaluating the given polynomial (with double-double
 * precision coefficients) at the given value, where the coefficient-wise error
 * is also given.
 *
 * * **the sign of the returned result is guaranteed to be correct**
 * * the evaluation is done adaptively, i.e. if the evaluation cannot be done
 * accurately enough then an exact precision polynomial is requested
 *
 * @param p a polynomial given as an array with each consecutive element of
 * the array having more accurate coefficients than the previous (by adding
 * consecutive double precision coefficients to prior coefficients)
 * @param pE a coefficientwise error bound
 * @param x the point of evaluation
 * @param psExact an object holding the exact polynomial and all its exact
 * derivatives - this object may be modified!
 * @param getPsExact a function to retrieve the exact polynomial and all its
 * exact derivatives
 * @param diffCount the number of differentiations done up to this point
 *
 * @internal
 */
function evalAdaptive(p, pE, x, getPolyExact) {
    const r = evalCertified(p, x, pE, 4);
    if (r !== 0) {
        return r;
    }
    // condition number is too high - request higher precision
    return eEstimate(eHorner(getPolyExact(), x));
}


;// ./src/roots/refine-certified.ts




const { abs: refine_certified_abs, min: refine_certified_min, max: refine_certified_max, log2, ceil: refine_certified_ceil } = Math;
/**
 * Returns a refined root given a root bracketed in the interval `(a,b)` of the
 * given polynomial using Brent's Method - modified slightly to allow for
 * error certified bounds.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method), except that it is specialized to polynomial evaluation.
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *  * guaranteed converge (unlike the Newton and other so-called single-point
 *    methods),
 *  * converges in a reasonable number of iterations even for highly contrived
 *    functions (unlike Dekker's Method) and
 *  * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 *    Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 *   works but is not precisely Brent's method and runs about 2x or more slower
 *   due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 * * [c++ implementation of Brent's Method](https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp)
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`. If `exact` is `true` then this is allowed
 * to be `undefined`.
 * @param pE an error polynomial that provides a coefficientwise error bound on
 * the input polynomial; all coefficients must be positive. If `exact` is `true`
 * then this is allowed to be `undefined`.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa the result of evaluating the input polynomial at `a`
 * @param fb the result of evaluating the input polynomial at `b`
 * @param getPolyExact a function that returns the exact polynomial coefficients
 * @param exact defaults to false; set to true if you need to do exact evaluations from the start
 *
 * @internal
 */
function refineCertified(p, pE, lb, ub, fa, fb, getPolyExact, exact) {
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while (true) {
        // update delta
        if (refine_certified_abs(fc) < refine_certified_abs(fb)) {
            a = b;
            b = c;
            c = a;
            fa = fb;
            fb = fc;
            fc = fa;
        }
        // Original c++ code had the line below but with us t === 0 and b is 
        // taken as 1 and 2.0 * macheps is taken as 2*u === Number.EPSILON (eps)
        // or can also be taken as 4*u === 2*Number.EPSILON (2*eps)
        // adaptive tolerance
        //let δ = 2 * eps * max(1,abs(b));
        //let δ = 2 * u * max(1,abs(b));
        let δ;
        const mm = refine_certified_max(refine_certified_abs(a), refine_certified_abs(b));
        if (mm <= 1) {
            δ = eps;
        }
        else {
            // keep δ = eps * a power of 2
            //δ = eps * 2**ceil(log2(ceil(mm)));  // may be faster to get log2 of an integer
            δ = eps * 2 ** refine_certified_ceil(log2(mm));
        }
        //tol = 2.0 * macheps * abs ( b ) + t;
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        // modified from the original since we dont need the fb === 0 check here
        if (refine_certified_abs(m) <= δ) {
            return b < c
                ? [b, c]
                : [c, b];
        }
        if (refine_certified_abs(e) < δ || refine_certified_abs(fa) <= refine_certified_abs(fb)) {
            e = m;
            d = e;
        }
        else {
            let s = fb / fa;
            let v;
            let q;
            if (a === c) {
                v = 2 * m * s;
                q = 1 - s;
            }
            else {
                q = fa / fc;
                const r = fb / fc;
                v = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < v) {
                q = -q;
            }
            else {
                v = -v;
            }
            s = e;
            e = d;
            if (2 * v < 3 * m * q - refine_certified_abs(δ * q) && v < refine_certified_abs(0.5 * s * q)) {
                d = v / q;
            }
            else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < refine_certified_abs(d)) {
            b = b + d;
        }
        else if (0 < m) {
            b = b + δ;
        }
        else {
            //b = b - eps;
            b = b - δ;
        }
        fb = exact
            ? eEstimate(eHorner(getPolyExact(), b))
            // keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
            // here by a precondition
            : evalCertified(p, b, pE);
        if (fb === 0) {
            // Since `evalCertified` returns zero if undecided the zero result
            // cannot be fully trusted at this point.
            // if we are already doing exact evaluations this is an exact root
            if (exact) {
                return [b, b];
            }
            // We need to calculate δ/2 to the left and right of b to get 
            // results that should usually be !== 0. 
            // It is a pre-filter. If the result === 0 we need to sharpen the
            // ability of the evaluation by somehow reducing the error bound
            const sL = refine_certified_max(lb, b - δ); // dont overstep bounds
            const sR = refine_certified_min(ub, b + δ); // dont overstep bounds
            // Note: sR - sL <= 2*δ provided lb, ub are in [-1..1] - usually 
            // (when sL === s - δ and sR === s + δ) sR - sL === 2*δ. Also δ > 0
            // keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
            // here by a precondition
            const fsL = evalCertified(p, sL, pE);
            const fsR = evalCertified(p, sR, pE);
            // if the evaluation method is strong enough return the result
            if (fsL * fsR !== 0) {
                return [sL, sR];
            }
            // At this point either fsL or fsR === 0 so we need to sharpen the
            // evaluation method
            exact = true;
            // get and cache the exact polynomial (we cache this since getting
            // an exact polynomial takes about 15 times more time than getting
            // a double-double polynomial and we very rarely expect to get to 
            // this point)
            fb = eEstimate(eHorner(getPolyExact(), b));
            // if the exact evaluation returns 0 we have an exact root
            if (fb === 0) {
                return [b, b];
            }
            // else we've got a new value for fb and from here on we use exact
            // evaluations
        }
        if ((0 < fb && 0 < fc) || (fb <= 0 && fc <= 0)) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


;// ./src/roots/root-bounds/upper-to-lower-bound.ts
/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 *
 * @param positiveUpperBoundFunction
 *
 * @internal
 */
function upperToLowerBound(positiveUpperBoundFunction) {
    return (p) => {
        return 1 / positiveUpperBoundFunction(p.toReversed());
    };
}


;// ./src/roots/root-bounds/positive-to-negative-bound.ts

/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 *
 * @param positiveBoundFunction
 *
 * @internal
 */
function positiveToNegativeBound(positiveBoundFunction) {
    return (p) => {
        return -positiveBoundFunction(reflectAboutYAxis(p));
    };
}


;// ./src/roots/root-bounds/root-bounds-lmq.ts



/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 * ```
 *
 * @doc
 */
function positiveRootUpperBound_LMQ(p) {
    const deg = p.length - 1;
    if (deg < 1) {
        return 0;
    }
    if (p[0] < 0) {
        p = negate(p);
    }
    const timesUsed = [];
    for (let i = 0; i < deg; i++) {
        timesUsed.push(1);
    }
    let ub = 0;
    for (let m = 0; m <= deg; m++) {
        if (p[m] >= 0) {
            continue;
        }
        let tempub = Infinity;
        let any = false;
        for (let k = 0; k < m; k++) {
            if (p[k] <= 0) {
                continue;
            }
            const temp = (-p[m] / (p[k] / 2 ** timesUsed[k])) ** (1 / (m - k));
            timesUsed[k]++;
            if (tempub > temp) {
                tempub = temp;
            }
            any = true;
        }
        if (any && ub < tempub)
            ub = tempub;
    }
    return ub;
}
/**
 * Returns a positive lower bound of the real roots of the given polynomial
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);
/**
 * Returns a negative lower (further from zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const negativeRootLowerBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);
/**
 * Returns a negative upper (closer to zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const negativeRootUpperBound_LMQ = upperToLowerBound(negativeRootLowerBound_LMQ);


;// ./src/roots/reduce-interval.ts

const { min: reduce_interval_min, max: reduce_interval_max } = Math;
/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * @param lb
 * @param ub
 * @param p
 *
 * @internal
 */
function reduceInterval(lb, ub, p) {
    lb = reduce_interval_max(lb, negativeRootLowerBound_LMQ(p));
    ub = reduce_interval_min(ub, positiveRootUpperBound_LMQ(p));
    return [lb, ub];
}


;// ./src/roots/remove-leading-zero-coeffs.ts

const { abs: remove_leading_zero_coeffs_abs } = Math;
/**
 * **In-place** remove leading zero coefficients.
 *
 * * `p` and `getPExact()` *must* be of same length
 *
 * @internal
*/
function removeLeadingZeroCoeffs(pDd, pDd_, getPExact, errorMultiplier) {
    let pExact = undefined; // lazy loaded
    // while the leading coefficient is smaller then the error bound 
    // i.e. possibly zero
    while (pDd.length > 0 && remove_leading_zero_coeffs_abs(pDd[0][1]) <= errorMultiplier * pDd_[0]) {
        pExact = pExact || getPExact();
        // if leading coefficient really is zero
        if (eSign(pExact[0]) === 0) {
            // shift the leading coefficient and error out without altering the 
            // given polynomial and error bound (shift is destructive, slice is not)
            pDd = pDd.slice();
            pDd.shift();
            pDd_ = pDd_.slice();
            pDd_.shift();
            // also shift out the exact polynomial's leading coefficient
            pExact.shift();
            continue;
        }
        break;
    }
    return { pDd: pDd, pDd_: pDd_, pExact };
}


;// ./src/roots/certified/all-roots-certified.ts











const { min: all_roots_certified_min, max: all_roots_certified_max, abs: all_roots_certified_abs } = Math;
const all_roots_certified_eps = Number.EPSILON;
const onePlusEps = 1 + all_roots_certified_eps;
function allRootsCertified(p, lb = 0, ub = 1, pE, getPExact, returnUndefinedForZeroPoly) {
    // if `getPExact` is not specified then assume the given double-double 
    // precision coefficient polynomial is exact
    if (!getPExact) {
        getPExact = () => p;
    }
    //const δ = 2*Number.EPSILON * max(1, max(abs(lb), abs(ub)));
    // if `pE` is not specified then assume there is no error
    pE = pE || new Array(p.length).fill(0); // no error
    // set `diffCount` to 0 so `getPolyExact` can be accurate
    let diffCount = 0;
    // lazy loaded array of the given polynomial and its derivatives
    let psExact = undefined;
    //----------------------------------------------------------------------
    // Remove leading zero coefficients 
    // `p` and `getPExact()` *must* be of same length
    //----------------------------------------------------------------------
    let pExact = undefined; // lazy loaded
    ({ pDd: p, pDd_: pE, pExact } = removeLeadingZeroCoeffs(p, pE, getPExact, 1));
    if (p.length === 0) {
        // return `undefined` for the zero polynomial?
        return returnUndefinedForZeroPoly ? undefined : [];
    }
    else if (p.length === 1) {
        // return `[]` for a degree 1 polynomial (a non-zero constant)
        return [];
    }
    const p_ = transposePoly(p);
    [lb, ub] = reduceInterval(lb, ub, p_[0]);
    let bCount;
    let exact;
    const deg = p.length - 1;
    bCount = 0;
    exact = false;
    let LB; // evaluation at lb
    do {
        LB = exact
            ? eEstimate(eHorner(getPolyExact(), lb))
            : evalCertified(p_, lb, pE);
        if (LB === 0) {
            bCount++;
            // the max bCount is empirically selected for max performance
            if (bCount >= 3 && !exact) {
                exact = true;
                continue;
            }
            lb -= 2 * Number.EPSILON * all_roots_certified_max(1, all_roots_certified_abs(lb));
        }
    } while (LB === 0);
    bCount = 0;
    exact = false;
    let UB; // evaluation at ub
    do {
        UB = exact
            ? eEstimate(eHorner(getPolyExact(), ub))
            : evalCertified(p_, ub, pE);
        if (UB === 0) {
            bCount++;
            if (bCount >= 3 && !exact) { // the max bCount is empirically selected for max performance
                exact = true;
                continue;
            }
            ub += 2 * Number.EPSILON * all_roots_certified_max(1, all_roots_certified_abs(ub));
        }
    } while (UB === 0);
    // Get all derivatives with their coefficient-wise error bounds, i.e. 
    // ps === [p, dp, ddp, ..., constant]
    //        [0,  1,   2, ..., deg     ]
    const ps = [{ p, pE }];
    const ps_ = [transposePoly(p)]; // the transposed versions
    for (let i = 1; i <= deg; i++) {
        const dP = ddDifferentiateWithError(ps[i - 1]);
        ps.push(dP);
        ps_.push(transposePoly(dP.p)); // the transposed versions
    }
    let is = [];
    let curPE;
    let curP_;
    diffCount = deg - 1; // update diffcount
    for (; diffCount >= 0; diffCount--) {
        curPE = ps[diffCount].pE;
        // on first iteration curP_ is linear, 
        // on second it is quadratic, etc. ...
        curP_ = ps_[diffCount];
        is = getRootsWithin();
    }
    // depends externally on `diffCount` and `psExact`
    function getPolyExact() {
        // cache
        if (psExact !== undefined) {
            return psExact[diffCount];
        }
        let poly = pExact || getPExact(); // `getPExact` cannot be `undefined` here
        psExact = [poly];
        while (poly.length > 1) {
            poly = eDifferentiate(poly);
            psExact.push(poly);
        }
        return psExact[diffCount];
    }
    return is;
    // All cases:
    // ----------
    // Note: [_a,a_] denotes a micro-interval, whereas [b_,_a], [a_,_b] denotes a
    // normal interval.
    // Note: In all iterations we check [_a,a_] and [a_,_b]. In the final
    // iteration we check [_b,b_], then we've checked all intervals.
    // 
    // ⇑ represents +pos (above x-axis) and ⇓ represents -neg
    // (the symmetric cases also applies where + and - are interchanged)
    // ? means does not matter
    // -----------------------------------------------------------------
    // CASE 1A:
    // _A⇑ | A_⇑ | _B⇑
    //  - [_a,a_] → 
    //    - _a === a_
    //        ? no root 
    //        : A_/_A close enough to zero
    //            ? close even root 
    //            : no roots
    //  - [a_,_b] → no root (curve is monotone increasing or decreasing)
    // CASE 1B:
    // _A⇑ | A_⇑ | _B⇓  
    //  - [_a,a_] → 
    //    - _a === a_
    //        ? no root 
    //        : A_/_A close enough to zero ? close even root : no roots
    //  - [a_,_b] → single root (curve is monotone increasing or decreasing)
    // CASE 2A:
    // _A⇑ | A_⇓ | _B⇑
    //  - [_a,a_] → odd root(s)
    //  - [a_,_b] → single root (curve is monotone increasing or decreasing)
    // CASE 2B:
    // _A⇑ | A_⇓ | _B⇓
    //  - [_a,a_] → odd root(s)
    //  - [a_,_b] → no root (curve is monotone increasing or decreasing)
    // CASE 3A: 
    // A_0 | A_? | _B? | B_?  
    // CASE 3B: 
    // A_? | A_0 | _B? | B_?  
    /**
     * Finds and returns all roots of the given polynomial within the given
     * intervals, starting from the lower bound (lb) and ending at the upper
     * bound (ub) as fetched from the closure.
     *
     * * **precondition** intervals should be disjoint, i.e endpoints are not allowed
     * to be equal - it must be that a_ !== _b
     * * **precondition** the curve must be monotone increasing or decreasing between
     * b_ and _a AND a_ and _b
     * * **precondition** the value at the lower bound (LB) and upper bound (UB)
     * must !== 0
     *
     * @internal
     *
     * @param curP_ a polynomial given as an array with each consecutive element of
     * the array having more accurate coefficients than the previous (by adding
     * consecutive double precision coefficients to prior coefficients)
     * @param is the micro-intervals
     */
    function getRootsWithin() {
        const roots = [];
        // If there are no micro-intervals then check the interval between lb and ub.
        const LB = evalAdaptive(curP_, curPE, lb, getPolyExact);
        if (!is.length) {
            // close even root not possible
            const UB = evalAdaptive(curP_, curPE, ub, getPolyExact);
            if (LB * UB >= 0) {
                return [];
            }
            const [tS, tE] = refineCertified(curP_, curPE, lb, ub, LB, UB, getPolyExact /*, δ*/);
            return [{ tS, tE, multiplicity: 1 }];
        }
        //---- First check from lb to the left side of the first micro-interval.
        let _a = is[0].tS;
        let _A = evalAdaptive(curP_, curPE, _a, getPolyExact);
        if (LB * _A > 0) {
            // no roots possible (curve is monotone increasing or decreasing)
        }
        else if (LB * _A < 0) {
            // recall LB must !== 0 as a precondition
            const [tS, tE] = refineCertified(curP_, curPE, lb, _a, LB, _A, getPolyExact /*, δ*/);
            roots.push({ tS, tE, multiplicity: 1 });
        } //else {
        // _A === 0
        // no roots possible in [lb,_a]
        //}
        let a_ = lb;
        let A_ = LB;
        let _b = _a;
        let _B = _A;
        let a;
        for (let i = 0; i < is.length; i++) {
            const i_ = is[i + 1]; // right micro-interval
            a = is[i];
            _a = _b;
            a_ = is[i].tE;
            _b = i_ ? i_.tS : ub;
            const B_ = A_;
            _A = _B;
            A_ = evalAdaptive(curP_, curPE, a_, getPolyExact);
            _B = evalAdaptive(curP_, curPE, _b, getPolyExact);
            if (_A * A_ > 0) {
                //---- CASE 1: _A⇑ | A_⇑   OR   _A⇓ | A_⇓
                if (A_ * _B > 0) {
                    //---- CASE 1A: _A⇑ | A_⇑ | _B⇑   OR   _A⇓ | A_⇓ | _B⇓
                    //console.log('CASE 1A');
                    if (a_ !== _a && a.multiplicity % 2 === 1) {
                        checkEvenAA();
                    }
                    // [a_,_b] → no root
                }
                else if (A_ * _B < 0) {
                    //---- CASE 1B: _A⇑ | A_⇑ | _B⇓   OR   _A⇓ | A_⇓ | _B⇑
                    //console.log('CASE 1B');
                    // we cannot exclude this case as their may be even 
                    // multiplicity >= 4 roots; we would've been able if we
                    // knew that a.multiplicity === 1 exactly and thus the code
                    // could still be improved slightly
                    if (a_ !== _a && a.multiplicity % 2 === 1) {
                        checkEvenAA();
                    }
                    // [a_,_b] → single root (curve is monotone increasing or decreasing)
                    const [tS, tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
                    roots.push({ tS, tE, multiplicity: 1 });
                }
                else { // _B === 0
                    //---- CASE 1C: _A⇑ | A_⇑ | _B0   OR   _A⇓ | A_⇓ | _B0
                    //console.log('CASE 1C');
                    // we cannot exclude this case as their may be even 
                    // multiplicity >= 4 roots; we would've been able if we
                    // knew that a.multiplicity === 1 exactly and thus the code
                    // could still be improved slightly
                    if (a_ !== _a && a.multiplicity % 2 === 1) {
                        checkEvenAA();
                    }
                    // [a_,_b] → no root
                }
            }
            else if (_A * A_ < 0) {
                //---- CASE 2 _A⇑ | A_⇓   OR   _A⇓ | A_⇑
                //console.log('CASE 2');
                // - [_a,a_] → odd root(s)
                roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
                if (A_ * _B < 0) {
                    //---- CASE 2A: _A⇑ | A_⇓ | _B⇑   OR   _A⇓ | A_⇑ | _B⇓
                    //console.log('CASE 2A');
                    // [a_,_b] → single root
                    const [tS, tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
                    roots.push({ tS, tE, multiplicity: 1 });
                }
                else if (A_ * _B > 0) {
                    //---- CASE 2B: _A⇑ | A_⇓ | _B⇓   OR   _A⇓ | A_⇑ | _B⇑
                    //console.log('CASE 2B');
                    // [a_,_b] → no roots
                }
                else { // _B === 0
                    //console.log('CASE 2C');
                    // [a_,_b] → no roots
                }
            }
            else if (A_ === 0) {
                //---- CASE 3A A_0
                //console.log('CASE 3A');
                // [_a,a_] → rational root at a_
                // There cannot be a root between a_ and _b since _B !== 0
                if ( /*_a === a_ ||*/_A === 0) {
                    // multiple rational root at a_ OR both _A and A_ is 0
                    // so update multiplicity parity
                    roots.push({ tS: a.tS, tE: a.tE, multiplicity: a.multiplicity + 1 });
                }
                else {
                    // now _A and _B are both !== 0
                    if (_A * _B > 0) {
                        roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
                    }
                    else {
                        roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
                    }
                }
            }
            else { // _A === 0
                //---- CASE 3B _A0
                //console.log('CASE 3B');
                // A_ !== 0 here and _a !== a_
                // [_a,a_] → rational root at _a
                if (A_ * _B < 0) {
                    // [a_,_b] → single root
                    const [tS, tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
                    roots.push({ tS, tE, multiplicity: 1 });
                }
                else if (A_ * _B > 0) {
                    // [a_,_b] → no roots
                }
                // - [_a,a_] → 
                // B_ and A_ are both !== 0
                if (B_ * A_ > 0) {
                    roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
                }
                else {
                    roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
                }
            }
        }
        // Combine the root intervals if they are adjacent (they are not 
        // allowed to overlap)
        for (let i = 0; i < roots.length - 1; i++) {
            const r = roots[i];
            const r_ = roots[i + 1];
            if (r.tE >= r_.tS) {
                return joinRoots(roots);
            }
        }
        return roots;
        /**
         * Calculates and returns max 2nd derivative - calculated using something
         * akin to a Taylor expansion - could be improved by not taking absolute
         * values, but rather minimum mins. and maximum max values of f(s)?.
         * maxDdP = |f(s)| + δ|f'(s)| + δ^2|f''(s)| + ..., where δ = (a_ - _a),
         * s = _a and f is the second derivative of the current polynomial. We can
         * also potentially short circuit the maxDdP calculation after some terms,
         * the point being there are very likely many optimizations that can still
         * be done.
         *
         * @internal
         */
        function checkEvenAA() {
            //This was the old method when the function only supported lb = 0, ub = 1
            //-----------------------------------------------------------------------
            //const ddP0 = diffCount+2 > deg ? undefined : ps_[diffCount+2][0];
            //const maxDdP2 = 0;
            //for (const j=0; j<ddP0.length; j++) {
            //    // evaluate at 1
            //    maxDdP2 += abs(ddP0[j]);  // this is valid only if |lb| and |ub| <= 1
            //}
            const d = (a_ - _a) * onePlusEps;
            let mult = 1;
            let maxDdP = 0;
            for (let ddDiffCount = diffCount + 2; ddDiffCount <= deg; ddDiffCount++) {
                const p = ps_[ddDiffCount][0];
                const h = hornerWithRunningError(p, _a);
                const fs = all_roots_certified_abs(h[0]) + h[1];
                maxDdP += fs * mult;
                mult *= d * onePlusEps;
            }
            // maxDdP is now calculated
            const AMinMax = A_ > 0 ? all_roots_certified_min(_A, A_) : all_roots_certified_max(_A, A_);
            const δ = 2 * Number.EPSILON * all_roots_certified_max(1, all_roots_certified_abs(a_));
            const dMax = maxDdP * (2 * δ); // since the first derivative === 0 somewhere in [_a,a_]
            const yShift = A_ > 0 ? -dMax * 2 * δ : dMax * 2 * δ;
            const y = AMinMax + yShift;
            if (y * A_ < 0) {
                // possible even multiplicity root
                //console.log('A_, yShift', A_, yShift);
                //console.log(toCasStr(ps_[0][0]));
                //console.log('possible even multiplicty root: ', _a, a_);
                // The below multiplicity can really be any non-negative 
                // multiple of 2
                roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
            }
        }
    }
}
function joinRoots(rs) {
    const newRs = [];
    const r = rs[0];
    // make a clone of the first interval
    let curR = { tS: r.tS, tE: r.tE, multiplicity: r.multiplicity };
    for (let i = 0; i < rs.length - 1; i++) {
        const r = rs[i];
        const r_ = rs[i + 1];
        if (r.tE < r_.tS) {
            // they don't stick together
            newRs.push(curR);
            // make a clone of the next interval
            curR = { tS: r_.tS, tE: r_.tE, multiplicity: r_.multiplicity };
        }
        else {
            // they stick together - expand
            curR.tE = r_.tE;
            curR.multiplicity = r.multiplicity + r_.multiplicity;
        }
    }
    newRs.push(curR);
    return newRs;
}


;// ./src/roots/certified/all-roots-certified-simplified.ts

function allRootsCertifiedSimplified(p, lb = -Infinity, ub = Infinity, returnUndefinedForZeroPoly) {
    return allRootsCertified(p.map(c => [0, c]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}


;// ./node_modules/big-float-ts/node/double-expansion/e-to-double-double.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_double_double_compress = eCompress;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 */
function eToDd(e) {
    e = e_to_double_double_compress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len === 1) {
        return [0, e[0]]; // double-doubles have a fixed length of 2
    }
    return [e[len - 2], e[len - 1]]; // return only most significant parts
}

//# sourceMappingURL=e-to-double-double.js.map
;// ./src/change-variables/double-double/dd-taylor-shift-with-inp-err.ts

const { abs: dd_taylor_shift_with_inp_err_abs } = Math;
/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds that
 * has **not** been scaled by `γγ(3)` yet.
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
function ddTaylorShiftWithInpErr(p, h, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return [[], []];
    }
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = dd_taylor_shift_with_inp_err_abs(h);
    const q = p.slice();
    const q_ = p_.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];
            const hq = ddMultDouble2(h, qi1);
            const hq_ = _h * qi1_ + dd_taylor_shift_with_inp_err_abs(hq[1]);
            const qi = q[i];
            q[i] = ddAddDd(qi, hq);
            q_[i] = q_[i] + hq_ + dd_taylor_shift_with_inp_err_abs(q[i][1]);
        }
    }
    return [q, q_];
}


;// ./src/roots/mobius/mobius-precise.ts







const { abs: mobius_precise_abs, sign: mobius_precise_sign } = Math;
/**
 * Returns the number of sign changes in the polynomial coefficents after
 * applying a Mobius transformation to the given polynomial.
 *
 * * this is a specialized function used specifically by `isolateRoots`
 *
 * Applies a Mobius transformation to the given polynomial:
 * * p(x) -> (x + 1)^n * p((ax + b) / (x + 1))
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 *
 * This runs in `O(n^2)` arithmetic operations (where `n` is the degree) by
 * decomposing the Mobius map into elementary steps, rather than the `O(n^3)`
 * of expanding and summing `Σ cᵢ (ax + b)^i (x + 1)^(n-i)` directly.
 *
 * The decomposition (see https://math.stackexchange.com/questions/694565)
 * uses the identity `(ax + b)/(x + 1) = a + (b - a)/(x + 1)`, which yields
 *
 *   (x + 1)^n * p((ax + b)/(x + 1)) = S₁( R( Scₐ₋ᵦ( Sₐ(p) ) ) )
 *
 * where
 *   * `Sₕ(f) = f(x + h)`           is a Taylor shift (`O(n^2)`),
 *   * `Sc_s(f)` scales the coefficient of `xⁱ` by `sⁱ` (`O(n)`),
 *   * `R(f)` reverses the coefficient array, i.e. `xⁿ f(1/x)` (`O(n)`).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * **NOT** scaled by `γ1`
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ an array of numbers representing the absolute error bounds on the
 * coefficients of `pDd`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param getPExact defaults to `undefined`; a function returning the exact
 * polynomial (with coefficients given as Shewchuk expansions)
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 * @param A sign-certified evaluation of polynomial at the lower bound of the interval
 * @param B sign-certified evaluation of polynomial at the upper bound of the interval
 * @param failCount the number of times the Mobius transformation has failed to certify the sign
 *
 * @internal
 */
function mobiusAndNumSignChanges(p, p_, pDd, pDd_, getPExact) {
    return function mobiusPrecise_(a, b, A, B, failCount) {
        //-------------------------------------------
        // Taylor shift by `a`, i.e. p(x + a)
        //-------------------------------------------
        let [q, q_] = taylorShiftWithInpErr(p, a, p_);
        //---------------------------------------------------
        // Scale the coefficient of xⁱ by (b - a)ⁱ
        //---------------------------------------------------
        inplaceScaleWithInpErr(q, b - a, q_);
        //-------------------------------------------------------------
        // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
        //-------------------------------------------------------------
        q.reverse();
        q_.reverse();
        //-------------------------------------------
        // Taylor shift by 1, i.e. q(x + 1)
        //-------------------------------------------
        inplaceTaylorShiftBy1WithInpErr(q, q_);
        let numSignChangesMax = 0; // Max possible number of real sign changes
        let numUncertifyable = 0; // number of coefficients who's sign cannot be certified
        // The sign of `A` and `B` are both !== 0 and is certified since it is an
        // endpoint of the interval.
        let _s = mobius_precise_sign(A); // Sign is certified
        for (let i = 1; i < q.length - 1; i++) {
            let s = mobius_precise_sign(q[i]);
            const v = q[i];
            const err = q_[i] * γ1;
            if (mobius_precise_abs(v) <= err) {
                // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
                // we are actually allowed one uncertifyable coefficient (but **only** if numSignChanges
                // equals 1)!
                // Important: If we find max 1 "zero" and "numSignChangesMax" is 1 then
                // we can guarantee that there is exactly 1 root in the interval.
                numUncertifyable++;
                // If we encounter a "zero" we make its sign different than the
                // previous one so it can count as a sign change; this differs
                // from the usual way of counting sign changes.
                s = -_s;
            }
            if (s !== _s) {
                numSignChangesMax++;
                _s = s;
            }
        }
        const s = mobius_precise_sign(B); // Sign is certified
        if (s !== _s) {
            numSignChangesMax++;
        }
        if (numUncertifyable === 1 && numSignChangesMax === 1) {
            return 1;
        }
        if (numUncertifyable > 0) {
            return ddMobiusAndNumSignChanges(pDd, pDd_, a, b, A, B, failCount, getPExact);
        }
        return numSignChangesMax; // guaranteed OR need to split interval
    };
}
function ddMobiusAndNumSignChanges(pDd, pDd_, a, b, A, B, failCount, getPExact) {
    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let [q, q_] = ddTaylorShiftWithInpErr(pDd, a, pDd_);
    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    ddInplaceScaleWithInpErr(q, b - a, q_);
    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();
    q_.reverse();
    //-------------------------------------------
    // S₁: Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    [q, q_] = ddTaylorShiftWithInpErr(q, 1, q_);
    let numSignChanges = 0; // number of sign changes
    let numUncertifyable = 0; // number of coefficients who's sign cannot be certified
    // The sign of `A` and `B` are both !== 0 and is certified since it is an
    // endpoint of the interval.
    let _s = mobius_precise_sign(A);
    let failed = false;
    for (let i = 0; i < q.length - 1; i++) {
        // No error in the sign of the last coefficient (important for parity of sign changes)
        let s = mobius_precise_sign(q[i][1]);
        const err = q_[i] * γγ3;
        const c = q[i];
        if (err >= mobius_precise_abs(c[1])) {
            // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
            // we are actually allowed one uncertifyable coefficient (but **only** if `numSignChanges`
            // equals 1)!
            // Important: If we find max 1 "zero" and "numSignChangesMax" is 1 then
            // we can guarantee that there is exactly 1 root in the interval.
            numUncertifyable++;
            // If we encounter a "zero" we make its sign different than the
            // previous one so it can count as a sign change; this differs
            // from the usual way of counting sign changes.
            s = -_s;
        }
        if (s !== _s) {
            numSignChanges++;
            _s = s;
        }
    }
    const s = mobius_precise_sign(B); // Sign is certified
    if (s !== _s) {
        numSignChanges++;
    }
    if (numUncertifyable === 1 && numSignChanges === 1) {
        return 1; // **guaranteed** to have exactly one root in the interval
    }
    if (numUncertifyable === 0) {
        return numSignChanges;
    }
    return failCount > 1
        ? eMobiusAndNumSignChanges(getPExact, a, b, A, B)
        : -numSignChanges; // `failCount` is still 1, so we can try again after another split of the interval;
    // We need to split the interval into two subintervals since we
    // cannot guarantee the number of sign changes in the Mobius coefficients.
    // But, the sign of `A` and `B` are both !== 0 and certified so we *can* certify
    // the parity (and max value) of the number of sign changes!
}
function eMobiusAndNumSignChanges(getPExact, a, b, A, B) {
    const pE = getPExact();
    let q = eTaylorShift(pE, a);
    q = eScale(q, b - a);
    q.reverse();
    q = eTaylorShift(q, 1);
    //--------------------------------------------------------
    // Calc number of sign changes in the Mobius coefficients
    //--------------------------------------------------------
    let numSignChanges = 0; // number of sign changes
    let _s = mobius_precise_sign(A);
    for (let i = 1; i < q.length - 1; i++) {
        const c = q[i];
        let s = mobius_precise_sign(c[c.length - 1]); // Sign is certified (in exact precision)
        if (s !== _s && s !== 0) {
            numSignChanges++;
            _s = s;
        }
    }
    // Keep this to ensure parity of sign changes even when underflow occurs
    const s = mobius_precise_sign(B); // Sign is certified (up to over/underflow)
    if (s !== _s) {
        numSignChanges++;
    }
    return numSignChanges;
}

// exported for testing only


;// ./src/evaluate/double/horner-with-inp-error.ts
const { abs: horner_with_inp_error_abs } = Math;
/**
 * Returns the value of the polynomial `p` evaluated at `x` along with an
 * error bound on the result that has **NOT** yet been scaled by `γ1`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * on the input polynomial **NOT** yet scaled by `γ1`
 */
function HornerWithInpError(p, x, p_) {
    const _x = horner_with_inp_error_abs(x);
    let r̂ = p[0];
    let r̂_ = p_[0];
    for (let i = 1; i < p.length; i++) {
        const r̂x = r̂ * x;
        r̂ = r̂x + p[i];
        r̂_ = r̂_ * _x + horner_with_inp_error_abs(r̂x) + p_[i] + horner_with_inp_error_abs(r̂);
    }
    return [r̂, r̂_];
}


;// ./src/roots/descartes/isolate-roots.ts









const { abs: isolate_roots_abs, min: isolate_roots_min, max: isolate_roots_max, log2: isolate_roots_log2, ceil: isolate_roots_ceil } = Math;
const γγ3_γ1 = γγ3 / γ1; // ~ 3*u
/**
 * Returns a list of intervals isolating the roots of the given polynomial
 * within the given interval `[lb,ub]`.
 *
 * * the interval might be extended if roots fall close to its endpoints.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`; this polynomial is derived
 * from `pDd` as a double precision approximation
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ an array of numbers representing the absolute error bounds on the
 * coefficients of `pDd`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param lb the start of the interval to search for roots
 * @param ub the end of the interval to search for roots
 * @param getPExact defaults to `undefined`; a function returning the exact
 * polynomial (with coefficients given as Shewchuk expansions)
 *
 * @internal
 */
function isolateRoots(p, pDd, pDd_, lb, ub, getPExact) {
    /**
     * The error bound (that still needs to be multiplied by `γ(1)` of the double
     * precision coefficients.
     */
    // `E*γγ3_γ1` -> the new error need to be scaled by `γ1` and not `γγ3`
    // `abs(p[idx])` -> round-off from double-double to double precision
    const p_ = pDd_.map((E, idx) => E * γγ3_γ1 + isolate_roots_abs(p[idx]));
    //--------------------------------------------------------------------------
    // Make sure endpoints don't fall too close to roots as this drastically
    // slows down the root isolation process.
    //--------------------------------------------------------------------------
    const _lb_ = lb;
    const _ub_ = ub;
    let W = ub - lb;
    let A;
    let ea;
    while (true) {
        ([A, ea] = HornerWithInpError(p, lb, p_));
        if (isolate_roots_abs(A) > ea * γ1) { // if we can certify the sign of `p(t)`
            break;
        }
        lb -= W / 2;
        W *= 2;
    }
    let B;
    let eb;
    while (true) {
        ([B, eb] = HornerWithInpError(p, ub, p_));
        if (isolate_roots_abs(B) > eb * γ1) { // if we can certify the sign of `p(t)`
            break;
        }
        ub += W / 2;
        W *= 2;
    }
    //------------------------------------------------
    // Initial root interval with sign-certified endpoint values and a fail count.
    const Is = [[lb, ub, A, B, 0]];
    const Is_ = []; // Isolated root intervals will be stored here
    // let treeSize = 0;  // remove eventually
    const mobiusPrecise_ = mobiusAndNumSignChanges(p, p_, pDd, pDd_, getPExact);
    let errBound;
    let pDdTransposed;
    while (Is.length > 0) {
        // treeSize++;
        const I = Is.pop();
        const [a, b, A, B, failCount] = I;
        //----------------------------------------------------------------------
        // Descarte's rule of signs to count the number of roots in this interval
        //----------------------------------------------------------------------
        const varP = mobiusPrecise_(a, b, A, B, failCount);
        // If `varP < 0` we couldn't distinguish Mobius coefficients from `0`
        // without going to infinite precision.
        if (varP === 0) { // no roots in the open interval `(a,b)`
            continue;
        }
        if (varP === 1) { // exactly one root in this interval
            errBound = errBound || pDd_.map(E => E * γγ3);
            pDdTransposed = pDdTransposed || transposePoly(pDd);
            const r = refineCertified(pDdTransposed, errBound, a, b, A, B, getPExact, false);
            Is_.push({ tS: r[0], tE: r[1], multiplicity: 1 });
            continue;
        }
        let realFailCount = varP < 0 ? failCount + 1 : 0;
        //-----------------------------------------------------------------
        // **possibly** more than one root in this interval
        //-----------------------------------------------------------------
        const W = b - a;
        const minW = 2 * isolate_roots_abs(varP) * eps * isolate_roots_max(1, 2 ** isolate_roots_ceil(isolate_roots_log2(isolate_roots_max(isolate_roots_abs(a), isolate_roots_abs(b)))));
        if (W <= minW) {
            if (realFailCount === 0) {
                // `varP` is guaranteed to be correct (except it can be larger by a multiple of 2)
                // since the sign of `A` and `B` are both certified,
                Is_.push({ tS: a, tE: b, multiplicity: isolate_roots_abs(varP) });
                continue; // stop recursion when intervals are too small
            }
            realFailCount = Infinity; // split one last time
        }
        const [t, T] = admissablePoint(p, p_, pDd, pDd_, a, b, getPExact);
        // The sign of `T` is certified.
        Is.push([a, t, A, T, realFailCount]);
        Is.push([t, b, T, B, realFailCount]);
    }
    // treeSize; //?
    Is_.reverse();
    return Is_.filter(I => {
        const { tS, tE } = I;
        if (tE < _lb_ || tS > _ub_) {
            return false;
        }
        return true;
    });
}
function admissablePoint(p, p_, pDd, pDd_, a, b, getPExact) {
    // We don't use multipoint evaluation here since it is too slow for low order
    // polynomials but we need to find an "admissable" point to split the interval at.
    // * see [Computing Real Roots of Real Polynomials](https://arxiv.org/pdf/1308.4088) by Sagraloff
    // Algorithm: Admissible Point (note: their repeat-until loop should be repeat-while as they noted later)
    //-----------------------------------------------------------------
    const n = p.length - 1;
    let c = 0; // count of points tested so far
    let d = 1; // number of subintervals to split the interval into
    // Corollary 16: Sagraloff & Mehlhorn 2015 (arXiv:1308.4088):
    // The corollary starts with:
    // Let $$L \ge L_{I,0} := \log M\!\left(\min\left(|P(a)|, |P(b)|\right)^{-1}\right) + 2(n + 1) + 1||
    // Let L ≥ Lᵢ,₀ := log M(min(|P(a)|, |P(b)|)⁻¹) + 2(n + 1) + 1
    // Note: We don't use the above Corollary (or Corollary 20) since we don't care if endpoints
    // are close to zero (in fact, we prefer it) because we don't determine a bit-length precision beforehand;
    // rather, we increase the precision each time until we can certify the coefficient signs.
    // E.g. `t`s of points for `deg(p) === 4` for `I === [-0.5,1.5]`: [0.5, 0.25, 0.75, 0.125, 0.375]
    while (true) {
        d *= 2;
        for (let j = 1; j < d; j += 2) {
            c++;
            const t = a + (b - a) * (d + 2 * j) / (4 * d); // sample in the middle half [a+W/4, a+3W/4]
            const [T, e] = HornerWithInpError(p, t, p_);
            if (isolate_roots_abs(T) > e * γ1) {
                // If we can certify the sign of `p(t)` then don't waste time
                // looking for the best point.
                return [t, T];
            }
            if (c > n) {
                // console.log('failed to find an admissable point in double precision');
                return ddAdmissablePoint(pDd, pDd_, a, b, getPExact);
            }
        }
    }
}
function ddAdmissablePoint(pDd, pDd_, a, b, getPExact) {
    // E.g. `t`s of points for `deg(p) === 4` for `I === [-0.5,1.5]`: [0.5, 0.25, 0.75, 0.125, 0.375]
    const n = pDd.length - 1;
    let c = 0; // count of points tested so far
    let d = 1; // number of subintervals to split the interval into
    while (true) {
        d *= 2;
        for (let j = 1; j < d; j += 2) {
            c++;
            const t = a + (b - a) * (d + 2 * j) / (4 * d);
            const [T, e] = ddHornerWithInpError(pDd, t, pDd_);
            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if (isolate_roots_abs(T[1]) > e * γγ3) {
                return [t, T[1]];
            }
            if (c > n) {
                // console.log('failed to find an admissable point in double-double precision');
                const pE = getPExact();
                return eAdmissablePoint(pE, a, b);
            }
        }
    }
}
function eAdmissablePoint(pE, a, b) {
    // E.g. of points for degree(p) === 4: [0.5, 0.25, 0.75, 0.125, 0.375]
    let d = 1; // number of subintervals to split the interval into
    while (true) {
        d *= 2;
        for (let j = 1; j < d; j += 2) {
            const t = a + (b - a) * (d + 2 * j) / (4 * d);
            const T = eCompress(eHorner(pE, t)); // no error
            const $T = T[T.length - 1];
            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if ($T !== 0) { // no error
                return [t, $T];
            }
            // if (c > n) {
            //   // It should not be possible to get to this point since we
            //   // tested more points than the degree of the polynomial so
            //   // at least one of the roots should have been resolved from zero.
            // }
        }
    }
}


;// ./src/roots/descartes/roots.ts




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
 * @param tryReduceInterval defaults to `true`; if `true` (or if `lb` or `ub`
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
function roots(pDd, lb = -Infinity, ub = +Infinity, pDd_, getPExact, tryReduceInterval = true) {
    // if (pDd === undefined) { pDd = p.map(c => [0,c]); }
    if (typeof pDd[0] === 'number') {
        pDd = pDd.map(c => [0, c]);
    }
    // We cache `pExact`
    let pExact = undefined;
    const getPExact_ = () => {
        // If `getPExact` is not specified then assume the given double-double 
        // precision coefficient polynomial is exact.
        if (getPExact === undefined) {
            return pDd;
        }
        // If `getPExact` is specified then use it and cache the result.
        if (pExact === undefined) {
            pExact = getPExact();
        }
        return pExact;
    };
    // if `pDd_` is not specified then assume there is no error
    pDd_ = pDd_ || new Array(pDd.length).fill(0); // no error
    //----------------------------------------------------------------------
    // Remove leading zero coefficients 
    //----------------------------------------------------------------------
    ({ pDd, pDd_, pExact } = removeLeadingZeroCoeffs(pDd, pDd_, getPExact_, γγ3));
    if (pDd.length === 0) {
        return undefined; // return `undefined` for the zero polynomial (of degree -1)
    }
    else if (pDd.length === 1) {
        return []; // return `[]` for a (a non-zero) degree 0 polynomial
    }
    const p = pDd.map(c => c[0] + c[1]);
    if (tryReduceInterval || lb === -Infinity || ub === Infinity) {
        [lb, ub] = reduceInterval(lb, ub, p);
        if (lb === ub) {
            return [{ tS: lb, tE: ub, multiplicity: p.length - 1 }];
        }
    }
    return isolateRoots(p, pDd, pDd_, lb, ub, getPExact_);
}

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

;// ./src/roots/certified/refine-k1.ts





const { abs: refine_k1_abs, min: refine_k1_min, max: refine_k1_max, log2: refine_k1_log2, ceil: refine_k1_ceil } = Math;
/**
 * Returns once compensated root(s) (bar underflow / overflow) given a root
 * interval previously calculated using [[allRootsCertified]].
 *
 * * root interval endpoints are returned in double-double precision
 *
 * * 'once-compensated' here means that the typical root interval, `W`,
 * (`~ 2*Number.EPSILON` at `1`) is reduced to `W**2`; if multiple distinct
 * roots were present in the original interval they may be resolved to individual
 * intervals
 *
 * @param ri a root interval previously calculated
 * @param p the exact polynomial with coefficients given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function refineK1(ri, p) {
    const { tS, tE } = ri;
    const W = tE - tS;
    if (W === 0) {
        return [{
                tS: [0, tS],
                tE: [0, tS],
                multiplicity: ri.multiplicity
            }];
    }
    const δ = 2 ** refine_k1_ceil(refine_k1_log2(W)); // Ensure scale is a power of 2
    // Translate the polynomial such that the root is within δ from 0, then
    // scale it such that the roots stay <= 1, i.e. is in [0,1]
    const pExactK1 = eChangeVariablesLinear(p, δ, tS);
    // reduce the polynomial to double-double precision for faster root finding
    const pDdK1 = pExactK1.map(eToDd);
    // update the double-double precision error bound - it is simply the error 
    // in rounding the exact coefficients to double-double precision
    const errBoundK1 = pDdK1.map(c => c[1] * (eps ** 2));
    const getPExactK1 = () => pExactK1;
    // const risLo = allRootsCertified(pDdK1, 0, 1, errBoundK1, getPExactK1)!;
    const risLo = roots(pDdK1, 0, 1, errBoundK1, getPExactK1);
    const ris = [];
    for (const riLo of risLo) {
        ris.push({
            tS: twoSum(tS, riLo.tS * δ),
            tE: twoSum(tS, riLo.tE * δ),
            multiplicity: riLo.multiplicity
        });
    }
    return ris;
}


;// ./src/roots/deflate/b-deflate.ts
/**
 * Deflates the given polynomial exactly by removing a factor `(x - r)`,
 * where `r` is a root of the polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * bDeflate([1n, -5n, 8n, -4n], 2n);  //=> [1n, -3n, 2n]
 * bDeflate([1n, -3n, 2n], 2n);      //=> [1n,-1n]
 * bDeflate([1n, -1n], 1n);         //=> [1n]
 * ```
 *
 * @doc
 */
function bDeflate(p, root) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(p[i] + root * bs[i - 1]);
    }
    return bs;
}


;// ./src/roots/deflate/dd-deflate.ts


/**
 * Deflates the given polynomial *approximately* by removing a factor `(x - r)`,
 * where `r` is a root of the polynomial.
 *
 * * **non-exact:** the deflation is done in double-double precision - it is not
 * possible to deflate a root exactly in most cases and round-off will thus
 * occur - use only if approximate deflation is acceptable
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], [0,2]); //=> [[0,1], [0,-3], [0,2]]
 * ddDeflate([[0,1], [0,-3], [0,2], [0,2]);          //=> [[0,1], [0,-1]]
 * ddDeflate([[0,1], [0,-1]], [0,1]);                //=> [[0,1]]
 * ```
 *
 * @doc
 */
function ddDeflate(p, root) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(
        // p[i] + root*bs[i-1]
        ddAddDd(p[i], ddMultDouble2(root, bs[i - 1])));
    }
    return bs;
}


;// ./src/roots/deflate/dd-deflate-with-running-error.ts



const { abs: dd_deflate_with_running_error_abs } = Math;
const dd_deflate_with_running_error_3 = γγ(3);
/**
 * Returns a deflated version of the given polynomial *approximately* by
 * removing a factor (x - t). Also returns an coefficient-wise absolute error
 * bound.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pE the coefficient-wise absolute error of the input polynomial that
 * still need to be multiplied by γγ3, i.e. it is `γγ3` times too big.
 * @param t an evaluation point of the polynomial.
 *
 * @doc
 */
function ddDeflateWithRunningError(p, pE, t) {
    //--------------------------------------------------------------------------
    // `var` -> a variable
    // `$var` -> the double precision approximation to `var`
    // `_var` -> the absolute value of $var (a prefix underscore on a variable means absolute value)
    // `var_` -> the error in var (a postfix underscore means error bound but should still be multiplied by 3*γ²)
    // `_var_` -> means both absolute value and absolute error bound
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b is double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    // * the returned errors need to be multiplied by 3γ² to get the true error
    // * can use either `$var` or `var[var.length-1]` (the approx value) in error calculations
    //   due to multiplication by 3*γ² and not 3*u²
    //--------------------------------------------------------------------------
    const d = p.length - 1;
    const bs = [p[0]]; // coefficients
    let b_ = pE[0]; // running error
    const bEs = [b_]; // coefficient-wise error bound
    for (let i = 1; i < d; i++) {
        // p[i] + t*bs[i-1];
        const a = bs[i - 1];
        const $m = t * a[1];
        const _t = dd_deflate_with_running_error_abs(t);
        const m_ = _t * b_ + dd_deflate_with_running_error_abs($m);
        const pi = p[i];
        const p_ = pE[i];
        b_ = p_ + m_ + dd_deflate_with_running_error_abs(pi[1] + $m);
        const b = ddAddDd(pi, ddMultDouble2(t, a));
        bs.push(b);
        bEs.push(b_);
    }
    return {
        coeffs: bs,
        errBound: bEs.map(e => dd_deflate_with_running_error_3 * e)
    };
}


;// ./src/roots/deflate/deflate.ts
/**
 * Deflates the given polynomial *approximately* by removing a factor `(x - r)`,
 * where `r` is a root of the polynomial.
 *
 * * **non-exact:** the deflation is done in double precision - it is not
 * possible to deflate a root exactly in most cases and round-off will thus
 * occur - use only if approximate deflation is acceptable
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * deflate([1, -5, 8, -4], 2);  //=> [1, -3, 2]
 * deflate([1, -3, 2], 2);      //=> [1,-1]
 * deflate([1, -1], 1);         //=> [1]
 * ```
 *
 * @doc
 */
function deflate(p, root) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(p[i] + root * bs[i - 1]);
    }
    return bs;
}


;// ./src/roots/deflate/e-deflate.ts


/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @doc
 */
function eDeflate(p, t) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(
        // p[i] + root*bs[i-1]
        fastExpansionSum(p[i], scaleExpansion2(t, bs[i - 1])));
    }
    return bs;
}


;// ./src/roots/from-roots/bigint/b-from-roots.ts

/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)
 *
 * * currently, only integer roots are allowed
 *
 * @param roots an array of roots
 *
 * @example
 * ```typescript
 * fromRoots([1n,2n,3n,3n]); //=> [1n, -9n, 29n, -39n, 18n]
 * ```
 *
 * @doc
 */
function bFromRoots(roots) {
    let p = [1n];
    for (let i = 0; i < roots.length; i++) {
        p = bMultiply(p, [1n, -roots[i]]);
    }
    return p;
}


;// ./src/roots/from-roots/expansion/e-from-roots.ts


const { abs: e_from_roots_abs } = Math;
/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors `(x - root1)(x - root2)` in Shewchuck expansions
 * and rounding back to double-double precision.
 *
 * Returns an object with the following properties:
 *   - `pE`: a the Shewchuck expansion polynomial
 *   - `pDd`: a double-double precision polynomial (that is the expansion polynomial with *truncated* coefficients)
 *   - `pDd_`: the coefficient-wise error polynomial on `pDd` (**not** scaled by `γγ(3)` yet)
 *   - `p`: a double precision polynomial (that is the expansion polynomial with *rounded* coefficients)
 *   - `p_`: the coefficient-wise error polynomial on `p` (**not** scaled by `γ(1)` yet)
  *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots as Shewchuk expansions,
 * e.g. `[[0.5],[0.3]]` represents the roots `0.5` and `0.3`
 *
 * @doc
 */
function eFromRoots(roots) {
    let pE = [[1]];
    for (let i = 0; i < roots.length; i++) {
        pE = eMultiply(pE, [[1], eNegativeOf(roots[i])]);
    }
    pE = pE.map(eCompress);
    const pDd = pE.map(eToDd);
    const pDd_ = pE.map(c => e_from_roots_abs(c[c.length - 1]) / 3 // `/ 3` since the error is ~ `γγ1` and not `γγ3`
    );
    const p = pE.map(c => eEstimate(c));
    const p_ = pE.map((_, idx) => e_from_roots_abs(p[idx]));
    return { pE, pDd, pDd_, p, p_ };
}


;// ./src/roots/naive/brent-poly.ts

const brent_poly_Horner = Horner;
const brent_poly_eps = Number.EPSILON;
const brent_poly_u = brent_poly_eps / 2;
const { abs: brent_poly_abs, max: brent_poly_max } = Math;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given polynomial using Brent's Method.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method), except that it is specialzed to polynomial evaluation
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON/2 * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *  * guaranteed converge (unlike the Newton and other so-called single-point
 * methods),
 *  * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 *  * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa (may be left out - will be calculated automatically) the result of
 * evaluating the input polynomial at `a`
 * @param fb (may be left out - will be calculated automatically) the result of
 * evaluating the input polynomial at `b`
 *
 * @example
 * ```typescript
 * const p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * const a = 2.2;
 * const b = 3.8;
 * brent(p,a,b); //=> 3.000000000000003
 * b = 3.1;
 * brent(p,a,b); //=> 3.000000000000001
 * ```
 *
 * @doc
 */
function brentPoly(p, lb, ub, fa = brent_poly_Horner(p, lb), fb = brent_poly_Horner(p, ub)) {
    // Precondition: fa, fb !== 0
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while (true) {
        if (brent_poly_abs(fc) < brent_poly_abs(fb)) {
            a = b;
            b = c;
            c = a;
            fa = fb;
            fb = fc;
            fc = fa;
        }
        const δ = 2 * brent_poly_u * brent_poly_max(1, brent_poly_abs(a), brent_poly_abs(b));
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        if (brent_poly_abs(m) <= δ) {
            // uncomment below if range to be returned
            //return b < c ? [b,c] : [c,b];
            // uncomment below if leftmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if rightmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if any guess to be returned
            return b;
        }
        if (brent_poly_abs(e) < δ || brent_poly_abs(fa) <= brent_poly_abs(fb)) {
            e = m;
            d = e;
        }
        else {
            let s = fb / fa;
            let p;
            let q;
            if (a === c) {
                p = 2 * m * s;
                q = 1 - s;
            }
            else {
                q = fa / fc;
                const r = fb / fc;
                p = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < p) {
                q = -q;
            }
            else {
                p = -p;
            }
            s = e;
            e = d;
            if (2 * p < 3 * m * q - brent_poly_abs(δ * q) && p < brent_poly_abs(0.5 * s * q)) {
                d = p / q;
            }
            else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < brent_poly_abs(d)) {
            b = b + d;
        }
        else if (0 < m) {
            b = b + δ;
        }
        else {
            //b = b - eps;
            b = b - δ;
        }
        fb = brent_poly_Horner(p, b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }
        if (fb === 0) {
            return b;
        }
        if (fb * fc > 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


;// ./src/roots/naive/all-roots.ts






/**
 *  * ❗**DEPRECATED**❗
 *
 * * Use **`roots`** instead, it is faster (and certified):
 * * `allRoots(p)` becomes `roots(p)!.map(r => (r.tE + r.tS) / 2)`
 * * `allRoots(p,a,b)` becomes `roots(p,a,b)!.map(r => (r.tE + r.tS) / 2)`
 *
 * Find and return all roots of the given polynomial in the given interval.
 *
 * * an empty array is returned for a constant or the zero polynomial
 *
 * * **non-exact:** roots are found 'naively' using double-precision arithmetic
 * and accuracy will thus depend on the condition number around the root - use
 * [[allRootsCertifiedSimplified]] or [[allRootsCertified]] instead if certified
 * root bounds are required (it is about 3x slower, but still very fast!)
 *
 * * close (where the definition of closeness depends on the condition
 * number) or multiple *even* roots can be returned as 0, 1 or more close
 * roots, whereas close or multiple *odd* roots are guaranteed to return *at
 * least 1 root*
 *
 * * optimized for polynomials of degree 1 to about 30
 *
 * * roots are refined using the celebrated Brent's Method (and evaluated using
 * Horner's Method) until a root interval is found with
 * width `<= eps * max(1, 2^⌈log₂r⌉)`, where `eps = Number.EPSILON` and
 * `r` is a root
 *
 * * **ordered:** the returned roots are ordered from lowest to highest
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param lb defaults to `-Infinity`; lower bound of roots to be
 * returned
 * @param ub defaults to `Infinity`; upper bound of roots to be
 * returned
 *
 * @doc
 */
function allRoots(p, lb = -Infinity, ub = Infinity) {
    p = removeLeadingZeros(p);
    //---- count and remove roots at zero
    let numZerosAtZero = 0;
    while (p[p.length - 1] === 0) {
        p = p.slice(0, -1);
        numZerosAtZero++;
    }
    //------------------------
    // return an empty array for a constant or the zero polynomial
    if (p.length <= 1) {
        const roots = [];
        for (let j = 0; j < numZerosAtZero; j++) {
            roots.push(0);
        }
        return roots;
    }
    if (lb === -Infinity) {
        lb = negativeRootLowerBound_LMQ(p);
    }
    if (ub === Infinity) {
        ub = positiveRootUpperBound_LMQ(p);
    }
    // Get all derivatives, i.e. 
    // ps === [p, dp, ddp, ..., constant]
    //        [0,  1,   2, ..., deg     ]
    const ps = [p];
    for (let i = 1; i <= p.length - 1; i++) {
        ps.push(differentiate(ps[i - 1]));
    }
    //const δ = Math.max(2*eps, 2*eps * Math.max(Math.abs(lb), Math.abs(ub)));
    /** root intervals */
    let is = [];
    // loop: ps[diffCount] === [linear, quadratic, ..., deg]
    for (let diffCount = p.length - 2; diffCount >= 0; diffCount--) {
        // Get roots within intervals:
        // ---------------------------
        // Finds and returns all roots of the given polynomial within the given 
        // intervals, starting from the lower bound (lb) and ending at the upper
        // bound (ub)
        const p = ps[diffCount];
        const roots = [];
        let _a_ = lb;
        let _A_ = Horner(p, _a_);
        // if lower bound value is zero and this is the last iteration with 
        // p === the original polynomial then push the root at the lower bound
        if (_A_ === 0 && diffCount === 0) {
            roots.push(lb);
        }
        for (let i = 0; i < is.length; i++) {
            const _b_ = is[i];
            const _B_ = Horner(p, _b_);
            // if there is a root at the right interval then add it
            if (_B_ === 0) {
                roots.push(_b_);
            }
            else if (_A_ * _B_ < 0) {
                roots.push(brentPoly(p, _a_, _b_, _A_, _B_));
            }
            _a_ = _b_;
            _A_ = _B_;
        }
        const _B_ = Horner(p, ub);
        if (_A_ * _B_ < 0) {
            roots.push(brentPoly(p, _a_, ub, _A_, _B_));
        }
        // if upper bound value is zero and this is the last iteration with 
        // p === the original polynomial then push the root at the upper bound
        if (_B_ === 0 && diffCount === 0) {
            roots.push(ub);
        }
        is = roots;
    }
    if (numZerosAtZero > 0 && lb <= 0 && ub >= 0) {
        // at this point the existing intervals, `is`, are sorted
        // find the insertion spot and insert the zero roots to keep the roots
        // sorted
        const isWithZeroRoots = [];
        let zerosInserted = false;
        for (let i = 0; i < is.length; i++) {
            if (!zerosInserted && is[i] >= 0) {
                // push the zero roots
                for (let j = 0; j < numZerosAtZero; j++) {
                    isWithZeroRoots.push(0);
                }
                zerosInserted = true;
            }
            isWithZeroRoots.push(is[i]);
        }
        if (!zerosInserted) {
            // push the zero roots
            for (let j = 0; j < numZerosAtZero; j++) {
                isWithZeroRoots.push(0);
            }
        }
        return isWithZeroRoots;
    }
    return is;
}


;// ./src/roots/naive/bisection.ts
const { abs: bisection_abs, max: bisection_max } = Math;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using the
 * [Bisection Method](https://en.wikipedia.org/wiki/Bisection_method) algorithm.
 *
 * * any function can be supplied (it does not even have to be continuous) as
 * long as the root is bracketed.
 *
 * * this function has no advantages above Brent's method except for its
 * simpler implementation and can be slower. Use [[brentPoly]] or [[brent]]
 * instead.
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * @param f the function for which the root is sought
 * @param a the lower limit of the search interval
 * @param b the upper limit of the search interval
 *
 * @example
 * ```typescript
 * const p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * const f = t => Horner(p,t);
 * bisection(f,2.2,3.8); //=> 3
 * bisection(f,2.2,3.1); //=> 3.0000000000000044
 * ```
 *
 * @doc
 */
function bisection(f, a, b) {
    if (b < a) {
        [a, b] = [b, a]; // Swap a and b 
    }
    const fa = f(a);
    const fb = f(b);
    if (a === b) {
        if (fa !== 0) {
            // Root is not bracketed - this is a precondition.
            throw new Error('Root not bracketed');
        }
        // the root is already found.
        return a;
    }
    if (fa === 0) {
        return a;
    }
    if (fb === 0) {
        return b;
    }
    if (fa * fb > 0) {
        // Root is not bracketed - this is a precondition.
        throw new Error('Root not bracketed');
    }
    while (true) {
        const c = a + (b - a) / 2; // Take midpoint
        const fc = f(c);
        if (fc === 0) {
            return c;
        }
        if (fa * fc < 0) {
            b = c;
        }
        else {
            a = c;
        }
        const δ = 2 * Number.EPSILON * bisection_max(1, bisection_abs(a), bisection_abs(b));
        if (Math.abs(a - b) <= δ) {
            return b;
        }
    }
}


;// ./src/roots/naive/brent.ts
const brent_eps = Number.EPSILON;
const { abs: brent_abs, max: brent_max } = Math;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using Brent's Method. Any function can be supplied (it
 * does not even have to be continuous) as long as the root is bracketed.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 *   as Brent's Method)
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *   - guaranteed converge (unlike the Newton and other so-called single-point methods),
 *   - converges in a reasonable number of iterations even for highly contrived
 *     functions (unlike Dekker's Method) and
 *   - nearly always converges fast, i.e. super-linearly (unlike the Secant and
 *     Regula-Falsi methods).
 *
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 *
 * @param f the function for which the root is sought.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 *
 * @example
 * ```typescript
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = t => Horner(p,t);
 * brent(f,2.2,3.8); //=> 3.000000000000003
 * brent(f,2.2,3.1); //=> 3.000000000000001
 * ```
 *
 * @doc
 */
function brent(f, lb, ub) {
    // Precondition: fa, fb !== 0
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let fa = f(a);
    let fb = f(b);
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while (true) {
        if (brent_abs(fc) < brent_abs(fb)) {
            a = b;
            b = c;
            c = a;
            fa = fb;
            fb = fc;
            fc = fa;
        }
        const δ = 2 * brent_eps * brent_max(1, brent_abs(a), brent_abs(b));
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        if (brent_abs(m) <= δ) {
            // uncomment below if range to be returned
            //return b < c ? [b,c] : [c,b];
            // uncomment below if leftmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if rightmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if any guess to be returned
            return b;
        }
        if (brent_abs(e) < δ || brent_abs(fa) <= brent_abs(fb)) {
            e = m;
            d = e;
        }
        else {
            let s = fb / fa;
            let p;
            let q;
            if (a === c) {
                p = 2 * m * s;
                q = 1 - s;
            }
            else {
                q = fa / fc;
                const r = fb / fc;
                p = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < p) {
                q = -q;
            }
            else {
                p = -p;
            }
            s = e;
            e = d;
            if (2 * p < 3 * m * q - brent_abs(δ * q) && p < brent_abs(0.5 * s * q)) {
                d = p / q;
            }
            else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < brent_abs(d)) {
            b = b + d;
        }
        else if (0 < m) {
            b = b + δ;
        }
        else {
            //b = b - eps;
            b = b - δ;
        }
        fb = f(b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }
        if (fb === 0) {
            return b;
        }
        if (fb * fc > 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


;// ./src/roots/naive/quadratic-roots.ts
const { sqrt: quadratic_roots_sqrt } = Math;
/**
 * Floating-point-stably calculates and returns the ordered quadratic roots of
 * the given quadratic polynomial.
 *
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 * * **non-exact:** it is important to note that even though the roots are
 * calculated in a stable way they are still subject to round-off
 * * might be slightly faster than calling [[allRoots]].
 *
 * @param p a quadratic polynomial with coefficients given as an array
 * of double floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the quadratic `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 * ```
 *
 * @doc
 */
function quadraticRoots(p) {
    const [a, b, c] = p;
    const _D = b * b - 4 * a * c;
    if (_D < 0) {
        // No real roots;
        return [];
    }
    if (_D === 0) {
        return [-b / (2 * a)];
    }
    const D = quadratic_roots_sqrt(_D);
    if (b >= 0) {
        const root1 = (-b - D) / (2 * a);
        const root2 = (2 * c) / (-b - D);
        return root1 < root2
            ? [root1, root2]
            : [root2, root1];
    }
    const root1 = (2 * c) / (-b + D);
    const root2 = (-b + D) / (2 * a);
    return root1 < root2
        ? [root1, root2]
        : [root2, root1];
}


;// ./src/roots/root-bounds/root-magnitude-upper-bound-fujiwara.ts
const { abs: root_magnitude_upper_bound_fujiwara_abs, max: root_magnitude_upper_bound_fujiwara_max } = Math;
/**
 * Returns an upper bound on the magnitude (absolute value) of the complex
 * roots of the given polynomial using the near-optimal Fujiwara bound.
 *
 * * the bound includes complex roots.
 * * the bound is quite tight
 *
 * * see [Wikipedia](https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#Other_bounds)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 * ```
 *
 * @doc
 */
function rootMagnitudeUpperBound_fujiwara(p) {
    if (p.length <= 1) {
        return 0;
    }
    const d = p.length - 1;
    const an = p[0];
    const bs = [];
    for (let i = 1; i < d; i++) {
        bs.push((root_magnitude_upper_bound_fujiwara_abs(p[i] / an)) ** (1 / i));
    }
    bs.push((root_magnitude_upper_bound_fujiwara_abs(p[d] / 2 * an)) ** (1 / d));
    return 2 * root_magnitude_upper_bound_fujiwara_max(...bs);
}


;// ./src/roots/root-bounds/root-magnitude-upper-bound-rouche.ts

/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem
 * with k = n.
 *
 * * fast but the bound is not very tight
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function rootMagnitudeUpperBound_rouche(p) {
    if (p.length <= 1) {
        return 0;
    }
    return 1 + (pInfNorm(p.slice(1)) / p[0]);
}


;// ./src/roots/sturm/bigint/b-sign-changes.ts
/**
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bSignChanges([1n,2n,-3n,0n,0n,3n,-1n]); //=> 3
 * ```
 *
 * @doc
 */
function bSignChanges(p) {
    const d = p.length - 1;
    if (d < 1) {
        return 0;
    }
    let r = 0;
    let j = 0;
    while (p[j] === 0n) {
        j++;
    }
    let _s = p[j] < 0n ? -1 : +1;
    for (let i = j + 1; i < d + 1; i++) {
        const s = p[i] === 0n ? 0 : p[i] < 0n ? -1 : +1;
        if (s !== _s && s !== 0) {
            r++;
            _s = s;
        }
    }
    return r;
}


;// ./src/roots/sturm/bigint/b-num-roots.ts



/**
 * Returns the *exact* number of *distinct* real roots in the interval `(-∞,+∞)`
 * of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [n1, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function bNumRoots(p) {
    const ps = bSturmChain(p);
    const as = ps.map(p => bDegree(p) % 2 === 0 ? p[0] : -p[0]);
    const bs = ps.map(p => p[0]);
    return bSignChanges(as) - bSignChanges(bs);
}


;// ./src/roots/sturm/bigint/b-num-roots-0-1.ts



/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bNumRootsIn01(p) {
    // Check for root at 0
    let numRootsAt0 = 0;
    while (p.length > 0 && p[p.length - 1] === 0n) {
        p = p.slice(0, p.length - 1);
        numRootsAt0++;
    }
    const ps = bSturmChain(p);
    const as = ps.map(p => p[p.length - 1]); // evaluate at 0
    const bs = ps.map(p => bEvaluateAt1(p)); // evaluate at 1
    return bSignChanges(as) - bSignChanges(bs) + numRootsAt0;
}


;// ./src/roots/sturm/bigint/b-num-roots-in-range.ts




/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20n,-11n);  //=> 0
 * bNumRootsInRange(p,-11n,-9n);   //=> 1
 * bNumRootsInRange(p,-11n,5n);    //=> 4
 * ```
 *
 * @doc
 */
function bNumRootsInRange(p, a, b) {
    // Check for root at `a`
    let numRootsAtA = 0;
    while (p.length > 0 && bHorner(p, a) === 0n) {
        p = bDeflate(p, a);
        numRootsAtA++;
    }
    const ps = bSturmChain(p);
    const as = ps.map(p => bHorner(p, a));
    const bs = ps.map(p => bHorner(p, b));
    return bSignChanges(as) - bSignChanges(bs) + numRootsAtA;
}


;// ./src/roots/sturm/double/num-roots.ts


/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval `(-∞,+∞)` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function numRoots(p) {
    return bNumRoots(scaleFloatsToBigints(p));
}


;// ./src/roots/sturm/double/num-roots-in-0-1.ts


/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function numRootsIn01(p) {
    return bNumRootsIn01(scaleFloatsToBigints(p));
}


;// ./src/roots/sturm/double/num-roots-in-range.ts



const { abs: num_roots_in_range_abs } = Math;
/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11);  //=> 0
 * numRootsInRange(p,-11,-9);   //=> 1
 * numRootsInRange(p,-11,3.5);  //=> 3
 * numRootsInRange(p,-11,5);    //=> 4
 * ```
 *
 * @doc
 */
function numRootsInRange(p, a, b) {
    const [A, B] = scaleFloatsToBigints([a, b]);
    const maxIdx = num_roots_in_range_abs(a) >= num_roots_in_range_abs(b) ? 0 : 1;
    const v = [a, b][maxIdx];
    const V = [A, B][maxIdx];
    const d = p.length;
    const s = v / Number(V);
    let pB = scaleFloatsToBigints(p);
    if (s < 1) {
        const S = BigInt(1 / s); // exact division
        pB = pB.map(c => c * (S ** BigInt(d)));
        pB = bInvScale(pB, S);
    }
    else {
        pB = bScale(pB, BigInt(s));
    }
    return bNumRootsInRange(pB, A, B);
}


;// ./src/roots/sturm/double/sign-changes.ts
const { sign: sign_changes_sign } = Math;
/**
 * * `signChanges` is identical to `descartes`
 *
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * **precondition:** the polynomial leading coefficient must be non-zero.
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * signChanges([1,2,-3,0,0,3,-1]); //=> 3
 * ```
 *
 * @doc
 */
const descartes = (/* unused pure expression or super */ null && (signChanges));
/**
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * signChanges([1,2,-3,0,0,3,-1]); //=> 3
 * ```
 *
 * @doc
 */
function signChanges(p) {
    const d = p.length - 1;
    if (d < 1) {
        return 0;
    }
    let r = 0;
    let j = 0;
    while (p[j] === 0) {
        j++;
    }
    let _s = sign_changes_sign(p[j]);
    for (let i = j + 1; i < d + 1; i++) {
        const s = sign_changes_sign(p[i]);
        if (s !== _s && s !== 0) {
            r++;
            _s = s;
        }
    }
    return r;
}


;// ./src/util/bigint/b-sum.ts
/**
 * Returns the sum of an array of `bigint`s.
 *
 * * **not optimized** for performance
 *
 * @param a
 */
function bSum(a) {
    let sum = 0n;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}


;// ./src/roots/sturm/expansion/e-num-roots.ts



/**
 * Returns the *exact* number of *distinct* real roots in the open interval (-∞,+∞)
 * of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function eNumRoots(p) {
    return bNumRoots(scaleFloatssToBigintss(p).map(bSum));
}


;// ./src/roots/sturm/expansion/e-num-roots-0-1.ts



/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eNumRootsIn01(p) {
    return bNumRootsIn01(scaleFloatssToBigintss(p).map(bSum));
}


;// ./src/roots/sturm/expansion/e-num-roots-in-range.ts





const { abs: e_num_roots_in_range_abs, round: e_num_roots_in_range_round, log2: e_num_roots_in_range_log2 } = Math;
/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `(a,b)` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound given as a Shewchuk expansion
 * @param b an upper bound given as a Shewchuk expansion
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRootsInRange(p,[-20],[-11]); //=> 0
 * eNumRootsInRange(p,[-11],[-9]);  //=> 1
 * eNumRootsInRange(p,[-11],[3.5]); //=> 3
 * eNumRootsInRange(p,[-11],[5]);   //=> 4
 * ```
 *
 * @doc
 */
function eNumRootsInRange(p, a, b) {
    a = eCompress(a);
    b = eCompress(b);
    const [A, B] = scaleFloatssToBigintss([a, b]).map(bSum);
    const minIdx = e_num_roots_in_range_abs(a[a.length - 1]) <= e_num_roots_in_range_abs(b[b.length - 1]) ? 0 : 1;
    const v = [a, b][minIdx];
    const V = [A, B][minIdx];
    const d = p.length;
    let s; // a power of 2
    const _s = v[v.length - 1] === 0 ? 1 : v[v.length - 1] / Number(V);
    s = 2 ** e_num_roots_in_range_round(e_num_roots_in_range_log2(_s)); // exact
    let pB = scaleFloatssToBigintss(p).map(bSum);
    if (s < 1) {
        const S = BigInt(1 / s); // exact division
        pB = pB.map(c => c * (S ** BigInt(d)));
        pB = bInvScale(pB, S);
    }
    else {
        pB = bScale(pB, BigInt(s));
    }
    return bNumRootsInRange(pB, A, B);
}


;// ./src/roots/sturm/expansion/e-sign-changes.ts

const { sign: e_sign_changes_sign } = Math;
/**
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * * this function is often called `Descartes` in the literature
 *
 * * returns an upper bound of the number of *positive* real roots of the given
 * polynomial
 *
 * * the upper bound returned is always a non-negative multiple of two
 * (i.e. 0, 2, etc) higher than the actual number of real roots
 *
 * * the polynomial need not be square free
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eSignChanges([[1],[2],[-3],[0],[0],[3],[-1]]); //=> 3
 * ```
 *
 * @doc
 */
function eSignChanges(p) {
    const d = p.length - 1;
    if (d < 1) {
        return 0;
    }
    let r = 0;
    let j = 0;
    while (p[j][0] === 0) {
        j++;
    }
    let _s = e_sign_changes_sign(eSign(p[j]));
    for (let i = j + 1; i < d + 1; i++) {
        const s = e_sign_changes_sign(eSign(p[i]));
        if (s !== _s && s !== 0) {
            r++;
            _s = s;
        }
    }
    return r;
}


;// ./src/roots/yun/bigint/b-yun-algorithm.ts






function bExactDiv(a, b) {
    if (b.length === 0) {
        throw new Error('Cannot divide by the zero polynomial.');
    }
    const { q, r } = bPdivTrivial(a, b);
    if (r.length !== 0) {
        throw new Error('Expected exact polynomial division in bYunsAlgorithm.');
    }
    const d = a.length - b.length + 1;
    const multiplier = b[0] ** BigInt(d);
    for (const c of q) {
        if (c % multiplier !== 0n) {
            throw new Error('Pseudo quotient is not divisible by expected multiplier in bYunsAlgorithm.');
        }
    }
    return bRemoveLeadingZeros(bDivideByConst(q, multiplier));
}
function bGcdPrsSafe(a, b) {
    return a.length >= b.length
        ? bGcdPrs(a, b)
        : bGcdPrs(b, a);
}
/**
 * * see e.g. [Yun's algorithm](https://en.wikipedia.org/wiki/Square-free_polynomial)
 *
 * @param a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @returns square-free factors paired with their multiplicities
 */
function bYunsAlgorithm(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length <= 1) {
        return [];
    }
    // Yun's algorithm is defined on primitive polynomials over characteristic 0.
    p = bPrimitivePart(p);
    const pDiff = bDifferentiate(p);
    if (pDiff.length === 0) {
        return [];
    }
    const factors = [];
    let g = bPrimitivePart(bGcdPrsSafe(p, pDiff));
    let w = bExactDiv(p, g);
    let multiplicity = 1;
    while (w.length > 1) {
        const y = g.length <= 1
            ? [1n]
            : bPrimitivePart(bGcdPrsSafe(g, w));
        const factor = bExactDiv(w, y);
        if (factor.length > 1) {
            factors.push({ factor, multiplicity });
        }
        w = y;
        g = bExactDiv(g, y);
        multiplicity++;
    }
    return factors;
}


;// ./src/scale-to-int/scale-float-to-int.ts


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is
 * returned.
 *
 * * the result is exact (no round-off can occur)
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
function scaleFloatToInt(a) {
    if (a === 0) {
        return 0;
    }
    return a * 2 ** (-exponent(a) + bitLength(a) - 1);
}


;// ./src/scale-to-int/scale-float-to-bigint.ts


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 *
 * @param a a double precision floating point number
 *
 * @doc
 */
function scaleFloatToBigint(a) {
    if (a === 0) {
        return 0n;
    }
    return BigInt(a * 2 ** (-exponent(a) + bitLength(a) - 1));
}


;// ./src/index.ts
// basic

// basic bigint













// basic double












// basic double-double









// basic expansion














// calculus bigint

// calculus double


// calculus double-double



// calculus expansion

// change basis double




// change variables bigint




// change variables double







// change variables double


// change variables expansion






// composition / decomposition





// division



// error analysis









// euclidean division related bigint








// euclidean division related double


// euclidean division related expansion




// evaluate bigint



// evaluate double













// evaluate double-double


// evaluate expansion




// factor bigint


// factor double


// factor expansion


// gcd bigint







// gcd double


// gcd expansion
//export { eGcdPrs } from './gcd/expansion/e-gcd-prs.js';

// norm bigint



// norm double



// norm expansion



// predictive random double





// predictive random bigint







// roots certified



// roots deflate





// roots descartes

// roots from roots



// roots naive





// roots root bounds






// roots sturm bigint




// roots sturm double




// roots sturm expansion




// roots yun algorithm

// scale to int







export { AbsHorner, CompHornerK, EFTHorner, Horner, absCoeff, add, allRoots, allRootsCertified, allRootsCertifiedSimplified, bAbsCoeff, bAdd, bChangeVariablesLinear, bChangeVariablesScale, bChangeVariablesTranslateX, bCompose, bContent, bDecomposePowerSubstitution, bDeflate, bDegree, bDifferentiate, bDivideByConst, bDivides, bDivmod, bElevateDegree, bEqual, bEvaluateAt0, bEvaluateAt1, bFlatCoefficients, bFlatCoefficientsArr, bFlatRoots, bFlatRootsArr, bFromRoots, bGcdInt, bGcdInts, bGcdModP, bGcdModular, bGcdPrs, bHorner, bInverseModP, bInvert, bIsRationalMultipleOf, bLandauMignotteBound, bMultiply, bMultiplyByConst, bNegate, bNumRoots, bNumRootsIn01, bNumRootsInRange, bP1Norm, bP2NormSquared, bPInfNorm, bPdivModP, bPdivTrivial, bPremSequencePrimitive, bPremSequenceSubresultant, bPremSequenceTrivial, bPrimitivePart, bReflectAboutYAxis, bRemoveLeadingZeros, bRittDecompose, bRittRecompose, bScale, bSignChanges, bSturmChain, bSubtract, bTaylorShift, bXgcd, bYunsAlgorithm, bernsteinToPowerBasis, bernsteinToPowerBasis01, bisection, brent, brentPoly, changeVariablesLinear, changeVariablesScale, changeVariablesTranslateX, chineseRemainderAlgorithm, compHorner, compHornerIsFaithful, compHornerWithRunningError, compose, conditionNumber, content, createRootExact, ddAbsCoeff, ddAdd, ddDeflate, ddDeflateWithRunningError, ddDegree, ddDifferentiate, ddDifferentiateWithError, ddDivideByConst, ddHorner, ddHornerWithInpError, ddInplaceScaleWithInpErr, ddIntegrate, ddMultiply, ddMultiplyByConst, ddNegate, ddRemoveLeadingZeros, ddScaleWithInpErr, ddSubtract, ddTaylorShift, deflate, degree, differentiate, divideByConst, divmod, eAbsCoeff, eAdd, eChangeVariablesLinear, eChangeVariablesScale, eChangeVariablesTranslateX, eCompose, eContent, eDeflate, eDegree, eDifferentiate, eDivmod, eEqual, eEvaluateAt0, eEvaluateAt1, eFromRoots, eGcdInt, eGcdInts, eHorner, eInvert, eIsConstOrZero, eIsRationalMultipleOf, eIsUnit, eMobius, eMultiply, eMultiplyByConst, eNegate, eNumRoots, eNumRootsIn01, eNumRootsInRange, eP1Norm, eP2Norm, ePInfNorm, ePdivTrivial, ePremSequencePrimitive, ePremSequenceSubresultant, ePrimitivePart, eProduct, eReflectAboutYAxis, eRemoveLeadingZeros, eScale, eSignChanges, eSturmChain, eSubtract, eTaylorShift, eeHorner, eeTaylorShift, eps, equal, evalCertified, evalCertifiedInclError, evalK, evaluateAt0, evaluateAt1, flatCoefficients, flatCoefficientsArr, flatRoots, flatRootsArr, fromRoots, gcdInt, gcdInts, gcdPrs, getUlp, hornerWithRunningError, inplaceTaylorShiftBy1WithInpErr, integrate, invert, isExactPowerOf2, isRationalMultipleOf, isSubnormal, mid, mobius, multiply, multiplyByConst, negate, negativeRootLowerBound_LMQ, negativeRootUpperBound_LMQ, nextdown, nextup, numRoots, numRootsIn01, numRootsInRange, p1Norm, p2Norm, pInfNorm, positiveRootLowerBound_LMQ, positiveRootUpperBound_LMQ, powerToBernsteinBasis, powerToBernsteinBasis01, predictiveRandom, premSequenceSubresultant, primitivePart, quadraticRoots, random, randomIntInRange, refineK1, reflectAboutYAxis, removeLeadingZeros, rootIntervalToExp, rootMagnitudeUpperBound_fujiwara, rootMagnitudeUpperBound_rouche, roots, scale, scaleFloatToBigint, scaleFloatToInt, scaleFloatsToBigints, scaleFloatsToInts, scaleFloatssToBigintss, scaleFloatssToIntss, scaleWithInpErr, signChanges, sturmChain, subtract, taylorShift, taylorShiftWithInpErr, toCasStr, u, uu, γ, γ1, γγ, γγ3 };
