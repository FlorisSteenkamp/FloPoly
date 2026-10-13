
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
/** @internal */ function isShewchuk(x) {
    return Array.isArray(x);
}
/** @internal */ function isBigint(x) {
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
 */ function toCasStr(p) {
    const d = p.length - 1;
    let str = '';
    for(let i = 0; i < d + 1; i++){
        const _v = p[i];
        const v = isShewchuk(_v) ? _v.every(Number.isInteger) ? _v.reduce((s, c)=>s + BigInt(c), 0n) // exact
         : eEstimate(_v) : _v; // bigint or number
        const absV = isBigint(v) ? v < 0n ? -v : v : abs(v);
        let cStr = nonNegativeNumberToString(absV);
        if (v === 0 || cStr === '0') {
            continue;
        }
        cStr = (v >= 0 ? ' + ' : ' - ') + cStr;
        if (i === d) {
            str += cStr;
        } else if (i === d - 1) {
            str += cStr + '*x';
        } else {
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
 */ function nonNegativeNumberToString(num) {
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
 */ function expandExponent(str) {
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
 */ function bAbsCoeff(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
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
 */ function bRemoveLeadingZeros(p) {
    let lzCount = 0;
    for(let i = 0; i <= p.length - 1; i++){
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
 */ function bAdd(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
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
 */ function bDegree(p) {
    return p.length - 1;
}


;// ./src/basic/bigint/b-divide-by-const.ts

/**
 * Divides (using **integer division**) a polynomial by a constant.
 *
 * * leading zero coefficients (possible since the division truncates) are
 *   removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */ function bDivideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for(let i = 0; i < d; i++){
        r[i] = p[i] / c;
    }
    return bRemoveLeadingZeros(r);
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
 */ function bMultiplyByConst(c, p) {
    if (c === 0n) {
        return [];
    }
    const d = p.length;
    const r = new Array(d);
    for(let i = 0; i < d; i++){
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
 */ function bElevateDegree(p, deg) {
    const p_ = p.slice();
    for(let i = 0; i < deg; i++){
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
 */ function bMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    const r = new Array(d + 1).fill(0n);
    for(let i = 0; i < da + 1; i++){
        for(let j = 0; j < db + 1; j++){
            r[d - (i + j)] += a[da - i] * b[db - j];
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
 */ function bSubtract(a, b) {
    // Initialize result array  
    const da = a.length - 1;
    const db = b.length - 1;
    const Δd = da - db;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const d = b_subtract_max(da, db);
    // Add coefficients
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
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
 */ function bPdivInternal(a, b) {
    let q = [];
    const d = bDegree(b);
    const c = b[0];
    let r = a;
    while(true){
        const deg = bDegree(r) - d;
        if (deg < 0) {
            return {
                q,
                r
            };
        }
        // The division below is guaranteed to be exact
        const s = bElevateDegree([
            r[0] / c
        ], deg);
        q = bAdd(q, s);
        r = bSubtract(r, bMultiply(s, b));
    }
}


;// ./src/euclidean-division-related/bigint/b-pdiv-trivial.ts



const b_pdiv_trivial_abs = (n)=>n >= 0 ? n : -n;
/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder` 
 * of the pseudo division of `a/b` (`a`, `b` both being polynomials) in such a way 
 * that all intermediate calculations and the final result are done in ℤ, i.e. 
 * performs Euclidean (i.e. long) division on the two given polynomials, `a/b`, 
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where 
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 * 
 * * **precondition:** `b !== []`, i.e. unequal to the zero polynomial.
 *
 * * the multiplier `m` is also returned
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
 */ function bPdivTrivial(a, b, positiveMultiplier = false) {
    const d = bDegree(a) - bDegree(b) + 1;
    if (d < 1) {
        return {
            q: [],
            r: a,
            m: 1n
        };
    }
    let m = b[0] ** BigInt(d);
    m = positiveMultiplier ? b_pdiv_trivial_abs(m) : m;
    const a_ = bMultiplyByConst(m, a);
    return {
        ...bPdivInternal(a_, b),
        m
    };
}


;// ./src/basic/bigint/b-divides.ts

/**
 * Returns `true` if the polynomial `b` divides the polynomial `a` (over the
 * integers), i.e. if there exists a polynomial `r` (with integer
 * coefficients) such that `a = b*r`.
 *
 * * **note** the parameter order: the divisor `b` comes first
 *
 * @param b the divisor; a polynomial with coefficients given densely as an
 * array of bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the dividend; another polynomial
 *
 * @example
 * ```typescript
 * bDivides([2n,2n], [4n,0n,-4n]);  //=> true   (2x + 2 divides 4x^2 - 4)
 * bDivides([4n,0n,-4n], [2n,2n]);  //=> false
 * ```
 *
 * @doc
 */ function bDivides(b, a) {
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
    for (const c of q){
        if (c % multiplier !== 0n) {
            return false;
        }
    }
    return true;
}


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
 */ function bEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for(let i = 0; i < a.length; i++){
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
 */ function bInvert(p) {
    return p.toReversed();
}


;// ./src/gcd/bigint/b-integer-gcd.ts
/**
 * Computes and returns the greatest common divisor of two integers `a` and `b`,
 * using the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).
 * 
 * @doc
 */ function bGcdInt(a, b) {
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
    while(b !== 0n){
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
 */ function bGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for(let i = 0; i < len; i++){
        vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i];
    }
    let a = vals_[0];
    for(let i = 1; i < len; i++){
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
 */ function bIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    const a_ = a[0] < 0n ? a.map((c)=>-c) : a;
    const b_ = b[0] < 0n ? b.map((c)=>-c) : b;
    /** leading coefficient of a */ const lcA = a_[0];
    /** leading coefficient of b */ const lcB = b_[0];
    const gcd = bGcdInt(lcA, lcB);
    const A = lcA / gcd; // this division is exact
    const B = lcB / gcd; // this division is exact
    for(let i = 0; i < a_.length; i++){
        const Ab = A * b_[i];
        const q = Ab / B;
        if (q * B !== Ab || q !== a_[i]) {
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
 */ function bNegate(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
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
 */ function absCoeff(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
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
 */ function removeLeadingZeros(p) {
    let lzCount = 0;
    for(let i = 0; i <= p.length - 1; i++){
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
 */ function add(p1, p2) {
    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = add_max(d1, d2);
    // Add coefficients
    const r = new Array(d + 1);
    const minD = min(d1, d2);
    // Add where both polynomials overlap
    for(let i = 0; i <= minD; i++){
        r[d - i] = p1[d1 - i] + p2[d2 - i];
    }
    // Copy remaining coefficients from longer polynomial
    for(let i = minD + 1; i <= d1; i++){
        r[d - i] = p1[d1 - i];
    }
    for(let i = minD + 1; i <= d2; i++){
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
 */ function degree(p) {
    return p.length - 1;
}


;// ./src/basic/double/divide-by-const.ts

/**
 * Divides a polynomial by a constant in double precision.
 *
 * * leading zero coefficients (possible due to underflow) are removed from
 *   the result
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */ function divideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for(let i = 0; i < d; i++){
        r[i] = p[i] / c;
    }
    return removeLeadingZeros(r);
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
 */ function equal(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for(let i = 0; i < p1.length; i++){
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
 */ function invert(p) {
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
;// ./node_modules/big-float-ts/node/double-representation/exponent.js

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return parseDouble(a).exponent;
}

//# sourceMappingURL=exponent.js.map
;// ./node_modules/big-float-ts/node/double-representation/lsb-exponent.js


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    return getLowestSetBit(a) - 52 + e;
}

//# sourceMappingURL=lsb-exponent.js.map
;// ./src/scale-to-int/mult-by-pow-2.ts
/**
 * Returns `a * 2**e` exactly (bar overflow / underflow of the *result*) even
 * when `2**e` itself is not representable (i.e. `e > 1023`).
 *
 * @param a a double precision floating point number
 * @param e an integer power
 *
 * @internal
 */ function multByPow2(a, e) {
    if (e > 1023) {
        // `2**e` would overflow (even though `a * 2**e` may not) - scale in
        // two (exact) steps
        return a * 2 ** 1023 * 2 ** (e - 1023);
    }
    return a * 2 ** e;
}


;// ./src/scale-to-int/scale-floats-to-bigints.ts


/**
 * Returns the result of scaling the given array of floats by the *same* power
 * of two such that all floats become bigints.
 *
 * * the result is exact (overflow cannot occur)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */ function scaleFloatsToBigints(as) {
    const n = as.length;
    const scalePowers = new Array(n); // (cached for the second pass)
    let e = -1024;
    for(let i = 0; i < n; i++){
        const a = as[i];
        if (a === 0) {
            scalePowers[i] = 0;
            continue;
        }
        const scalePower = -lsbExponent(a);
        scalePowers[i] = scalePower;
        if (scalePower > e) {
            e = scalePower;
        }
    }
    // check for the trivial case
    if (e === 0) {
        return as.map((a)=>BigInt(a));
    }
    if (e > 0) {
        return as.map((a, i)=>{
            if (a === 0) {
                return 0n;
            }
            const scalePower = scalePowers[i];
            // we first scale `a` to an (odd) integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(multByPow2(a, scalePower)) * 2n ** BigInt(e - scalePower);
        });
    }
    // overflow / underflow cannot occur
    return as.map((a)=>BigInt(a * 2 ** e));
}


;// ./src/basic/double/is-rational-multiple-of.ts


/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * * the coefficients are scaled (exactly) to bigints first so that overflow
 *   cannot occur
 *
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */ function isRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // scaling each polynomial by a (possibly different) power of two preserves
    // the 'is a rational multiple of' relation
    return bIsRationalMultipleOf(scaleFloatsToBigints(a), scaleFloatsToBigints(b));
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
 */ function multiplyByConst(c, p) {
    if (c === 0) {
        return [];
    }
    const d = p.length;
    const p_ = new Array(d);
    for(let i = 0; i < d; i++){
        p_[i] = c * p[i];
    }
    // We *have* to clip due to possible floating point underflow
    return removeLeadingZeros(p_);
}


;// ./src/basic/double/multiply.ts

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
 */ function multiply(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    const d = d1 + d2;
    const r = new Array(d + 1).fill(0);
    for(let i = 0; i < d1 + 1; i++){
        for(let j = 0; j < d2 + 1; j++){
            r[d - (i + j)] += p1[d1 - i] * p2[d2 - j];
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
 */ function multiplyKaratsuba(p1, p2) {
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
 */ function karatsuba(a, b) {
    const la = a.length;
    const lb = b.length;
    if (la === 0 || lb === 0) {
        return [];
    }
    const n = multiply_max(la, lb);
    // base case: schoolbook multiplication for small inputs
    if (n <= 9) {
        const r = new Array(la + lb - 1).fill(0);
        for(let i = 0; i < la; i++){
            for(let j = 0; j < lb; j++){
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
/** adds two highest-to-lowest coefficient arrays (aligned at the low end) */ function addArr(a, b) {
    const l = multiply_max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for(let i = 0; i < a.length; i++){
        r[oa + i] += a[i];
    }
    for(let i = 0; i < b.length; i++){
        r[ob + i] += b[i];
    }
    return r;
}
/** subtracts `b` from `a` (highest-to-lowest, aligned at the low end) */ function subArr(a, b) {
    const l = multiply_max(a.length, b.length);
    const r = new Array(l).fill(0);
    const oa = l - a.length;
    const ob = l - b.length;
    for(let i = 0; i < a.length; i++){
        r[oa + i] += a[i];
    }
    for(let i = 0; i < b.length; i++){
        r[ob + i] -= b[i];
    }
    return r;
}
/** adds `src` raised by `shift` powers into the highest-to-lowest `dst` */ function addInto(dst, src, shift) {
    const offset = dst.length - src.length - shift;
    for(let i = 0; i < src.length; i++){
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
 */ function negate(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
        p_[i] = -p[i];
    }
    return p_;
}


;// ./src/basic/double/subtract.ts

const { min: subtract_min, max: subtract_max } = Math;
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
 */ function subtract(p1, p2) {
    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = subtract_max(d1, d2);
    // Subtract coefficients
    const r = new Array(d + 1);
    const minD = subtract_min(d1, d2);
    // Subtract where both polynomials overlap
    for(let i = 0; i <= minD; i++){
        r[d - i] = p1[d1 - i] - p2[d2 - i];
    }
    // Copy remaining coefficients from longer polynomial
    for(let i = minD + 1; i <= d1; i++){
        r[d - i] = p1[d1 - i];
    }
    for(let i = minD + 1; i <= d2; i++){
        r[d - i] = -p2[d2 - i];
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
 */ function ddAbsCoeff(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
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
 */ function ddRemoveLeadingZeros(p) {
    let lzCount = 0;
    for(let i = 0; i <= p.length - 1; i++){
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
 */ function ddAdd(p1, p2) {
    // Initialize result array
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    const minD = Math.min(d1, d2);
    // Add where both polynomials overlap
    for(let i = 0; i <= minD; i++){
        result[d - i] = ddAddDd(p1[d1 - i], p2[d2 - i]);
    }
    // Copy remaining coefficients from longer polynomial
    for(let i = minD + 1; i <= d1; i++){
        result[d - i] = p1[d1 - i];
    }
    for(let i = minD + 1; i <= d2; i++){
        result[d - i] = p2[d2 - i];
    }
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}


;// ./src/basic/double-double/dd-degree.ts
/** 
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */ function ddDegree(p) {
    return p.length - 1;
}


;// ./node_modules/double-double/node/double-double/binary/dd-div-dd.js
/** @internal */
const f = 134217729; // 2**27 + 1;
/**
 * Returns the result of dividing two double-double-precision floating point
 * numbers, i.e. returns x/y.
 *
 * * relative error bound: 15u^2 + 56u^3, i.e. fl(a/b) = (a/b)(1+ϵ),
 * where ϵ <= 15u^2 + 56u^3, u = 0.5 * Number.EPSILON
 * * the largest error found was 8.465u^2
 *
 * * assumes no overflow; note that (Veltkamp) splitting overflows (giving
 * `NaN`) if the magnitude of `x[1]/y[1]` or `y[1]` exceeds ~2^996
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
    const c = f * yh;
    const ah = c - (c - yh);
    const al = yh - ah;
    const d = f * th;
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
 * * leading zero coefficients (possible due to underflow) are removed from
 *   the result
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param c a constant in double-double precision
 *
 * @doc
 */ function ddDivideByConst(p, c) {
    const d = p.length;
    const r = new Array(d);
    for(let i = 0; i < d; i++){
        r[i] = ddDivDd(p[i], c);
    }
    return ddRemoveLeadingZeros(r);
}


;// ./node_modules/double-double/node/double-double/binary/dd-mult-dd.js
/** @internal */
const dd_mult_dd_f = 2 ** 27 + 1;
/**
 * Returns the product of two double-double-precision floating point numbers.
 *
 * * relative error bound: 5u^2, i.e. fl(a*b) = (a*b)(1+ϵ),
 * where |ϵ| < 5u^2, u = 0.5 * Number.EPSILON (assuming no underflow or overflow)
 * * this bound (for round-to-nearest ties-to-even, as used by JavaScript) was
 * formally proven (in Coq) by J.-M. Muller and L. Rideau, see
 * https://doi.org/10.1145/3484514 - it improves on the 7u^2 bound given in
 * the original paper (below); the worst case found is 4.985u^2
 *
 * * assumes no overflow; note that (Veltkamp) splitting overflows (giving
 * `NaN`) if the magnitude of `x[1]` or `y[1]` exceeds ~2^996
 *
 * * ALGORITHM 10 (DWTimesDW1) of https://hal.archives-ouvertes.fr/hal-01351529v3/document
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
 */ function ddMultiplyByConst(c, p) {
    if (c[1] === 0) {
        return [];
    } // the zero polynomial
    const d = p.length;
    const p_ = new Array(d);
    for(let i = 0; i < d; i++){
        p_[i] = ddMultDd(c, p[i]);
    }
    // We *have* to clip due to possible floating point underflow
    return ddRemoveLeadingZeros(p_);
}


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
 */ function ddMultiply(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    const d = d1 + d2;
    const r = new Array(d + 1).fill([
        0,
        0
    ]);
    for(let i = 0; i < d1 + 1; i++){
        for(let j = 0; j < d2 + 1; j++){
            // r[d-(i+j)] += (p1[d1-i] * p2[d2-j]);
            r[d - (i + j)] = ddAddDd(r[d - (i + j)], ddMultDd(p1[d1 - i], p2[d2 - j]));
        }
    }
    return ddRemoveLeadingZeros(r);
}


;// ./src/basic/double-double/dd-negate.ts
/**
 * Returns the negative of the given polynomial (p -> -p).
 * 
 * @param p a polynomial with coefficients given densely as an array of double-dboule
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */ function ddNegate(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
        p_[i] = [
            -p[i][0],
            -p[i][1]
        ];
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
 */ function ddSubtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
        const c1 = p1[i + Δd1] || [
            0,
            0
        ];
        const c2 = p2[i + Δd2] || [
            0,
            0
        ];
        result[i] = ddDiffDd(c1, c2);
    }
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}


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
;// ./node_modules/big-float-ts/node/double-expansion/e-abs.js

/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return eNegativeOf(e);
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
 */ function eAbsCoeff(p) {
    const p_ = new Array(p.length);
    for(let i = 0; i < p.length; i++){
        p_[i] = eAbs(p[i]);
    }
    return p_;
}


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
 */ function eRemoveLeadingZeros(p) {
    let lzCount = 0;
    for(let i = 0; i <= p.length - 1; i++){
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


;// ./node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js
// import { eCompress } from "./e-compress.js";
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
 */ function eAdd(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
        const c1 = p1[i + Δd1] || [
            0
        ];
        const c2 = p2[i + Δd2] || [
            0
        ];
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
 */ function eDegree(p) {
    return p.length - 1;
}


;// ./node_modules/big-float-ts/node/double-expansion/e-diff.js


/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = eNegativeOf(f);
    return fastExpansionSum(e, g);
}

//# sourceMappingURL=e-diff.js.map
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
 */ function eEqual(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for(let i = 0; i < p1.length; i++){
        if (eCompare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}


;// ./src/basic/expansion/e-invert.ts
/**
 * @deprecated Use `Array.toReversed()` in modern JavaScript instead.
 * 
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
 */ function eInvert(p) {
    return p.toReversed();
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
 */ function eIsConstOrZero(p) {
    return p.length <= 1;
}


;// ./src/scale-to-int/scale-floatss-to-bigintss.ts


/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become bigints.
 *
 * * the result is exact (overflow cannot occur)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */ function scaleFloatssToBigintss(ass) {
    const scalePowerss = []; // (cached for the second pass)
    let e = -1024;
    for(let i = 0; i < ass.length; i++){
        const c = ass[i];
        const scalePowers = new Array(c.length);
        scalePowerss.push(scalePowers);
        for(let j = 0; j < c.length; j++){
            const a = c[j];
            if (a === 0) {
                scalePowers[j] = 0;
                continue;
            }
            const scalePower = -lsbExponent(a);
            scalePowers[j] = scalePower;
            if (scalePower > e) {
                e = scalePower;
            }
        }
    }
    // check for the trivial case
    if (e === 0) {
        return ass.map((as)=>as.map((a)=>BigInt(a)));
    }
    if (e > 0) {
        return ass.map((as, i)=>as.map((a, j)=>{
                if (a === 0) {
                    return 0n;
                }
                const scalePower = scalePowerss[i][j];
                // we first scale `a` to an (odd) integer without overflow and then
                // convert it to a bigint before multiplying
                return BigInt(multByPow2(a, scalePower)) * 2n ** BigInt(e - scalePower);
            }));
    }
    // overflow / underflow cannot occur
    return ass.map((as)=>as.map((a)=>BigInt(a * 2 ** e)));
}


;// ./src/util/bigint/b-sum.ts
/**
 * Returns the sum of an array of `bigint`s.
 * 
 * * **not optimized** for performance
 * 
 * @param a 
 */ function bSum(a) {
    let sum = 0n;
    for(let i = 0; i < a.length; i++){
        sum += a[i];
    }
    return sum;
}


;// ./src/basic/expansion/e-is-rational-multiple-of.ts



/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * * the coefficients are scaled (exactly) to bigints first so that overflow
 *   cannot occur
 *
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */ function eIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // scaling each polynomial by a (possibly different) power of two preserves
    // the 'is a rational multiple of' relation
    return bIsRationalMultipleOf(scaleFloatssToBigintss(a).map(bSum), scaleFloatssToBigintss(b).map(bSum));
}


;// ./src/basic/expansion/e-is-unit.ts

/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk
 * floating point expansions) is the unit polynomial, i.e. === 1.
 *
 * * the coefficient is compared by value, i.e. the expansion need not be
 *   compressed
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */ function eIsUnit(p) {
    return p.length === 1 && eCompare(p[0], [
        1
    ]) === 0;
}


;// ./node_modules/big-float-ts/node/double-expansion/scale-expansion.js
const scale_expansion_f = 134217729; // 2**27 + 1;
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
;// ./node_modules/big-float-ts/node/double-expansion/expansion-product.js


/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * * the result is not compressed, call `eCompress` on the result if required.
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
        sum = fastExpansionSum(sum, scaleExpansion(f, e[i]));
    }
    return sum;
}

//# sourceMappingURL=expansion-product.js.map
;// ./src/basic/expansion/e-multiply-by-const.ts


/**
 * Returns the exact result (bar underflow / overflow) of multiplying a
 * polynomial (with coefficients given as Shewchuk floating point expansions)
 * by a constant (given as a Shewchuk floating point expansion)
 *
 * * leading zero coefficients (possible due to underflow) are removed from
 *   the result
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
 */ function eMultiplyByConst(c, p) {
    if (eSign(c) === 0) {
        return [];
    }
    const d = p.length - 1;
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
        result[i] = expansionProduct(c, p[i]);
    }
    return eRemoveLeadingZeros(result);
}


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
;// ./node_modules/big-float-ts/node/double-expansion/grow-expansion.js
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
;// ./node_modules/big-float-ts/node/double-expansion/e-sum.js



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
                total = twoSum(total[0], term[0]);
            }
            else {
                total = growExpansion(total, term[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = growExpansion(term, total[0]);
            }
            else {
                total = fastExpansionSum(total, term);
            }
        }
    }
    return total;
}

//# sourceMappingURL=e-sum.js.map
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
 */ function eMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    // collect the products contributing to each coefficient and sum them 
    // once (rather than accumulating with ever growing expansions)
    const terms = new Array(d + 1);
    for(let k = 0; k <= d; k++){
        terms[k] = [];
    }
    for(let i = 0; i < da + 1; i++){
        for(let j = 0; j < db + 1; j++){
            terms[d - (i + j)].push(expansionProduct(a[da - i], b[db - j]));
        }
    }
    const result = new Array(d + 1);
    for(let k = 0; k <= d; k++){
        result[k] = eSum(terms[k]);
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
 */ function eNegate(p) {
    const result = new Array(p.length);
    for(let i = 0; i < p.length; i++){
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
 */ function eProduct(ps) {
    if (ps.length === 0) {
        return [
            [
                1
            ]
        ];
    }
    let p = ps[0];
    for(let i = 1; i < ps.length; i++){
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
 */ function eSubtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = new Array(d + 1);
    for(let i = 0; i < d + 1; i++){
        const c1 = p1[i + Δd1] || [
            0
        ];
        const c2 = p2[i + Δd2] || [
            0
        ];
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
 */ function bDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const r = new Array(d);
    for(let i = 0; i < d; i++){
        r[i] = BigInt(d - i) * p[i];
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
 */ function differentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const result = new Array(d);
    for(let i = 0; i < d; i++){
        result[i] = (d - i) * p[i];
    }
    return result;
}


;// ./src/calculus/double/integrate.ts

/**
 * Returns the result of integrating the given polynomial in double precision.
 *
 * * leading zero coefficients (e.g. if the zero polynomial is integrated
 *   with a zero constant of integration) are removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * integrate([3, 2, 1], 5); //=> [1, 1, 1, 5]
 * integrate([], 0);        //=> []
 * ```
 *
 * @doc
 */ function integrate(p, c) {
    const d = p.length - 1;
    const result = new Array(d + 2);
    for(let i = 0; i < d + 1; i++){
        result[i] = p[i] / (d + 1 - i);
    }
    result[d + 1] = c;
    return removeLeadingZeros(result);
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
 * * relative error bound: 1.5u^2 + 4u^3, i.e. fl(a*b) = (a*b)(1+ϵ),
 * where ϵ <= 1.5u^2 + 4u^3, u = 0.5 * Number.EPSILON
 * * the bound is very sharp
 * * probably prefer `ddMultDouble2` due to extra speed
 *
 * * assumes no overflow; note that (Veltkamp) splitting overflows (giving
 * `NaN`) if the magnitude of `x[1]` or `y` exceeds ~2^996
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
 * * assumes no overflow; note that (Veltkamp) splitting overflows (giving
 * `NaN`) if the magnitude of `x[1]` or `y` exceeds ~2^996
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
 */ function ddDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const r = new Array(d);
    for(let i = 0; i < d; i++){
        r[i] = ddMultDouble2(d - i, p[i]);
    }
    return r;
}


;// ./src/error-analysis/gamma.ts
/** `2 * 2^-53` -> 2x the standard round-of unit `=== Number.EPSILON` */ const eps = Number.EPSILON;
/** `2^-53` -> the standard round-of unit `=== eps/2` */ const u = eps / 2;
/** `2^-106` -> the standard round-of unit for double-double precision `=== (eps/2)**2` */ const uu = u * u;
/**
 * the standard floating point error function evaluated at `1`
 * 
 * * `=== 1.1102230246251568e-16`
 * * very close to being `=== Number.EPSILON / 2`
 */ const γ1 = γ(1);
/**
 * the standard double-double floating point error function evaluated at `3`;
 * the `3` factor is due to double-double arithmetic accuracy constraints
 * 
 * * `=== 3.697785493223493e-32`
 * * very close to being `=== 3*(Number.EPSILON / 2)**2`
 */ const γγ3 = γγ(3);
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
 */ function γ(n) {
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
 */ function γγ(n) {
    const nuu = n * uu;
    return nuu / (1 - nuu);
}
// cache some standard error bound units
const _γs = new Array(20).fill(0).map((_, i)=>γ(i));
/** @internal */ function γs(n) {
    return _γs[n] || γ(n);
}


;// ./src/calculus/double-double/dd-differentiate-with-err.ts



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
 */ function ddDifferentiateWithError(pWithErr) {
    const { p, pE } = pWithErr;
    const d = p.length - 1;
    if (d <= 0) {
        return {
            p: [],
            pE: []
        };
    }
    const dp = new Array(d);
    const dpE = new Array(d);
    for(let i = 0; i < d; i++){
        const deg = d - i;
        const c = ddMultDouble2(deg, p[i]);
        dp[i] = c;
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        const extraErr = (deg & deg - 1) === 0 ? 0 : γγ3;
        const $c = eEstimate(c);
        dpE[i] = deg * pE[i] + Math.abs($c) * extraErr;
    }
    return {
        p: dp,
        pE: dpE
    };
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
 * * assumes no overflow; note that (Veltkamp) splitting overflows (giving
 * `NaN`) if the magnitude of `x[1]/y` or `y` exceeds ~2^996
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
 * * leading zero coefficients (e.g. if the zero polynomial is integrated
 *   with a zero constant of integration) are removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest
 * power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * ddIntegrate([[0,3], [0,2], [0,1]], [0,5]); //=> [[0,1], [0,1], [0,1], [0,5]]
 * ddIntegrate([], [0,0]);                    //=> []
 * ```
 *
 * @doc
 */ function ddIntegrate(p, c) {
    const d = p.length - 1;
    const r = new Array(d + 2);
    for(let i = 0; i < d + 1; i++){
        r[i] = ddDivDouble(p[i], d + 1 - i);
    }
    r[d + 1] = c;
    return ddRemoveLeadingZeros(r);
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
 */ function eDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const result = new Array(d);
    for(let i = 0; i < d; i++){
        result[i] = scaleExpansion(p[i], d - i);
    }
    return result;
}


;// ./src/util/double/binomial.ts
/**
 * The highest `n` supported.
 *
 * * **note:** the binomial coefficients are only *exact* (i.e. representable
 *   as a double, `<= 2^53`) for `n <= 56`; for `56 < n <= 60` the largest
 *   coefficients are rounded
 */ const ABS_MAX_LIMIT = 60;
let maxLimit = 10;
const binomialTable = precomputeBinomialCoefficients(maxLimit);
function precomputeBinomialCoefficients(maxN) {
    // Initialize a 2D array matrix of size (maxN + 1) x (maxN + 1) filled with 0
    const dp = Array.from({
        length: maxN + 1
    }, ()=>new Array(maxN + 1).fill(0));
    for(let i = 0; i <= maxN; i++){
        // The inner loop only needs to run up to 'i' (Pascal's triangle width grows with the row index)
        for(let j = 0; j <= i; j++){
            if (j === 0 || j === i) {
                dp[i][j] = 1; // Base cases: nC0 = 1 and nCn = 1
            } else {
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
    for(let i = 0; i <= currentMaxN; i++){
        const row = binomialTable[i];
        for(let j = row.length; j <= maxN; j++){
            row.push(0);
        }
    }
    // Add new rows using Pascal's identity.
    for(let i = currentMaxN + 1; i <= maxN; i++){
        const row = new Array(maxN + 1).fill(0);
        row[0] = 1;
        row[i] = 1;
        for(let j = 1; j < i; j++){
            row[j] = binomialTable[i - 1][j - 1] + binomialTable[i - 1][j];
        }
        binomialTable.push(row);
    }
    maxLimit = maxN;
    return binomialTable;
}
/**
 * Returns `n` choose `k` (nCk).
 *
 * * exact for `n <= 56`; rounded (to double precision) for `56 < n <= 60`
 *   and throws for `n > 60`
 *
 * @param n
 * @param k
 */ function binomial(n, k) {
    if (n > ABS_MAX_LIMIT) {
        throw new Error(`n = ${n} exceeds the maximum limit of ${ABS_MAX_LIMIT}.`);
    }
    if (n > maxLimit) {
        extendBinomialCoefficients(binomialTable, n);
    }
    return binomialTable[n][k];
}
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
 * * for degrees `> 56` the binomial coefficients used are no longer exactly
 *   representable in double precision (and the result is thus slightly less
 *   accurate) and degrees `> 60` are not supported (an error is thrown)
 * 
 * @param p 
 * 
 */ function bernsteinToPowerBasis01(p) {
    const n = p.length - 1;
    if (n >= 4) {
        // Power coefficients by degree in ascending order: c[i] for x^i.
        const c = new Array(n + 1).fill(0);
        for(let i = 0; i <= n; i++){
            let s = 0;
            for(let j = 0; j <= i; j++){
                const sign = (i - j) % 2 === 0 ? 1 : -1;
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
            x3 - x0 + 3 * (x1 - x2),
            3 * (x2 + x0 - 2 * x1),
            3 * (x1 - x0),
            x0
        ];
    }
    if (n === 2) {
        const [x0, x1, x2] = p;
        return [
            x2 + x0 - 2 * x1,
            2 * (x1 - x0),
            x0
        ];
    }
    if (n === 1) {
        const [x0, x1] = p;
        return [
            x1 - x0,
            x0
        ];
    }
    return p;
}


;// ./src/change-variables/double/scale.ts
const changeVariablesScale = scale;
/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double precision.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * 
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 * 
 * @doc
 */ function scale(p, s) {
    const r = p.slice();
    inplaceScale(r, s);
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
 */ function inplaceScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    let sPow = s;
    for(let i = 1; i <= n; i++){
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
 */ function taylorShift(p, h) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
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
 */ function changeVariablesLinear(p, a, b) {
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
 */ function bernsteinToPowerBasis(p, a = 0, b = 1) {
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
 */ function powerToBernsteinBasis01(p) {
    const n = p.length - 1;
    if (n >= 4) {
        // Step 1: Scale by 1 / binom(n, j)
        const bc = new Array(n + 1);
        for(let i = 0; i <= n; i++){
            bc[i] = p[n - i] / binomial(n, i);
        }
        // Step 2: In-place triangular addition
        for(let i = n; i > 0; i--){
            for(let j = i; j <= n; j++){
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
        return [
            a0,
            a0 + a1 / 2,
            a0 + a1 + a2
        ];
    }
    if (n === 1) {
        const [a1, a0] = p;
        return [
            a0,
            a0 + a1
        ];
    }
    if (n === 0) {
        return [
            p[0]
        ];
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
 */ function powerToBernsteinBasis(p, a = 0, b = 1) {
    if (p.length <= 1) {
        return p; // (a constant is the same in both bases)
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
 */ function bScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    let sPow = s;
    for(let i = 1; i <= n; i++){
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
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p((1/s)x)`
 * 
 * @example
 * ```typescript
 * bInvScale([16n, 8n, 7n], 4n); //=> [1n, 2n, 7n]
 * ```
 * 
 * @doc
 */ function bInvScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    let sPow = s;
    for(let i = 1; i <= n; i++){
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
 */ function bTaylorShift(p, h) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
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
 */ function bChangeVariablesLinear(p, a, b) {
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
 */ function bReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for(let i = 0; i < d + 1; i++){
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
 */ function taylorShiftWithInpErr(p, h, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = taylor_shift_with_inp_err_abs(h);
    const q = p.slice();
    const q_ = p_.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];
            const hq = h * qi1;
            const hq_ = _h * qi1_ + taylor_shift_with_inp_err_abs(hq);
            q[i] = q[i] + hq;
            q_[i] = q_[i] + hq_ + taylor_shift_with_inp_err_abs(q[i]);
        }
    }
    return [
        q,
        q_
    ];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(x + 1)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */ function inplaceTaylorShiftBy1WithInpErr(p, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + 1)`.
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
            const qi1 = p[i - 1];
            const qi1_ = p_[i - 1];
            // (the multiplication by `h === 1` is exact so the error of the
            // product is just the error of `qi1`)
            const hq_ = qi1_;
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
 * * the returned coefficient array has the same length as the given one, i.e.
 *   leading zero coefficients are **not** removed (the leading coefficient of
 *   the result equals `p(a)` and the constant term equals `p(b)`, so a leading
 *   zero indicates that `a` is a root) - consistent with [[eMobius]]
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
 */ function mobius(p, a, b) {
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
    return q; // (length preserving - see the note above)
}


;// ./src/change-variables/double/scale-with-inp-err.ts
const { abs: scale_with_inp_err_abs } = Math;
/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double precision including an error bound that has **not** been scaled
 * by `γ1` yet.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @example
 * ```typescript
 * scaleWithInpErr([1,2,7], 3, [0,0,0]); //=> [[9, 6, 7], [18, 6, 0]]
 * ```
 *
 * @doc
 */ function scaleWithInpErr(p, s, p_) {
    const r = p.slice();
    const r_ = p_.slice();
    inplaceScaleWithInpErr(r, s, r_);
    return [
        r,
        r_
    ];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */ function inplaceScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    const _s = scale_with_inp_err_abs(s);
    let sPow = s;
    let sPow_ = 0; // no error
    for(let i = 1; i <= n; i++){
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = scale_with_inp_err_abs(pn_i);
        const pn_i_ = p_[j];
        const scaledPn_i = pn_i * sPow;
        p[j] = scaledPn_i;
        // input error * |sⁱ| + |p| * err(sⁱ) + round-off of the product
        p_[j] = pn_i_ * scale_with_inp_err_abs(sPow) + _pn_i * sPow_ + scale_with_inp_err_abs(scaledPn_i);
        const nextSPow = sPow * s;
        sPow_ = sPow_ * _s + scale_with_inp_err_abs(nextSPow);
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
 */ function reflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for(let i = 0; i < d + 1; i++){
        if (i % 2 === (d - 1) % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}


;// ./src/change-variables/double-double/dd-scale-with-inp-err.ts

const { abs: dd_scale_with_inp_err_abs } = Math;
/**
 * The error bound is accumulated in units of `γγ3 ≈ 3u²` (the relative error
 * bound of `ddMultDouble2`), but `ddMultDd` has a relative error bound of
 * `7u²`, i.e. `7/3` units.
 */ const ddMultDdErrUnits = 7 / 3;
/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double-double precision including an error bound that has **not** been
 * scaled by `γγ3` yet.
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @example
 * ```typescript
 * ddScaleWithInpErr([[0,1],[0,2],[0,7]], 3, [0,0,0]); //=> [[[0,9],[0,6],[0,7]], [30, 14, 0]]
 * ```
 * 
 * @doc
 */ function ddScaleWithInpErr(p, s, p_) {
    const r = p.slice();
    const r_ = p_.slice();
    ddInplaceScaleWithInpErr(r, s, r_);
    return [
        r,
        r_
    ];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power, e.g.
 * `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γγ3` yet
 *
 * @doc
 */ function ddInplaceScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    const _s = dd_scale_with_inp_err_abs(s);
    let sPow = [
        0,
        s
    ];
    let sPow_ = 0; // no error
    for(let i = 1; i <= n; i++){
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = dd_scale_with_inp_err_abs(pn_i[1]);
        const pn_i_ = p_[j];
        const scaledPn_i = ddMultDd(sPow, pn_i);
        p[j] = scaledPn_i;
        // input error * |sⁱ| + |p| * err(sⁱ) + round-off of the product
        p_[j] = pn_i_ * dd_scale_with_inp_err_abs(sPow[1]) + _pn_i * sPow_ + ddMultDdErrUnits * dd_scale_with_inp_err_abs(scaledPn_i[1]);
        const nextSPow = ddMultDouble2(s, sPow); // relative error bound `3u²`, i.e. 1 unit
        sPow_ = sPow_ * _s + dd_scale_with_inp_err_abs(nextSPow[1]);
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
 */ function ddTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const q = p.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
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
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param s the scale factor
 */ function eScale(p, s) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const r = new Array(n + 1);
    r[n] = p[n];
    // Keep powers of `s` as expansions to avoid rounding drift from repeated
    // double multiplication (`sPow *= s`).
    let sPow = [
        1
    ];
    for(let i = 1; i <= n; i++){
        sPow = scaleExpansion(sPow, s);
        r[n - i] = expansionProduct(p[n - i], sPow);
    }
    return r;
}


;// ./node_modules/big-float-ts/node/double-expansion/e-compress.js
/**
 * Returns the result of compressing the given Shewchuk floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 23 (Shewchuk): Let `e = sum_(i=1)^m(e_i)` be a nonoverlapping
 * expansion of m p-bit components, where m >= 3.
 *
 * Suppose that the components of `e` are sorted in order of increasing magnitude,
 * except that any of the e_i may be zero.
 *
 * Then the following algorithm will produce a nonoverlapping expansion
 * (nonadjacent if round-to even tiebreaking is used) such that
 * `h = sum_(i=1)^n(h_i) = e`, where the components `h_i` are in order of increasing
 * magnitude. If `h != 0`, none of the `h_i` will be zero. Furthermore, the largest
 * component `h_n` approximates `h` with an error smaller than `ulp(h_n)`.
 */
function eCompress(e) {
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
;// ./src/change-variables/expansion/e-taylor-shift.ts

const eChangeVariablesTranslateX = eTaylorShift;
/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme).
 * 
 * * the calculations are exact (bar overflow / underflow) since the
 *   coefficients are Shewchuk floating point expansions
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk expansion
 * floating point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */ function eTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    const q = p.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
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
 */ function eChangeVariablesLinear(p, a, b) {
    return eScale(eTaylorShift(p, b), a);
}


;// ./src/change-variables/expansion/e-mobius.ts



/**
 * Applies a Mobius transformation to the given polynomial:
 * * `p(x) -> (x + 1)^n * p((ax + b) / (x + 1))`
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 * 
 * * the calculations are exact (the coefficients are Shewchuk expansions)
 * 
 * * the returned coefficient array has the same length as the given one, i.e.
 *   leading zero coefficients are **not** removed (the leading coefficient of
 *   the result equals `p(a)` and the constant term equals `p(b)`, so a leading
 *   zero indicates that `a` is a root) - consistent with [[mobius]]
 * 
 * * see [[mobius]] for a description of the algorithm
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 */ function eMobius(p, a, b) {
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
 */ function eReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for(let i = 0; i < d + 1; i++){
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
 * * the calculations are exact (bar overflow / underflow)
 *
 * * see also [[eTaylorShift]] where `h` is a double
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount (given as a Shewchuk floating point expansion)
 *
 * @doc
 */ function eeTaylorShift(p, h) {
    const n = p.length - 1;
    if (n < 0) {
        return [];
    }
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const q = p.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
            // q[i] = q[i] + h*q[i - 1];
            // (compressed at each step to keep the expansions short)
            q[i] = eCompress(fastExpansionSum(q[i], expansionProduct(h, q[i - 1])));
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
 */ function compose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p){
        r = add(multiply(r, q), [
            c
        ]);
    }
    return r;
}


;// ./src/composition/bigint/b-compose.ts


/**
 * Returns the polynomial composition `p(q(x))` over bigint coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */ function bCompose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p){
        r = bAdd(bMultiply(r, q), [
            c
        ]);
    }
    return r;
}


;// ./src/gcd/double/integer-gcd.ts
const { abs: integer_gcd_abs } = Math;
/**
 * Computes the greatest common divisor of two integers `a` and `b`, using the 
 * Euclidean Algorithm.
 * 
 * **precondition** `a`, `b` must be integers
 *
 * * returns `NaN` if either argument is not finite (rather than looping forever)
 *
 * @doc
 */ function gcdInt(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return Number.NaN;
    }
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
    while(b !== 0){
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
 */ function gcdIntBinary(a, b) {
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
    while(a % 2 === 0 && b % 2 === 0){
        a = a / 2; // right shift
        b = b / 2; // right shift
        k = k * 2; // left shift
    }
    // Reduce a to an odd number...
    while(a % 2 === 0){
        a = a / 2; // right shift
    }
    // Henceforth, a is always odd...
    while(b){
        // Remove all factors of 2 in b as they are not common
        while(b % 2 === 0){
            b = b / 2; // right shift
        }
        // a and b are both odd. Swap values such that it is the larger of the 
        // two values, and then set b to the difference (which is even)
        if (a > b) {
            [a, b] = [
                b,
                a
            ];
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
 */ function gcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for(let i = 0; i < len; i++){
        vals_[i] = integer_gcd_abs(vals_[i]);
    }
    let a = vals_[0];
    for(let i = 1; i < len; i++){
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
 */ function gcdIntsTree(vals) {
    let vals_ = vals.slice();
    // make array of numbers all positive
    for(let i = 0; i < vals_.length; i++){
        vals_[i] = integer_gcd_abs(vals_[i]);
    }
    // Divide and conquer
    while(vals_.length > 1){
        const newVals = [];
        const len = vals_.length;
        for(let i = 0; i < len - 1; i += 2){
            newVals.push(gcdInt(vals_[i], vals_[i + 1]));
        }
        if (len % 2 !== 0) {
            newVals.push(vals_[len - 1]);
        }
        vals_ = newVals;
    }
    return vals_[0];
}


;// ./src/composition/bigint/b-decompose-power-substitution.ts


/**
 * Detects decompositions of the form `p(x) = f(x^k)` over bigint coefficients.
 *
 * If such a nontrivial decomposition exists (`k > 1`), returns `{ f, g, k }`
 * where `g(x) = x^k`. Otherwise returns `undefined`.
 *
 * @param p polynomial coefficients from highest to lowest power
 */ function bDecomposePowerSubstitution(p) {
    const q = bRemoveLeadingZeros(p);
    if (q.length <= 1) {
        return undefined;
    }
    const n = q.length - 1;
    let k = 0;
    let nonZeroCount = 0;
    for(let i = 0; i < q.length; i++){
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
    for(let i = 0; i < q.length; i++){
        const c = q[i];
        if (c === 0n) {
            continue;
        }
        const exp = n - i;
        const j = exp / k;
        f[d - j] = c;
    }
    const g = [
        1n,
        ...new Array(k).fill(0n)
    ];
    return {
        f: bRemoveLeadingZeros(f),
        g,
        k
    };
}


;// ./src/composition/bigint/b-ritt-decompose.ts









/**
 * Returns the exact decomposition of a polynomial over bigint coefficients.
 *
 * Returns composition factors `[f1, f2, ..., fk]` such that
 * `p = f1(f2(...fk(x)...))` and each factor is indecomposable by this method.
 *
 * * for each proper divisor `s` of the degree the (unique up to linear
 *   equivalence - see Kozen & Landau) monic inner candidate of degree `s` with
 *   zero constant term is determined over the rationals from the leading
 *   coefficients of `p`; the only integral inner candidate that needs to be
 *   checked is then this candidate scaled by the lcm of its coefficient
 *   denominators (any other integral scaling that admits an integral outer
 *   polynomial implies that this minimal one does too); the outer polynomial
 *   is found by repeated exact division and the decomposition is verified by
 *   recomposition
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param options decomposition options (currently unused)
 *
 * @example
 * ```typescript
 * bRittDecompose([1n, 0n, 2n, 0n, 1n]);  //=> [[1n, 2n, 1n], [1n, 0n, 0n]]  (i.e. (u^2 + 2u + 1)∘(x^2))
 * ```
 *
 * @doc
 */ function bRittDecompose(p, // eslint-disable-next-line @typescript-eslint/no-unused-vars
options = {}) {
    return bRittDecomposeInternal(p);
}
function bRittDecomposeInternal(p) {
    const q = bRemoveLeadingZeros(p);
    if (q.length <= 2) {
        return [
            q
        ];
    }
    const step = findOneStep(q);
    if (!step) {
        return [
            q
        ];
    }
    const canonical = canonicalizeStep(step.g, step.h);
    return [
        ...bRittDecomposeInternal(canonical.g),
        ...bRittDecomposeInternal(canonical.h)
    ];
}
/** Recompose factors returned by `bRittDecompose`. */ function bRittRecompose(factors) {
    if (factors.length === 0) {
        return [];
    }
    let r = factors[factors.length - 1];
    for(let i = factors.length - 2; i >= 0; i--){
        r = bCompose(factors[i], r);
    }
    return r;
}
function findOneStep(p) {
    const n = bDegree(p);
    if (n <= 1) {
        return undefined;
    }
    // Without loss of generality the inner polynomial has a zero constant
    // term (`g(h(x)) = g(u + c)(h(x) - c)`), so the constant term of `p` only
    // affects the constant term of `g`.
    const c0 = p[p.length - 1];
    const p0 = c0 === 0n ? p : subConst(p, c0);
    for (const s of properDivisors(n)){
        const r = n / s;
        const h = buildInnerCandidate(p0, s, r);
        const g0 = solveOuterFromInner(p0, h, r);
        if (!g0) {
            continue;
        }
        const g = g0.slice();
        g[g.length - 1] += c0;
        if (!bEqual(bCompose(g, h), p)) {
            continue;
        }
        // (`deg(h) === s` and `deg(g) === r` are both proper divisors of
        // `n`, i.e. in `[2, n/2]`, so no further degree checks are needed)
        return {
            g,
            h
        };
    }
    return undefined;
}
function frac(num, den = 1n) {
    if (den < 0n) {
        num = -num;
        den = -den;
    }
    const g = bGcdInt(num, den);
    return g > 1n ? {
        num: num / g,
        den: den / g
    } : {
        num,
        den
    };
}
const FRAC_ZERO = frac(0n);
const FRAC_ONE = frac(1n);
function fracAdd(a, b) {
    return frac(a.num * b.den + b.num * a.den, a.den * b.den);
}
function fracSub(a, b) {
    return frac(a.num * b.den - b.num * a.den, a.den * b.den);
}
function fracMul(a, b) {
    return frac(a.num * b.num, a.den * b.den);
}
function fracDiv(a, b) {
    return frac(a.num * b.den, a.den * b.num);
}
function lcm(a, b) {
    return a / bGcdInt(a, b) * b;
}
/**
 * Returns the integral inner candidate `h` of degree `s` (with zero constant
 * term and positive leading coefficient) for a decomposition `p = g(h)` with
 * `deg(g) === r`: the unique monic rational candidate (determined from the
 * `s` leading coefficients of `p`) scaled by the lcm of its coefficient
 * denominators.
 *
 * * a decomposition with inner degree `s` exists iff an integral outer
 *   polynomial exists for this `h` (see `solveOuterFromInner`)
 */ function buildInnerCandidate(p, s, r) {
    const lc = p[0];
    // `a[k]` is the coefficient of `x^(s-k)` of the monic inner candidate,
    // i.e. with `H(y) = Σ a[k] y^k` we have `h(x) = x^s H(1/x)` and the
    // coefficient of `x^(sr-k)` of `h(x)^r` equals the coefficient of `y^k`
    // of `H(y)^r`, which must equal `p[k] / lc` (for `k < s`).
    const a = [
        FRAC_ONE
    ];
    for(let k = 1; k <= s - 1; k++){
        // the coefficient of `y^k` in `H(y)^r` is `r·a[k] + known` where
        // `known` only depends on `a[0..k-1]`
        const known = fracPowSeriesCoeff(a, r, k);
        const target = frac(coeffAtDegree(p, s * r - k), lc);
        a.push(fracDiv(fracSub(target, known), frac(BigInt(r))));
    }
    // scale to integers by the lcm of the denominators
    let D = 1n;
    for (const ak of a){
        D = lcm(D, ak.den);
    }
    const h = new Array(s + 1);
    for(let k = 0; k < s; k++){
        h[k] = a[k].num * (D / a[k].den);
    }
    h[s] = 0n;
    return h;
}
/**
 * Returns the coefficient of `y^k` in `A(y)^n` where `A(y) = Σ a[i] y^i`
 * (only `a[0..k-1]` are used, i.e. the coefficient `a[k]` is taken as zero).
 */ function fracPowSeriesCoeff(a, n, k) {
    let base = a.slice(0, k);
    let acc = [
        FRAC_ONE
    ];
    let e = n;
    while(e > 0){
        if (e & 1) {
            acc = fracMulSeriesTrunc(acc, base, k);
        }
        e >>= 1;
        if (e > 0) {
            base = fracMulSeriesTrunc(base, base, k);
        }
    }
    return acc[k] ?? FRAC_ZERO;
}
/** Multiplies two power series truncated to degree `maxDeg` */ function fracMulSeriesTrunc(a, b, maxDeg) {
    const out = new Array(maxDeg + 1).fill(FRAC_ZERO);
    const la = Math.min(a.length - 1, maxDeg);
    const lb = Math.min(b.length - 1, maxDeg);
    for(let i = 0; i <= la; i++){
        if (a[i].num === 0n) {
            continue;
        }
        const jMax = Math.min(lb, maxDeg - i);
        for(let j = 0; j <= jMax; j++){
            if (b[j].num === 0n) {
                continue;
            }
            out[i + j] = fracAdd(out[i + j], fracMul(a[i], b[j]));
        }
    }
    return out;
}
/**
 * Returns the outer polynomial `g` (if it exists with integer coefficients)
 * such that `p = g(h)` by repeated exact division by `h`, else `undefined`.
 */ function solveOuterFromInner(p, h, r) {
    const hPows = new Array(r + 1);
    hPows[0] = [
        1n
    ];
    for(let i = 1; i <= r; i++){
        hPows[i] = bMultiply(hPows[i - 1], h);
    }
    let rem = p;
    const g = new Array(r + 1).fill(0n);
    const lcH = h[0];
    for(let i = r; i >= 0; i--){
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
/** Returns the divisors of `n` in `[2, n/2]` in ascending order */ function properDivisors(n) {
    const ds = [];
    for(let d = 2; d * d <= n; d++){
        if (n % d !== 0) {
            continue;
        }
        ds.push(d);
        const q = n / d;
        if (q !== d && q !== n) {
            ds.push(q);
        }
    }
    ds.sort((a, b)=>a - b);
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
        g_ = bCompose(g_, [
            1n,
            c
        ]);
    }
    // Prefer positive inner leading coefficient using u -> -u.
    if (h_[0] < 0n) {
        h_ = bNegate(h_);
        g_ = bCompose(g_, [
            -1n,
            0n
        ]);
    }
    return {
        g: bRemoveLeadingZeros(g_),
        h: bRemoveLeadingZeros(h_)
    };
}


;// ./src/composition/expansion/e-compose.ts


/**
 * Returns the polynomial composition `p(q(x))` over expansion coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */ function eCompose(p, q) {
    if (p.length === 0) {
        return [];
    }
    // Horner form: (((p0)q + p1)q + ... + pn)
    let r = [];
    for (const c of p){
        r = eAdd(eMultiply(r, q), [
            c
        ]);
    }
    return r;
}


;// ./src/division/double/divmod.ts

/**
 * Returns the quotient and remainder of Euclidean long division of `a` by `b`
 * over double coefficients, i.e. `a = b*q + r` with `degree(r) < degree(b)`.
 *
 * * the leading term of the running remainder is eliminated explicitly at
 *   each step (it is not relied upon to cancel exactly in floating point)
 *
 * * leading zero coefficients of `a` and `b` are ignored
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 */ function divmod(a, b) {
    b = removeLeadingZeros(b);
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    let r = removeLeadingZeros(a);
    const d = b.length - 1; // degree of `b`
    const c = b[0]; // leading coefficient of `b`
    const qLen = r.length - d; // degree(a) - degree(b) + 1
    if (qLen <= 0) {
        return {
            q: [],
            r
        };
    }
    const q = new Array(qLen).fill(0);
    while(true){
        const deg = r.length - 1 - d; // degree of the current quotient term
        if (deg < 0) {
            break;
        }
        const coeff = r[0] / c;
        q[qLen - 1 - deg] = coeff;
        // r <- r - coeff*x^deg*b, dropping the (cancelling) leading term
        // explicitly
        const r_ = new Array(r.length - 1);
        for(let i = 1; i < r.length; i++){
            r_[i - 1] = i <= d ? r[i] - coeff * b[i] : r[i];
        }
        r = removeLeadingZeros(r_);
    }
    return {
        q: removeLeadingZeros(q),
        r
    };
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
 */ function bDivmod(a, b, positiveMultiplier = false) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    // (`bPdivTrivial` returns `m === 1n`, `q === []` and `r === a` if
    // `degree(a) < degree(b)`)
    return bPdivTrivial(a, b, positiveMultiplier);
}


;// ./node_modules/big-float-ts/node/basic/two-product.js
const two_product_f = 134217729; // 2**27 + 1;
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
    const c = two_product_f * a;
    const ah = c - (c - a);
    const al = a - ah;
    //const [bh, bl] = split(b);
    const d = two_product_f * b;
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
;// ./node_modules/big-float-ts/node/double-expansion/e-product.js




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
                product = twoProduct(product[0], multiplicant[0]);
            }
            else {
                product = scaleExpansion(product, multiplicant[0]);
            }
        }
        else if (product.length === 1) {
            product = scaleExpansion(multiplicant, product[0]);
        }
        else {
            product = expansionProduct(multiplicant, product);
        }
    }
    return eCompress(product);
    //return product;
}

//# sourceMappingURL=e-product.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-int-pow.js


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
        return expansionProduct(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return e_product_eProduct(as);
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




/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = eCompress(a);
    if (eSign(a) === 0) {
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
;// ./node_modules/big-float-ts/node/double-representation/bit-length.js
/* unused harmony import specifier */ var bit_length_getHighestSetBit;
/* unused harmony import specifier */ var bit_length_getLowestSetBit;




/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return bit_length_getHighestSetBit(a) - bit_length_getLowestSetBit(a) + 1;
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
;// ./node_modules/big-float-ts/node/double-expansion/e-div.js





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
        const bitlengthN = expBitLength(N_);
        const bitlengthD = expBitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1 / eEstimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = expansionProduct(N_, F);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = eToBitlength(N_, resultBitlengthUpperBound);
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
        D_ = expansionProduct(D_, F);
        F = eDiff([2], D_);
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
 */ function eElevateDegree(p, deg) {
    const p_ = p.slice();
    for(let i = 0; i < deg; i++){
        p_.push([
            0
        ]);
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
 */ function ePdivInternal(a, b) {
    let q = [];
    const d = eDegree(b);
    const c = b[0];
    let r = a;
    while(true){
        const deg = eDegree(r) - d;
        if (deg < 0) {
            return {
                q,
                r
            };
        }
        // The division below is guaranteed to be exact
        let s = [
            eDiv(r[0], c, 0)
        ];
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
 * * the multiplier `m` is also returned
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
 */ function ePdivTrivial(a, b, positiveMultiplier = false) {
    // change to pseudo-remainder, i.e. not simply r = a; this allows the 
    // remainders to stay in 'Z', i.e. let m = leadingCoeff(b)^(deg(a)-deg(b)+1)
    const d = eDegree(a) - eDegree(b) + 1;
    if (d < 1) {
        return {
            q: [],
            r: a,
            m: [
                1
            ]
        };
    }
    let m = eIntPow(b[0], d);
    m = positiveMultiplier ? eAbs(m) : m;
    const a_ = eMultiplyByConst(m, a);
    return {
        ...ePdivInternal(a_, b),
        m
    };
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
 */ function eDivmod(a, b, positiveMultiplier = false) {
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    // (`ePdivTrivial` returns `m === [1]`, `q === []` and `r === a` if 
    // `degree(a) < degree(b)`)
    return ePdivTrivial(a, b, positiveMultiplier);
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
 */ function vecSum(p_) {
    const p = p_.slice();
    for(let i = 1; i < p.length; i++){
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
 */ function SumK(p, K) {
    for(let i = 1; i < K; i++){
        p = vecSum(p);
    }
    let res = p[0];
    for(let i = 1; i < p.length; i++){
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
 */ function EFTHorner(p, x) {
    //--------------------------------------------------------------------------
    // This is exactly *Algorithm 5* from [2] above
    //--------------------------------------------------------------------------
    const pπ = []; // A polynomial containing part of the error
    const pσ = []; // Another polynomial containing part of the error
    let σ;
    let r̂ = p[0];
    for(let i = 1; i < p.length; i++){
        const [π, pi] = twoProduct(r̂, x);
        [σ, r̂] = twoSum(pi, p[i]);
        // inlined
        //r̂ = pi + p[i]; const bv = r̂ - pi; σ = (pi - (x-bv)) + (p[i]-bv);
        pπ.push(π);
        pσ.push(σ);
    }
    return {
        r̂,
        pπ,
        pσ
    };
}
// inlined
//const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];    for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); } return { r̂, pπ, pσ }


;// ./src/evaluate/double/eft-horner-k.ts

/**
 * Applies the error-free transformation `EFTHorner` recursively to a depth of
 * `K - 1` and returns the `2**(K-1) - 1` internal node results (`hs`) and the
 * `2**(K-1)` leaf polynomials (`ps`) that still need to be evaluated.
 *
 * * **precondition:** `1 <= K <= p.length`
 *
 * @param p
 * @param x
 * @param K
 *
 * @internal
 */ function EFTHornerK(p, x, K) {
    const ps = [
        p
    ];
    const hs = [];
    const numInternal = 2 ** (K - 1) - 1; // number of internal nodes of the tree
    for(let i = 0; i < numInternal; i++){
        const { r̂, pπ, pσ } = EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    // the leaves are the last `2**(K-1)` polynomials
    return {
        hs,
        ps: ps.slice(numInternal)
    };
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
 */ function Horner(p, x) {
    let q = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function CompHornerK(p, x, K) {
    if (p.length <= 1) {
        return p.length === 0 ? 0 : p[0]; // the zero polynomial or a constant
    }
    // each error-free transformation reduces the degree by one so the depth
    // of the tree is limited by the degree
    K = Math.max(1, Math.min(p.length, K));
    const { hs, ps } = EFTHornerK(p, x, K);
    // evaluate all the leaves
    for(let i = 0; i < ps.length; i++){
        hs.push(Horner(ps[i], x));
    }
    const r̄ = SumK(hs, K);
    return r̄;
}


;// ./src/error-analysis/condition-number.ts


const { abs: condition_number_abs } = Math;
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
 */ function conditionNumber(p, x) {
    const pN = absCoeff(p);
    const pD = p;
    const N = CompHornerK(pN, condition_number_abs(x), 4); // Σ|aᵢ||x|ⁱ
    const D = condition_number_abs(CompHornerK(pD, x, 4));
    return condition_number_abs(N / D);
}


;// ./node_modules/double-double/node/double-representation/parse-double.js
/* unused harmony import specifier */ var parse_double_doubleToBinaryString;
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

/**
 * Shared view used to read the bits of a double without allocating.
 *
 * @internal
 */
const dv = new DataView(new ArrayBuffer(8));
/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 has been subtracted) and the
 * significand has the hidden bit added if appropriate.
 *
 * * see https://github.com/bartaz/ieee754-visualization
 *
 * * the `significand` is returned as an array of 7 bytes, where the first byte
 *   is the 4 most significant bits of the significand (with the hidden bit added
 *   if appropriate) and the remaining 6 bytes are the remaining bits of the
 *   significand.
 */
function parse_double_parseDouble(x) {
    dv.setFloat64(0, x);
    const p0 = dv.getUint8(0);
    const p1 = dv.getUint8(1);
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 0b0111_1111) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = [
        (p1 & 0b0000_1111) + hiddenMsb,
        dv.getUint8(2), dv.getUint8(3), dv.getUint8(4),
        dv.getUint8(5), dv.getUint8(6), dv.getUint8(7)
    ];
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
 */ function getUlp(x) {
    // ULP is only defined for finite IEEE-754 numbers.
    if (!Number.isFinite(x)) {
        return Number.NaN;
    }
    const { exponent: exp } = parse_double_parseDouble(x);
    const r = 2 ** (exp - 52);
    return r;
}


;// ./src/error-analysis/is-exact-power-of-2.ts

/**
 * Returns `true` if `n` is an exact power of 2, i.e. if there exists an
 * integer `k` such that `n === 2^k`.
 * 
 * @param n 
 */ function isExactPowerOf2(n) {
    const { sign, exponent: exp, significand: sig } = parse_double_parseDouble(n);
    if (n === 0 || Number.isNaN(n) || !Number.isFinite(n) || sign === 1) {
        return false;
    }
    // `n` is a power of 2 iff exactly one significand limb is non-zero and
    // that limb is a power of 2 (this also covers subnormal numbers)
    let idx = -1;
    for(let i = 0; i < sig.length; i++){
        if (sig[i] !== 0) {
            if (idx !== -1) {
                return false; // more than one non-zero significand limb
            }
            idx = i;
        }
    }
    // check if the single non-zero limb is a power of 2
    return (sig[idx] & sig[idx] - 1) === 0;
}


;// ./src/error-analysis/is-subnormal.ts
const { abs: is_subnormal_abs } = Math;
const MIN_NON_SUBNORMAL = 2.2250738585072014e-308; // === 2**-1022
function isSubnormal(n) {
    return !Number.isNaN(n) && Number.isFinite(n) && n !== 0 && is_subnormal_abs(n) < MIN_NON_SUBNORMAL;
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
 *   - -Number.MIN_VALUE => -0
 *
 *  * `nextdown(x) === -nextup(-x)`
 *
 */ function nextup(n) {
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
    }
    // For a negative exact power of two the next number up (towards zero) is
    // only half an ulp away - except at or below the smallest normal number
    // (`2**-1022`) where the ulp (`2**-1074`) is constant.
    const r = n < 0 && -n > 2 ** -1022 && isExactPowerOf2(-n) ? n + getUlp(n) / 2 : n + getUlp(n);
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
 */ function nextup2(x) {
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
 */ function nextdown(n) {
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


;// ./src/util/sum.ts
/**
 * Returns the sum of an array of doubles.
 *
 * @param vs
 */ function sum(vs) {
    let sum = 0;
    for(let i = 0; i < vs.length; i++){
        sum += vs[i];
    }
    return sum;
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
 */ function random(rngIdx) {
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
 */ function randomIntInRange(minV, maxV, rngIdx) {
    const terms = [];
    const range = maxV - minV + 1;
    for(let i = 0; i < 32; i++){
        const rand = random(rngIdx !== undefined ? 32 * rngIdx + i : undefined);
        const v = round(rand / (Number.EPSILON / 2)) % 2 ** 32;
        const multiplier = 2 ** (32 * i);
        if (multiplier > range) {
            break;
        }
        terms.push(multiplier * v);
    }
    return sum(terms) % range + minV;
}


;// ./src/gcd/bigint/b-mod.ts
/**
 * Returns the least non-negative residue of `a` modulo `m`.
 */ function bMod(a, m) {
    const r = a % m;
    return r < 0n ? r + m : r;
}


;// ./src/gcd/bigint/b-xgcd.ts
/**
 * Returns the GCD of `a` and `p` together with Bezout coefficients `x` and `y`
 * such that `a*x + p*y = gcd(a,p)`.
 */ function bXgcd(a, p) {
    let oldR = a;
    let r = p;
    let oldS = 1n;
    let s = 0n;
    let oldT = 0n;
    let t = 1n;
    while(r !== 0n){
        const q = oldR / r;
        [oldR, r] = [
            r,
            oldR - q * r
        ];
        [oldS, s] = [
            s,
            oldS - q * s
        ];
        [oldT, t] = [
            t,
            oldT - q * t
        ];
    }
    return {
        gcd: oldR,
        x: oldS,
        y: oldT
    };
}


;// ./src/euclidean-division-related/bigint/b-inverse-mod-p.ts


/**
 * Returns the multiplicative inverse of `a` modulo `p`, i.e. the `x` in
 * `[0,p)` such that `a*x ≡ 1 (mod p)`.
 *
 * * **precondition:** `a` and `p` must be coprime (e.g. `p` is prime and
 *   `a` is not a multiple of `p`), else the result is meaningless
 *
 * * see also the function `bXgcd`
 *
 * @param a
 * @param p the modulus
 *
 * @example
 * ```typescript
 * bInverseModP(3n, 11n);  //=> 4n  (since 3*4 = 12 ≡ 1 (mod 11))
 * bInverseModP(2n, 5n);   //=> 3n
 * ```
 *
 * @doc
 */ function bInverseModP(a, p) {
    // the Bezout coefficient `x` in `a*x + p*y = gcd(a,p) = 1`
    return bMod(bXgcd(a, p).x, p);
}


;// ./src/euclidean-division-related/bigint/b-pdiv-mod-p.ts







function modPoly(p_, p) {
    return bRemoveLeadingZeros(p_.map((c)=>bMod(c, p)));
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
 */ function bPdivModP(a, b, p) {
    let q = [];
    b = modPoly(b, p);
    const d = bDegree(b);
    const c = b[0];
    // multiplicative inverse of leading coefficient of b
    const lcBInv = bInverseModP(c, p);
    let r = modPoly(a, p);
    while(true){
        const deg = bDegree(r) - d;
        if (deg < 0) {
            return {
                q,
                r
            };
        }
        const s = [
            bMod(r[0] * lcBInv, p),
            ...Array(deg).fill(0n)
        ];
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
 */ function bContent(p) {
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
 */ function bPrimitivePart(p) {
    const c = bContent(p);
    const p_ = [];
    for(let i = 0; i < p.length; i++){
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
 */ function bPremSequencePrimitive(f, g) {
    const r = [
        f,
        g
    ]; // Initialize the PRS
    let i = 1;
    while(true){
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
 * * **precondition:** `deg(f) >= deg(g)`
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
 */ function bPremSequenceSubresultant(f, g, sturm = false) {
    const r = [
        f,
        g
    ]; // Initialize the PRS
    const d = [
        bDegree(f),
        bDegree(g)
    ];
    const a = [
        1n
    ]; // a_1 === 1
    const c = [
        1n
    ]; // c_1 === 1
    let i = 1;
    while(true){
        a.push(r[i][0]); // leading coefficient of r[i]
        const d_ = d[i - 1] - d[i];
        const bD_ = BigInt(d_);
        const sgn = sturm ? -1 : (d_ + 1) % 2 === 0 ? +1 : -1;
        let D = a[i - 1] * c[i - 1] ** bD_;
        if (sturm && D < 0n) {
            // In Sturm mode the remainder's sign must be preserved (bar the
            // final negation) but `D` can be negative when a degree drop of
            // 2 or more occurred earlier in the sequence - divide by `|D|`.
            D = -D;
        }
        const exp = -bD_ + 1n;
        const cTerm1 = a[i] ** bD_;
        const cTerm2 = c[i - 1] ** (exp < 0n ? -exp : exp);
        c.push(exp < 0 ? cTerm1 / cTerm2 : cTerm1 * cTerm2);
        let r_ = bPdivTrivial(r[i - 1], r[i], sturm).r.map((coeff)=>coeff / D);
        r_ = sgn > 0 ? r_ : r_.map((c)=>-c);
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
 */ function bPremSequenceTrivial(f, g) {
    const r = [
        f,
        g
    ]; // Initialize the PRS
    let i = 1;
    while(true){
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
 * * leading zero coefficients are removed before the chain is calculated
 *
 * * returns `[]` for the zero polynomial and `[p]` for a non-zero constant
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
 */ function bSturmChain(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length === 0) {
        return [];
    } // the zero polynomial
    if (p.length === 1) {
        return [
            p
        ];
    } // a non-zero constant
    const dp = bDifferentiate(p);
    return bPremSequenceSubresultant(p, dp, true);
}


;// ./src/euclidean-division-related/expansion/e-prem-sequence-subresultant.ts








/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 * 
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
 * * **precondition:** `deg(f) >= deg(g)`
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
 */ function ePremSequenceSubresultant(f, g, sturm = false) {
    const r = [
        f,
        g
    ]; // Initialize the PRS
    const d = [
        eDegree(f),
        eDegree(g)
    ];
    const a = [
        [
            1
        ]
    ]; // a_1 === 1
    const c = [
        [
            1
        ]
    ]; // c_1 === 1
    let i = 2;
    while(true){
        a.push(r[i - 1][0]); // leading coefficient of r[i-1]
        const d_ = d[i - 2] - d[i - 1];
        const sgn = sturm ? -1 : (d_ + 1) % 2 === 0 ? +1 : -1;
        let D = expansionProduct(a[i - 2], eIntPow(c[i - 2], d_));
        if (sturm && eSign(D) < 0) {
            // In Sturm mode the remainder's sign must be preserved (bar the
            // final negation) but `D` can be negative when a degree drop of
            // 2 or more occurred earlier in the sequence - divide by `|D|`.
            D = eNegativeOf(D);
        }
        const exp = -d_ + 1;
        const cTerm1 = eIntPow(a[i - 1], d_);
        const cTerm2 = eIntPow(c[i - 2], Math.abs(exp));
        c.push(exp < 0 ? eDiv(cTerm1, cTerm2, 0) : expansionProduct(cTerm1, cTerm2));
        let r_ = ePdivTrivial(r[i - 2], r[i - 1], sturm).r.map((coeff)=>eDiv(coeff, D, 0));
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
 */ function premSequenceSubresultant(f, g, sturm = false) {
    return ePremSequenceSubresultant(f.map((c)=>[
            c
        ]), g.map((c)=>[
            c
        ]), sturm);
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
 * * leading zero coefficients are removed before the chain is calculated
 *
 * * returns `[]` for the zero polynomial and `[p]` for a non-zero constant
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
 */ function sturmChain(p) {
    // convert from double precision to Shewchuk expansion
    const p_ = removeLeadingZeros(p).map((c)=>[
            c
        ]);
    if (p_.length === 0) {
        return [];
    } // the zero polynomial
    if (p_.length === 1) {
        return [
            p_
        ];
    } // a non-zero constant
    const dp = eDifferentiate(p_);
    return ePremSequenceSubresultant(p_, dp, true);
}


;// ./node_modules/big-float-ts/node/double-expansion/e-long-divide.js







const sign = Math.sign;
function eLongDivide(N, D) {
    N = eCompress(N);
    D = eCompress(D);
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
            return { div: eNegativeOf(N), rem: [0] };
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
            rems.push(scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = eCompress(eDiff(N, eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = growExpansion(div, divs[i]);
    }
    div = eCompress(div);
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
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}

//# sourceMappingURL=e-long-divide.js.map
;// ./node_modules/big-float-ts/node/double-expansion/e-rem.js

/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return eLongDivide(a, b).rem;
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
 */ function eGcdInt(a, b) {
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
    while(eSign(b) !== 0){
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
 */ function eGcdInts(vals) {
    const vals_ = vals.slice();
    const len = vals_.length;
    // make array of numbers all positive
    for(let i = 0; i < len; i++){
        vals_[i] = eAbs(vals_[i]);
    }
    let a = vals_[0];
    for(let i = 1; i < len; i++){
        a = eGcdInt(a, vals_[i]);
    }
    return a;
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
 */ function eContent(p) {
    if (p.length === 0) {
        // the zero polynomial
        return [
            1
        ];
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
 */ function ePrimitivePart(p) {
    const c = eContent(p);
    const p_ = [];
    for(let i = 0; i < p.length; i++){
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
 */ function ePremSequencePrimitive(f, g) {
    const r = [
        f,
        g
    ]; // Initialize the PRS
    let i = 1;
    while(true){
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


;// ./src/scale-to-int/scale-floatss-to-intss.ts


/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can if the
 *   magnitudes of the given floats differ too much - use [[scaleFloatssToBigintss]]
 *   if this is a concern)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */ function scaleFloatssToIntss(ass) {
    let e = -1024;
    for(let i = 0; i < ass.length; i++){
        const c = ass[i];
        for(let j = 0; j < c.length; j++){
            const a = c[j];
            if (a === 0) {
                continue;
            }
            const scalePower = -lsbExponent(a);
            if (scalePower > e) {
                e = scalePower;
            }
        }
    }
    return ass.map((as)=>as.map((a)=>multByPow2(a, e)));
}


;// ./src/euclidean-division-related/expansion/e-sturm-chain.ts




/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders.
 * 
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 * 
 * * leading zero coefficients are removed before the chain is calculated
 *
 * * returns `[]` for the zero polynomial and `[p]` for a non-zero constant
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
 */ function eSturmChain(p) {
    p = eRemoveLeadingZeros(p);
    if (p.length === 0) {
        return [];
    } // the zero polynomial
    p = scaleFloatssToIntss(p);
    if (p.length === 1) {
        return [
            p
        ];
    } // a non-zero constant
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
 */ function bHorner(p, x) {
    let q = 0n;
    for(let i = 0; i < p.length; i++){
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
 */ function bEvaluateAt0(p) {
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
 */ function bEvaluateAt1(p) {
    let res = 0n;
    for(let i = 0; i < p.length; i++){
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
 */ function AbsHorner(p, x) {
    const _x = abs_horner_abs(x);
    let q = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function HornerSum(p1, p2, a) {
    let result = 0;
    for(let i = 0; i < p1.length; i++){
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
 */ function HornerAbsSum(p1, p2, x) {
    //--------------------------------------------------------------------------
    // This is used in algorithms in [2] above
    //--------------------------------------------------------------------------
    let q = 0;
    for(let i = 0; i < p1.length; i++){
        // NOTE: The line below should **NOT** be `abs(p1[i]) + abs(p2[i])` as
        // one would expect, see [2] above eq. (7).
        q = horner_abs_sum_abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}


;// ./src/evaluate/double/comp-horner-is-faithful.ts





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
 */ function compHornerIsFaithful(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    const ĉ = HornerSum(pπ, pσ, x);
    const [e, r̄] = twoSum(r̂, ĉ);
    const b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
    const α̂ = γs(2 * n - 1) * b̂ / (1 - 2 * (n + 1) * u);
    const β̂ = (α̂ + Math.abs(e)) / (1 - 2 * u);
    return {
        isFaithful: α̂ < u / 2 * Math.abs(r̄),
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
 */ function compHornerWithRunningError(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    // inlined
    //const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];    for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
    const ĉ = HornerSum(pπ, pσ, x);
    const [e, r̄] = twoSum(r̂, ĉ);
    const b̂ = HornerAbsSum(pπ, pσ, comp_horner_with_running_error_abs(x));
    const α̂ = b̂ * γs(2 * n - 1) / (1 - 2 * (n + 1) * u); // [2] Eq. (20)
    const β̂ = (α̂ + comp_horner_with_running_error_abs(e)) / (1 - 2 * u);
    return [
        r̄,
        β̂
    ];
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
 */ function compHorner(p, x) {
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
 */ function hornerWithRunningError(p, x) {
    const _x = horner_with_running_error_abs(x);
    let r̂ = p[0];
    let e = horner_with_running_error_abs(r̂) * 0.5;
    for(let i = 1; i < p.length; i++){
        r̂ = r̂ * x + p[i];
        e = e * _x + horner_with_running_error_abs(r̂);
    }
    e = u * (2 * e - horner_with_running_error_abs(r̂));
    return [
        r̂,
        e
    ];
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
 */ function evalCertified(p, x, pE = undefined, multiplier = 1) {
    const p0 = p[0];
    // first do a fast evaluation
    const [r, e1] = hornerWithRunningError(p0, x);
    // inlined above line:
    //const r = p0[0]; const e1 = Math.abs(r) / 2; for (const i=1; i<p0.length; i++) { r = r*x + p0[i]; e1 = Math.abs(x)*e1 + Math.abs(r); } e1 = Number.EPSILON * (2*e1 - Math.abs(r));
    /** the error due to not considering p[1] */ const e2 = γ2 * AbsHorner(p0, x);
    // inlined above line:
    //const e2 = abs(p0[0]); for (const i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }
    /** error due to imprecision in coefficients */ // the line below was changed due to negative values of x now also allowed
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
    let e = c1 + c2 + c3 + E;
    // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    r̂ = C1 + C2 + C3 + r̂;
    e += eval_certified_1 * Math.abs(r̂);
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
 */ function evalCertifiedInclError(p, x, pE = undefined, multiplier = 1) {
    // first do a fast evaluation
    const [r, e1] = hornerWithRunningError(p[0], x);
    // the line below was changed due to negative values of x now also allowed
    const e2 = eval_certified_incl_error_2 * AbsHorner(p[0], x); // the error due to not considering p[1]
    // error due to imprecision in coefficients
    // the line below was changed due to negative values of x now also allowed
    //const E = pE ? Horner(pE, x) : 0; 
    const E = pE !== undefined ? Horner(pE, eval_certified_incl_error_abs(x)) : 0;
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < eval_certified_incl_error_abs(r)) {
        // we are within bounds
        return {
            r̂: r,
            e: ee
        };
    }
    // error is too large - do a more precise evaluation
    const EFTHorner_ = EFTHorner(p[0], x);
    const { pπ, pσ } = EFTHorner_;
    let { r̂ } = EFTHorner_;
    const [C1, c1] = hornerWithRunningError(pπ, x);
    const [C2, c2] = hornerWithRunningError(pσ, x);
    const [C3, c3] = hornerWithRunningError(p[1], x);
    let e = c1 + c2 + c3 + E; // typically: c1,c2 < c3 < E
    r̂ = C1 + C2 + C3 + r̂; // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    e += eval_certified_incl_error_1 * eval_certified_incl_error_abs(r̂);
    if (e * multiplier < eval_certified_incl_error_abs(r̂)) {
        return {
            r̂,
            e
        };
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return {
        r̂: 0,
        e
    };
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
 */ function evalK(p, x) {
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
 */ function evaluateAt0(p) {
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
 */ function evaluateAt1(p) {
    let res = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function ddHornerWithInpError(p, x, p_) {
    const _x = dd_horner_with_inp_error_abs(x);
    let r̂ = p[0];
    let r̂_ = p_[0];
    for(let i = 1; i < p.length; i++){
        const r̂x = qmd(x, r̂);
        r̂ = qaq(r̂x, p[i]);
        r̂_ = r̂_ * _x + dd_horner_with_inp_error_abs(r̂x[1]) + p_[i] + dd_horner_with_inp_error_abs(r̂[1]);
    }
    return [
        r̂,
        r̂_
    ];
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
 */ function ddHorner(p, x) {
    let q = [
        0,
        0
    ];
    for(let i = 0; i < p.length; i++){
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
 */ function eeHorner(p, x) {
    let result = [
        0
    ];
    for(let i = 0; i < p.length; i++){
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
 */ function eEvaluateAt0(p) {
    return p.length === 0 ? [
        0
    ] : p[p.length - 1];
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
 */ function eEvaluateAt1(p) {
    let res = [
        0
    ];
    for(let i = 0; i < p.length; i++){
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
 */ function eHorner(p, x) {
    let q = [
        0
    ];
    for(let i = 0; i < p.length; i++){
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
 */ function content(p) {
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
 */ function primitivePart(p) {
    const c = content(p);
    const p_ = [];
    for(let i = 0; i < p.length; i++){
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
 */ function bGcdModP(a, b, p) {
    if (a.length === 0) {
        return b;
    } else if (b.length === 0) {
        return a;
    }
    const r = [
        a,
        b
    ];
    let i = 1;
    while(true){
        const r_ = bPdivModP(r[i - 1], r[i], p).r;
        if (r_.length === 0) {
            break;
        }
        r.push(r_);
        if (r_.length === 1) {
            break;
        }
        i++;
    }
    return r[r.length - 1];
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
 */ function bP2NormSquared(p) {
    let s = 0n;
    for(let i = 0; i < p.length; i++){
        s += p[i] ** 2n;
    }
    return s;
}


;// ./src/util/bigint/b-sqrt-ceil.ts
/**
 * Returns the smallest non-negative integer `s` such that `s*s >= n`, i.e.
 * `⌈√n⌉`.
 *
 * * uses Newton's method
 *
 * @param n a non-negative bigint
 *
 * @doc
 */ function bSqrtCeil(n) {
    if (n < 0n) {
        throw new Error('`n` must be non-negative.');
    }
    if (n < 2n) {
        return n;
    }
    // initial guess: 2^⌈bits/2⌉ >= √n
    const bits = n.toString(2).length;
    let x = 1n << BigInt(Math.ceil(bits / 2));
    // Newton's method (converges from above to ⌊√n⌋)
    while(true){
        const y = x + n / x >> 1n;
        if (y >= x) {
            break;
        }
        x = y;
    }
    return x * x === n ? x : x + 1n;
}


;// ./src/gcd/bigint/landau-mignotte-bound-bigint.ts



/**
 * Returns an integer upper bound (calculated using bigints so that overflow
 * cannot occur) on the absolute value of every coefficient of the gcd of
 * `p` and `q` in `Z[x]`, i.e. the Landau-Mignotte bound
 * `2^min(deg(p),deg(q)) * gcd(lc(p),lc(q)) * min(||p||/|lc(p)|, ||q||/|lc(q)|)`
 * rounded up (exactly) to an integer.
 *
 * * see "Computer Algebra, F.Winkler, WS 2010/11, page 48"
 *
 * * see also [[bLandauMignotteBound]] that returns the bound as a double (and
 *   that can overflow to `Infinity` for very large coefficients)
 *
 * * leading coefficients are not allowed to be zero!
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param q another polynomial
 *
 * @doc
 */ function bLandauMignotteBoundBigint(p, q) {
    const lcP = p[0] < 0n ? -p[0] : p[0];
    const lcQ = q[0] < 0n ? -q[0] : q[0];
    const dP = p.length - 1;
    const dQ = q.length - 1;
    const A = 2n ** BigInt(dP < dQ ? dP : dQ);
    const B = bGcdInt(lcP, lcQ);
    const AB2 = A * B * (A * B);
    // The smallest integer `M` with `M >= A·B·||p||₂/|lc(p)|` satisfies
    // `M²·lc(p)² >= A²B²·||p||₂²`, i.e. `M = ⌈√⌈A²B²·||p||₂² / lc(p)²⌉⌉`
    // (exactly the ceiling of the real-valued bound)
    const M1 = bSqrtCeil(ceilDiv(AB2 * bP2NormSquared(p), lcP * lcP));
    const M2 = bSqrtCeil(ceilDiv(AB2 * bP2NormSquared(q), lcQ * lcQ));
    return M1 < M2 ? M1 : M2;
}
/** Returns `⌈a/b⌉` for non-negative `a` and positive `b` */ function ceilDiv(a, b) {
    return (a + b - 1n) / b;
}


;// ./src/gcd/bigint/chinese-remainder-algorithm.ts


/**
 * Combines the two congruences `x ≡ r1 (mod m1)` and `x ≡ r2 (mod m2)` and
 * returns the least nonnegative solution modulo `m1*m2`.
 *
 * * **precondition:** `m1` and `m2` must be non-zero and coprime.
 */ function chineseRemainderAlgorithm(r1, r2, m1, m2) {
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
/** @internal */ function buildLargePrimePool(count) {
    const pool = [];
    // Start near 2^32 and walk down over odd candidates.
    let n = 4294967291;
    while(pool.length < count){
        if (isPrime32(n)) {
            pool.push(BigInt(n));
        }
        n -= 2;
    }
    return pool;
}
/** @internal */ function isPrime32(n) {
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
    for(let d = 5; d * d <= n; d += 6){
        if (n % d === 0 || n % (d + 2) === 0) {
            return false;
        }
    }
    return true;
}
// buildLargePrimePool(96);  <-- 96 primes below 2^32
const primes = [
    4294967291n,
    4294967279n,
    4294967231n,
    4294967197n,
    4294967189n,
    4294967161n,
    4294967143n,
    4294967111n,
    4294967087n,
    4294967029n,
    4294966997n,
    4294966981n,
    4294966943n,
    4294966927n,
    4294966909n,
    4294966877n,
    4294966829n,
    4294966813n,
    4294966769n,
    4294966667n,
    4294966661n,
    4294966657n,
    4294966651n,
    4294966639n,
    4294966619n,
    4294966591n,
    4294966583n,
    4294966553n,
    4294966477n,
    4294966447n,
    4294966441n,
    4294966427n,
    4294966373n,
    4294966367n,
    4294966337n,
    4294966297n,
    4294966243n,
    4294966237n,
    4294966231n,
    4294966217n,
    4294966187n,
    4294966177n,
    4294966163n,
    4294966153n,
    4294966129n,
    4294966121n,
    4294966099n,
    4294966087n,
    4294966073n,
    4294966043n,
    4294966007n,
    4294966001n,
    4294965977n,
    4294965971n,
    4294965967n,
    4294965949n,
    4294965937n,
    4294965911n,
    4294965887n,
    4294965847n,
    4294965841n,
    4294965839n,
    4294965821n,
    4294965793n,
    4294965767n,
    4294965757n,
    4294965737n,
    4294965733n,
    4294965721n,
    4294965691n,
    4294965683n,
    4294965679n,
    4294965673n,
    4294965671n,
    4294965659n,
    4294965641n,
    4294965617n,
    4294965613n,
    4294965601n,
    4294965581n,
    4294965529n,
    4294965487n,
    4294965461n,
    4294965457n,
    4294965413n,
    4294965383n,
    4294965361n,
    4294965347n,
    4294965331n,
    4294965313n,
    4294965307n,
    4294965263n,
    4294965251n,
    4294965229n,
    4294965203n,
    4294965193n
];


;// ./src/gcd/bigint/b-gcd-modular.ts










let primesShuffled;
function buildShuffledPrimePool() {
    const pool = primes;
    const arr = pool.slice();
    // Deterministic Fisher-Yates shuffle using squares-rng output as entropy.
    for(let i = arr.length - 1; i > 0; i--){
        const r = squares(i) >>> 0;
        const j = r % (i + 1);
        [arr[i], arr[j]] = [
            arr[j],
            arr[i]
        ];
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
 */ function bGcdModular(a, b) {
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
    const M = 2n * d * bLandauMignotteBoundBigint(a, b);
    let primeIdx = 0;
    let p;
    let dModP;
    let g;
    while(true){
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
            return [
                1n
            ];
        }
        let P = p;
        // (4)
        // while P ≤ M do
        //    p := a new prime not dividing d;
        //    c(p) := gcd(a(p), b(p)); [with lc(c(p)) = 1]
        //    g(p) := (d mod p) · c(p);
        //    if deg(g(p)) < deg(g) then goto (3);
        //    if deg(g(p)) = deg(g) then g := CRA(g, g(p), P, p); P := P·p
        while(P <= M){
            let g$p;
            ({ p, dModP, primeIdx, g: g$p } = getNextGoodGp(a, b, d, primeIdx));
            if (g$p.length < g.length) {
                g = g$p;
                if (g.length <= 1) {
                    return [
                        1n
                    ];
                }
                P = p;
                continue; // goto (3)
            }
            if (g$p.length === g.length) {
                g = g.map((c, idx)=>chineseRemainderAlgorithm(c, g$p[idx], P, p));
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
    while(true){
        const nextPrime = newPrimeNotDividingD(d, primeIdx);
        const { p, dModP } = nextPrime;
        primeIdx = nextPrime.primeIdx;
        const g = getGp(a, b, dModP, p);
        if (g !== undefined) {
            return {
                p,
                dModP,
                primeIdx,
                g
            };
        }
    }
}
function getGp(a, b, dModP, p) {
    const a$p = a.map((c)=>bMod(c, p));
    const b$p = b.map((c)=>bMod(c, p));
    // If `b` reduces to zero modulo `p`, modular division in bGcdModP would
    // be ill-defined for this prime; skip this prime.
    if (b$p.every((c)=>c === 0n)) {
        return undefined;
    }
    const c$p = makeMonicModP(bGcdModP(a$p, b$p, p), p);
    return c$p.map((c)=>bMod(dModP * c, p));
}
function makeMonicModP(p_, p) {
    if (p_.length === 0) {
        return [];
    }
    const lcInv = bInverseModP(p_[0], p);
    return p_.map((c)=>bMod(c * lcInv, p));
}
function fromResidues(p_, m) {
    const halfM = m / 2n;
    return p_.map((c)=>{
        const r = bMod(c, m);
        return r > halfM ? r - m : r;
    });
}
function newPrimeNotDividingD(d, primeIdx) {
    let p;
    let dModP;
    while(true){
        p = (primesShuffled || (primesShuffled = buildShuffledPrimePool()))[primeIdx];
        if (p === undefined) {
            throw new Error('Ran out of primes in modular GCD.');
        }
        primeIdx++;
        dModP = bMod(d, p);
        if (dModP === 0n) {
            continue;
        }
        return {
            p,
            dModP,
            primeIdx
        };
    }
}


;// ./src/gcd/bigint/b-gcd-prs.ts

/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs).
 *
 * * the returned polynomial is the gcd up to a (non-zero) constant multiple,
 *   e.g. `[4n]` or `[3n,3n]` may be returned for a gcd of `1` or `x + 1`
 *   respectively - use [[bPrimitivePart]] to normalize it
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
 */ function bGcdPrs(a, b) {
    if (a.length === 0) {
        return b;
    } else if (b.length === 0) {
        return a;
    }
    // the pseudo remainder sequence requires `deg(a) >= deg(b)`
    if (a.length < b.length) {
        [a, b] = [
            b,
            a
        ];
    }
    const seq = bPremSequenceSubresultant(a, b, false);
    return seq[seq.length - 1];
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
 */ function p2Norm(p) {
    let s = 0;
    for(let i = 0; i < p.length; i++){
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
 * * the bound is returned as a double and can thus overflow to `Infinity` for
 *   very large coefficients - see [[bLandauMignotteBoundBigint]] for an exact
 *   integer bound
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param q 
 */ function bLandauMignotteBound(p, q) {
    const lcP = p[0];
    const lcQ = q[0];
    const dP = BigInt(p.length - 1);
    const dQ = BigInt(q.length - 1);
    const pD = p.map((c)=>Number(c));
    const qD = q.map((c)=>Number(c));
    const lcPD = Number(p[0]);
    const lcQD = Number(q[0]);
    const A = 2n ** (dP < dQ ? dP : dQ);
    const B = bGcdInt(lcP, lcQ);
    const C1 = p2Norm(pD) / landau_mignotte_bound_abs(lcPD);
    const C2 = p2Norm(qD) / landau_mignotte_bound_abs(lcQD);
    return Number(A) * Number(B) * landau_mignotte_bound_min(C1, C2);
}


;// ./src/gcd/double/gcd-prs.ts



/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs) as `bigint`s.
 *
 * * the returned polynomial is the gcd up to a (non-zero) constant multiple,
 *   e.g. `[4n]` or `[3n,3n]` may be returned for a gcd of `1` or `x + 1`
 *   respectively - use [[bPrimitivePart]] to normalize it
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
 */ function gcdPrs(a, b) {
    if (a.length === 0) {
        return scaleFloatsToBigints(b);
    } else if (b.length === 0) {
        return scaleFloatsToBigints(a);
    }
    // the pseudo remainder sequence requires `deg(a) >= deg(b)`
    if (a.length < b.length) {
        [a, b] = [
            b,
            a
        ];
    }
    const [A, B] = scaleFloatssToBigintss([
        a,
        b
    ]);
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
 */ function bP1Norm(p) {
    let s = 0n;
    for(let i = 0; i < p.length; i++){
        const n = p[i];
        s += n < 0n ? -n : n;
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
 */ function bPInfNorm(p) {
    let max = 0n;
    for(let i = 0; i < p.length; i++){
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
 */ function p1Norm(p) {
    let s = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function pInfNorm(p) {
    let max = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function eP1Norm(p) {
    let s = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function eP2Norm(p) {
    let s = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function ePInfNorm(p) {
    let max = 0;
    for(let i = 0; i < p.length; i++){
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
 */ function fromRoots(roots) {
    let p = [
        1
    ];
    for(let i = 0; i < roots.length; i++){
        p = multiply(p, [
            1,
            -roots[i]
        ]);
    }
    return p;
}


;// ./src/predictive-random/double/random.ts

/**
 * Arbitrary seed value for the simple random number generator.
 * 
 * @internal
 */ const SEED = 123456789;
/**
 * The range for the simple random number generator, i.e. the generated
 * numbers will be in [0,RANGE), i.e. `2**32`.
 * 
 * @internal
 */ const RANGE = 4294967296;
/**
 * Creates a function from the given function with parameters similar
 * to flatRoots but with an extra parameter in the beginning indicating
 * the length of the array generated by the original function.
 * 
 * @param f
 * 
 * @internal
 */ function createArrFunction(f) {
    return function(n, d, a, b, seed = SEED, odds = 0) {
        const res = [];
        for(let i = 0; i < n; i++){
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
 * flatRootsArr(2,3,0,10); //=> [[1, -17.445259802043438, 96.94898590669898, -172.1346546982741], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826]]
 * flatRootsArr(2,3,0,10); //=> [[1, -17.445259802043438, 96.94898590669898, -172.1346546982741], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826]]
 * ```
 * 
 * @doc
 */ const flatRootsArr = createArrFunction(flatRoots);
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
 * @param odds ignored (there are no roots to duplicate) - only present for
 * signature compatibility with [[flatRootsArr]]
 *
 * @example
 * ```typescript
 * flatCoefficientsArr(2,3,-2,2);//=> [[0.17491660453379154, -0.43646731972694397, 1.2396546360105276], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066]]
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.17491660453379154, -0.43646731972694397, 1.2396546360105276], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066]]
 * ```
 * 
 * @doc
 */ const flatCoefficientsArr = createArrFunction(flatCoefficients);
/**
 * Returns a quasi-random number to be used as the next input to this function.
 * 
 * * see [stackoverflow](https://stackoverflow.com/questions/3062746/special-simple-random-number-generator)
 * 
 * @param seed
 * 
 * @internal
 */ function predictiveRandom(seed) {
    const a = 134775813;
    // `Math.imul` gives the exact product modulo 2**32 (`a * seed` would
    // exceed 2**53 and lose precision) and `>>> 0` converts to an unsigned
    // 32-bit integer; the LCG then has the full period of 2**32 (since
    // `a ≡ 1 (mod 4)` and the increment, 1, is odd)
    return Math.imul(a, seed) + 1 >>> 0;
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
 */ function randomArray(n, a, b, seed, odds = 0) {
    let vs = [];
    // (stop as soon as enough values have been generated - with `odds > 0`
    // duplicates may be pushed so fewer than `n` iterations may be required)
    while(vs.length < n){
        seed = predictiveRandom(seed);
        const v = seed / RANGE * (b - a) + a;
        seed = push(seed, vs, v, odds);
    }
    vs = vs.slice(0, n);
    return {
        vs,
        seed
    };
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
 */ function push(seed, values, x, odds) {
    seed = predictiveRandom(seed);
    values.push(x);
    if (seed / RANGE < odds) {
        seed = push(seed, values, x, odds);
    }
    return seed;
}
/**
 * Generates and returns a polynomial with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed valuethat can be used as the input to the next 
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
 * flatRoots(3,0,10); //=> { p: [1, -17.445259802043438, 96.94898590669898, -172.1346546982741], seed: 3658815999 }
 * ```
 * 
 * @doc
 */ function flatRoots(d, a = 0, b = 1, seed = SEED, odds = 0) {
    const randArr = randomArray(d, a, b, seed, odds);
    seed = randArr.seed;
    const p = fromRoots(randArr.vs);
    return {
        p,
        seed
    };
}
/**
 * Generates and returns a polynomial with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed valuethat can be used as the input to the next 
 * call to a predictive random function
 * 
 * * the exact same polynomial will be created on each call to this function 
 * if the same seed is used; this is by design to improve testing.
 * 
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 *
 * @example
 * ```typescript
 * flatCoefficients(3,-5,5);//=> { p: [0.43729151133447886, -1.09116829931736, 3.099136590026319], seed: 3658815999 }
 * ```
 * 
 * @doc
 */ function flatCoefficients(d, a = 0, b = 1, seed = SEED) {
    const randArr = randomArray(d, a, b, seed);
    seed = randArr.seed;
    const p = randArr.vs;
    return {
        p,
        seed
    };
}


;// ./src/predictive-random/bigint/b-random.ts


/**
 * Some seed value for the simple random number generator.
 * 
 * @internal
 */ const b_random_SEED = 123456789;
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
 */ function bFlatRoots(d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
    const res = flatRoots(d, a, b, seed, odds);
    return {
        p: scaleFloatsToBigints(res.p),
        seed: res.seed
    };
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
 */ function bFlatRootsArr(n, d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
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
 *
 * @doc
 */ function bFlatCoefficients(d, a = 0, b = 1, seed = b_random_SEED) {
    const res = flatCoefficients(d, a, b, seed);
    return {
        p: scaleFloatsToBigints(res.p),
        seed: res.seed
    };
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
 * @param odds ignored (there are no roots to duplicate) - only present for
 * signature compatibility with [[bFlatRootsArr]]
 *
 * @doc
 */ function bFlatCoefficientsArr(n, d, a = 0, b = 1, seed = b_random_SEED, odds = 0) {
    return flatCoefficientsArr(n, d, a, b, seed, odds).map(scaleFloatsToBigints);
}


;// ./src/roots/root-interval.ts
/**
 * Represents a root(s) bracketing interval
 * 
 * * **precondition:** `tE - tS` when calculated in double precision must be 
 * exact - this is actually almost guaranteed due to a theorem stating that if
 * `|a - b| <= |a|` and `|a - b| <= |b|` then `a - b` is exact
 * 
 * @doc
 */ /**
 * Simple function that creates and returns an exact root (with a bracketing 
 * interval width of 0 and multiplicity 1).
 * 
 * * returns `{ t, tS: t, tE: t, multiplicity: 1 }`
 * 
 * @param t 
 * 
 * @doc
 */ function createRootExact(t) {
    return {
        t,
        tS: t,
        tE: t,
        multiplicity: 1
    };
}
/**
 * Simple function that returns the middle of the root bracketing interval - can 
 * be used to estimate the root
 * 
 * @param ri a root interval
 * 
 * @doc
 */ function mid(ri) {
    return (ri.tS + ri.tE) / 2;
}


;// ./src/roots/certified/root-interval-to-exp.ts
/**
 * Returns the result of converting a double precision root interval to one
 * with endpoints given as Shewchuk floating point expansions
 * (a `RootIntervalExp`)
 *
 * @param ri a root interval
 * 
 * @doc
 */ function rootIntervalToExp(ri) {
    return {
        tS: [
            0,
            ri.tS
        ],
        tE: [
            0,
            ri.tE
        ],
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
 */ function transposePoly(p) {
    // transpose the polynomial coefficients into multiple polynomials
    const len = p[0].length;
    const p_ = [];
    for(let i = 0; i < len; i++){
        const _p = [];
        for(let j = 0; j < p.length; j++){
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
 * @param getPolyExact a function returning the exact polynomial (with
 * coefficients given as Shewchuk floating point expansions) - only called if
 * the evaluation could not be certified in double precision
 * 
 * @internal
 */ function evalAdaptive(p, pE, x, getPolyExact) {
    const r = evalCertified(p, x, pE, 4);
    if (r !== 0) {
        return r;
    }
    // condition number is too high - request higher precision
    return eEstimate(eHorner(getPolyExact(), x));
}


;// ./src/roots/refine-certified.ts




const { abs: refine_certified_abs, min: refine_certified_min, max: refine_certified_max, log2, ceil } = Math;
/**
 * Returns a refined root given a root bracketed in the interval `(a,b)` of the 
 * given polynomial using Brent's Method - modified slightly to allow for 
 * error certified bounds.
 * 
 * * also returns (as the 3rd element of the returned array) the current Brent
 * iterate `b` as the best point estimate within the interval
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
 * @param p_ an error polynomial that provides a coefficientwise error bound on 
 * the input polynomial; all coefficients must be positive. If `exact` is `true` 
 * then this is allowed to be `undefined`.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa the result of evaluating the input polynomial at `a`
 * @param fb the result of evaluating the input polynomial at `b`
 * @param getPolyExact a function that returns the exact polynomial coefficients
 * @param exact defaults to `false`; set to true if you need to do exact evaluations from the start
 * 
 * @internal
 */ function refineCertified(p, p_, lb, ub, fa, fb, getPolyExact, exact) {
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while(true){
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
        // adaptive tolerance - relative to the current best iterate `b` (as in
        // Brent's original); using `max(|a|,|b|)` would make the tolerance too
        // loose when the previous iterate `a` is still far from the root (e.g. 
        // after a first secant step from a wide bracket) and the returned
        // interval could then be wider than the documented maximum width
        let δ;
        const mm = refine_certified_abs(b);
        if (mm <= 1) {
            δ = eps;
        } else {
            // keep δ = eps * a power of 2
            δ = eps * 2 ** ceil(log2(mm));
        }
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        // modified from the original since we dont need the fb === 0 check here
        if (refine_certified_abs(m) <= δ) {
            return b < c ? [
                b,
                c,
                b
            ] : [
                c,
                b,
                b
            ];
        }
        if (refine_certified_abs(e) < δ || refine_certified_abs(fa) <= refine_certified_abs(fb)) {
            e = m;
            d = e;
        } else {
            let s = fb / fa;
            let v;
            let q;
            if (a === c) {
                v = 2 * m * s;
                q = 1 - s;
            } else {
                q = fa / fc;
                const r = fb / fc;
                v = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < v) {
                q = -q;
            } else {
                v = -v;
            }
            s = e;
            e = d;
            if (2 * v < 3 * m * q - refine_certified_abs(δ * q) && v < refine_certified_abs(0.5 * s * q)) {
                d = v / q;
            } else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < refine_certified_abs(d)) {
            b = b + d;
        } else if (0 < m) {
            b = b + δ;
        } else {
            b = b - δ;
        }
        fb = exact ? eEstimate(eHorner(getPolyExact(), b)) : evalCertified(p, b, p_);
        if (fb === 0) {
            // Since `evalCertified` returns zero if undecided the zero result
            // cannot be fully trusted at this point.
            // if we are already doing exact evaluations this is an exact root
            if (exact) {
                return [
                    b,
                    b,
                    b
                ];
            }
            // We need to calculate δ/2 to the left and right of b to get 
            // results that should usually be !== 0. 
            // It is a pre-filter. If the result === 0 we need to sharpen the
            // ability of the evaluation by somehow reducing the error bound
            const sL = refine_certified_max(lb, b - δ); // don't overstep bounds
            const sR = refine_certified_min(ub, b + δ); // ...
            // Note: sR - sL <= 2*δ provided lb, ub are in [-1..1] - usually 
            // (when sL === s - δ and sR === s + δ) sR - sL === 2*δ. Also δ > 0
            // keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
            // here by a precondition
            const fsL = evalCertified(p, sL, p_);
            const fsR = evalCertified(p, sR, p_);
            // if the evaluation method is strong enough *and* the signs
            // differ (so that `[sL,sR]` is certified to bracket a root)
            // return the result
            if (fsL * fsR < 0) {
                return [
                    sL,
                    sR,
                    b
                ];
            }
            // At this point either fsL or fsR === 0 (or they have the same
            // sign and the root is not bracketed by `[sL,sR]`) so we need to
            // sharpen the evaluation method
            exact = true;
            // get and cache the exact polynomial (we cache this since getting
            // an exact polynomial takes about 15 times more time than getting
            // a double-double polynomial and we very rarely expect to get to 
            // this point)
            fb = eEstimate(eHorner(getPolyExact(), b));
            // if the exact evaluation returns 0 we have an exact root
            if (fb === 0) {
                return [
                    b,
                    b,
                    b
                ];
            }
        // else we've got a new value for fb and from here on we use exact
        // evaluations
        }
        if (0 < fb && 0 < fc || fb <= 0 && fc <= 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


;// ./src/roots/root-bounds/positive-to-negative-bound-with-err.ts

/**
 * Returns a function that returns a negative root bound given a function that 
 * returns a positive root bound.
 * 
 * @param positiveBoundFunction 
 * 
 * @internal
 */ function positiveToNegativeBound_WithError(positiveBoundFunction) {
    return (p, p_)=>{
        return -positiveBoundFunction(reflectAboutYAxis(p), p_);
    };
}


;// ./src/roots/root-bounds/lmq/positive-root-upper-bound-lmq.ts


/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 * 
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * * leading zero coefficients are ignored
 *
 * * returns `0` if the polynomial has no positive roots (roots at `0` are not
 *   considered positive), e.g. for a constant polynomial
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
 */ function positiveRootUpperBound_LMQ(p) {
    p = removeLeadingZeros(p);
    const deg = p.length - 1;
    if (deg < 1) {
        return 0;
    }
    if (p[0] < 0) {
        p = negate(p);
    }
    const timesUsed = [];
    for(let i = 0; i < deg; i++){
        timesUsed.push(1);
    }
    let ub = 0;
    for(let m = 0; m <= deg; m++){
        if (p[m] >= 0) {
            continue;
        }
        let tempub = Infinity;
        let any = false;
        for(let k = 0; k < m; k++){
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
        if (any && ub < tempub) ub = tempub;
    }
    return ub;
}


;// ./src/roots/root-bounds/lmq/to-poly-for-positive-root-upper-bound-lmq.ts
const { abs: to_poly_for_positive_root_upper_bound_lmq_abs } = Math;
/**
 * Returns a new polynomial, `q`, with coefficients `p[i] - |p_[i]|`, i.e. the
 * smallest possible value of each coefficient given the coefficient-wise
 * absolute error bounds, for use with `positiveRootUpperBound_LMQ`.
 *
 * * for `x > 0` every polynomial `p̃` in the family `|p̃[i] - p[i]| <= |p_[i]|`
 *   satisfies `p̃(x) >= q(x)`; thus if `q(x) > 0` for all `x > U` then so is
 *   `p̃(x)`, i.e. `U` is an upper bound on the positive roots of every `p̃`
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds; must have same length as `p`
 *
 * @doc
 */ function toPolyForPositiveRootUpperBound_LMQ(p, p_) {
    if (p.length !== p_.length) {
        throw new Error('`p` and `p_` must be of equal length.');
    }
    const q = new Array(p.length);
    for(let i = 0; i < p.length; i++){
        q[i] = p[i] - to_poly_for_positive_root_upper_bound_lmq_abs(p_[i]);
    }
    return q;
}


;// ./src/roots/root-bounds/lmq/positive-root-upper-bound-lmq-with-err.ts



const { abs: positive_root_upper_bound_lmq_with_err_abs } = Math;
/**
 * Returns an upper bound for the positive real roots of *every* polynomial in
 * the family described by the given polynomial and its coefficient-wise
 * absolute error bounds using the LMQ bound.
 *
 * * for `x > 0` every polynomial `p̃` in the family satisfies `p̃(x) >= q(x)`
 *   where `q` has coefficients `p[i] - |p_[i]|` (see
 *   [[toPolyForPositiveRootUpperBound_LMQ]]); thus an upper bound on the
 *   positive roots of `q` (above which `q > 0`) is also an upper bound on the
 *   positive roots of every polynomial in the family
 *
 * * the sign of the leading coefficient must be certain: if it is certainly
 *   negative the family is negated first and if its sign is uncertain no finite
 *   bound exists and `Infinity` is returned
 *
 * * leading coefficients that are exactly zero *with* zero error are ignored
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds
 *
 * @doc
 */ function positiveRootUpperBound_LMQ_WithError(p, p_) {
    if (p.length !== p_.length) {
        throw new Error('`p` and `p_` must be of equal length.');
    }
    // ignore exact leading zeros
    let i = 0;
    while(i < p.length && p[i] === 0 && p_[i] === 0){
        i++;
    }
    if (i > 0) {
        p = p.slice(i);
        p_ = p_.slice(i);
    }
    if (p.length <= 1) {
        return 0; // a constant (or the zero polynomial)
    }
    const e0 = positive_root_upper_bound_lmq_with_err_abs(p_[0]);
    if (p[0] - e0 > 0) {
    // the leading coefficient is certainly positive
    } else if (p[0] + e0 < 0) {
        // the leading coefficient is certainly negative - negate the entire
        // family (the absolute error bounds are unaffected)
        p = negate(p);
    } else {
        // the sign of the leading coefficient is uncertain
        return Infinity;
    }
    // `q` now has a positive leading coefficient
    return positiveRootUpperBound_LMQ(toPolyForPositiveRootUpperBound_LMQ(p, p_));
}


;// ./src/roots/root-bounds/lmq/negative-root-lower-bound-lmq-with-err.ts


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
 */ const negativeRootLowerBound_LMQ_WithError = positiveToNegativeBound_WithError(positiveRootUpperBound_LMQ_WithError);


;// ./src/roots/reduce-interval.ts




const { min: reduce_interval_min, max: reduce_interval_max, abs: reduce_interval_abs } = Math;
const MAX_DOUBLE = 1.7976931348623157e+308;
/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * * the absolute coefficient-wise error bound used for the root bounds is
 *   `pDd_[i]*errorMultiplier + |p[i]|*γ1`, i.e. the given error bound (of the
 *   double-double precision polynomial) *plus* the round-off incurred when
 *   the double-double precision coefficients were rounded to the double
 *   precision coefficients `p` (which is at most half an ulp, i.e. `u|p[i]|`
 *   with `u <= γ1`); without the latter the family of polynomials for which
 *   the root bounds are calculated would not provably contain the exact
 *   polynomial
 *
 * @param lb
 * @param ub
 * @param p the polynomial with coefficients given as double precision
 * floating point numbers rounded from the double-double precision coefficients
 * @param pDd_ the coefficient-wise error bound of the double-double precision
 * polynomial that still needs to be multiplied by `errorMultiplier` to get
 * the actual absolute error bound
 * @param errorMultiplier the multiplier of `pDd_` to get the actual absolute
 * error bound, e.g. `γγ3` or `1`
 *
 * @internal
 */ function reduceInterval(lb, ub, p, pDd_, errorMultiplier) {
    const p_ = pDd_.map((E, i)=>E * errorMultiplier + reduce_interval_abs(p[i]) * γ1);
    lb = reduce_interval_max(lb, negativeRootLowerBound_LMQ_WithError(p, p_));
    ub = reduce_interval_min(ub, positiveRootUpperBound_LMQ_WithError(p, p_));
    const d = p.length - 1;
    const F = 2 ** (-2 * d);
    if (!Number.isFinite(lb)) {
        lb = -F * MAX_DOUBLE;
    }
    if (!Number.isFinite(ub)) {
        ub = F * MAX_DOUBLE;
    }
    while(true){
        const lb_ = reduce_interval_abs(Horner(p, lb));
        const ub_ = reduce_interval_abs(Horner(p, ub));
        if (lb_ > F * MAX_DOUBLE) {
            lb /= 2;
            continue;
        }
        if (ub_ > F * MAX_DOUBLE) {
            ub /= 2;
            continue;
        }
        break;
    }
    return [
        lb,
        ub
    ];
}


;// ./src/roots/remove-leading-zero-coeffs.ts

const { abs: remove_leading_zero_coeffs_abs } = Math;
/**
 * Removes leading zero coefficients (that are not certifiably non-zero).
 *
 * * the given arrays are **not** modified - new arrays are returned if
 *   anything changed (if the leading coefficient is certifiably non-zero the
 *   given arrays are returned as is)
 *
 * * if the leading coefficient is not certifiably non-zero the exact
 *   polynomial is consulted; the returned `pDd` is then the exact polynomial
 *   rounded to double-double precision and `pDd_` the corresponding error bound
 *
 * * `p` and `getPExact()` *must* be of same length
 *
 * @internal
*/ function removeLeadingZeroCoeffs(pDd, pDd_, getPExact, errorMultiplier) {
    // if leading coefficient is guaranteed > zero
    if (pDd.length === 0 || remove_leading_zero_coeffs_abs(pDd[0][1]) > errorMultiplier * pDd_[0]) {
        return {
            pDd,
            pDd_,
            pExact: undefined
        };
    }
    let pExact = getPExact(); // lazy loaded
    // Create new `pDd` and `pDd_` from the exact polynomial's coefficients
    // (without modifying the given arrays)
    const n = pExact.length;
    let pDdNew = new Array(n);
    let pDd_New = new Array(n);
    for(let i = 0; i < n; i++){
        const cExact = pExact[i];
        const hi = cExact[cExact.length - 1] ?? 0;
        const lo = cExact[cExact.length - 2] ?? 0;
        pDdNew[i] = [
            lo,
            hi
        ];
        pDd_New[i] = remove_leading_zero_coeffs_abs(hi) * (γγ3 / errorMultiplier);
    }
    let i = 0;
    while(i < n && pDdNew[i][1] === 0){
        i++;
    }
    pDdNew = pDdNew.slice(i);
    pDd_New = pDd_New.slice(i);
    pExact = pExact.slice(i);
    return {
        pDd: pDdNew,
        pDd_: pDd_New,
        pExact
    };
}


;// ./src/roots/certified/all-roots-certified.ts











const { min: all_roots_certified_min, max: all_roots_certified_max, abs: all_roots_certified_abs } = Math;
const all_roots_certified_eps = Number.EPSILON;
const onePlusEps = 1 + all_roots_certified_eps;
function allRootsCertified(p, lb = 0, ub = 1, pE, getPExact, returnUndefinedForZeroPoly) {
    // if `getPExact` is not specified then assume the given double-double 
    // precision coefficient polynomial is exact
    if (!getPExact) {
        getPExact = ()=>p;
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
    } else if (p.length === 1) {
        // return `[]` for a degree 1 polynomial (a non-zero constant)
        return [];
    }
    const p_ = transposePoly(p);
    [lb, ub] = reduceInterval(lb, ub, p_[0], pE, 1);
    let bCount;
    let exact;
    const deg = p.length - 1;
    bCount = 0;
    exact = false;
    let LB; // evaluation at lb
    do {
        LB = exact ? eEstimate(eHorner(getPolyExact(), lb)) : evalCertified(p_, lb, pE);
        if (LB === 0) {
            bCount++;
            // the max bCount is empirically selected for max performance
            if (bCount >= 3 && !exact) {
                exact = true;
                continue;
            }
            lb -= 2 * Number.EPSILON * all_roots_certified_max(1, all_roots_certified_abs(lb));
        }
    }while (LB === 0)
    bCount = 0;
    exact = false;
    let UB; // evaluation at ub
    do {
        UB = exact ? eEstimate(eHorner(getPolyExact(), ub)) : evalCertified(p_, ub, pE);
        if (UB === 0) {
            bCount++;
            if (bCount >= 3 && !exact) {
                exact = true;
                continue;
            }
            ub += 2 * Number.EPSILON * all_roots_certified_max(1, all_roots_certified_abs(ub));
        }
    }while (UB === 0)
    // Get all derivatives with their coefficient-wise error bounds, i.e. 
    // ps === [p, dp, ddp, ..., constant]
    //        [0,  1,   2, ..., deg     ]
    const ps = [
        {
            p,
            pE
        }
    ];
    const ps_ = [
        p_
    ]; // the transposed versions
    for(let i = 1; i <= deg; i++){
        const dP = ddDifferentiateWithError(ps[i - 1]);
        ps.push(dP);
        ps_.push(transposePoly(dP.p)); // the transposed versions
    }
    let is = [];
    let curPE;
    let curP_;
    diffCount = deg - 1; // update diffcount
    for(; diffCount >= 0; diffCount--){
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
        psExact = [
            poly
        ];
        while(poly.length > 1){
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
     */ function getRootsWithin() {
        const roots = [];
        // If there are no micro-intervals then check the interval between lb and ub.
        const LB = evalAdaptive(curP_, curPE, lb, getPolyExact);
        if (!is.length) {
            // close even root not possible
            const UB = evalAdaptive(curP_, curPE, ub, getPolyExact);
            if (LB * UB >= 0) {
                return [];
            }
            const [tS, tE, t] = refineCertified(curP_, curPE, lb, ub, LB, UB, getPolyExact /*, δ*/ );
            return [
                {
                    t,
                    tS,
                    tE,
                    multiplicity: 1
                }
            ];
        }
        //---- First check from lb to the left side of the first micro-interval.
        let _a = is[0].tS;
        let _A = evalAdaptive(curP_, curPE, _a, getPolyExact);
        if (LB * _A > 0) {
        // no roots possible (curve is monotone increasing or decreasing)
        } else if (LB * _A < 0) {
            // recall LB must !== 0 as a precondition
            const [tS, tE, t] = refineCertified(curP_, curPE, lb, _a, LB, _A, getPolyExact /*, δ*/ );
            roots.push({
                t,
                tS,
                tE,
                multiplicity: 1
            });
        } //else {
        // _A === 0
        // no roots possible in [lb,_a]
        //}
        let a_ = lb;
        let A_ = LB;
        let _b = _a;
        let _B = _A;
        let a;
        for(let i = 0; i < is.length; i++){
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
                } else if (A_ * _B < 0) {
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
                    const [tS, tE, t] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/ );
                    roots.push({
                        t,
                        tS,
                        tE,
                        multiplicity: 1
                    });
                } else {
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
            } else if (_A * A_ < 0) {
                //---- CASE 2 _A⇑ | A_⇓   OR   _A⇓ | A_⇑
                //console.log('CASE 2');
                // - [_a,a_] → odd root(s)
                roots.push({
                    t: a.t,
                    tS: a.tS,
                    tE: a.tE,
                    multiplicity: 3
                });
                if (A_ * _B < 0) {
                    //---- CASE 2A: _A⇑ | A_⇓ | _B⇑   OR   _A⇓ | A_⇑ | _B⇓
                    //console.log('CASE 2A');
                    // [a_,_b] → single root
                    const [tS, tE, t] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/ );
                    roots.push({
                        t,
                        tS,
                        tE,
                        multiplicity: 1
                    });
                } else if (A_ * _B > 0) {
                //---- CASE 2B: _A⇑ | A_⇓ | _B⇓   OR   _A⇓ | A_⇑ | _B⇑
                //console.log('CASE 2B');
                // [a_,_b] → no roots
                } else {
                //console.log('CASE 2C');
                // [a_,_b] → no roots
                }
            } else if (A_ === 0) {
                //---- CASE 3A A_0
                //console.log('CASE 3A');
                // [_a,a_] → rational root at a_
                // There cannot be a root between a_ and _b since _B !== 0
                if (/*_a === a_ ||*/ _A === 0) {
                    // multiple rational root at a_ OR both _A and A_ is 0
                    // so update multiplicity parity
                    roots.push({
                        t: a.t,
                        tS: a.tS,
                        tE: a.tE,
                        multiplicity: a.multiplicity + 1
                    });
                } else {
                    // now _A and _B are both !== 0
                    if (_A * _B > 0) {
                        roots.push({
                            t: a.t,
                            tS: a.tS,
                            tE: a.tE,
                            multiplicity: 2
                        });
                    } else {
                        roots.push({
                            t: a.t,
                            tS: a.tS,
                            tE: a.tE,
                            multiplicity: 3
                        });
                    }
                }
            } else {
                //---- CASE 3B _A0
                //console.log('CASE 3B');
                // A_ !== 0 here and _a !== a_
                // [_a,a_] → rational root at _a
                if (A_ * _B < 0) {
                    // [a_,_b] → single root
                    const [tS, tE, t] = refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/ );
                    roots.push({
                        t,
                        tS,
                        tE,
                        multiplicity: 1
                    });
                } else if (A_ * _B > 0) {
                // [a_,_b] → no roots
                }
                // - [_a,a_] → 
                // B_ and A_ are both !== 0
                if (B_ * A_ > 0) {
                    roots.push({
                        t: a.t,
                        tS: a.tS,
                        tE: a.tE,
                        multiplicity: 2
                    });
                } else {
                    roots.push({
                        t: a.t,
                        tS: a.tS,
                        tE: a.tE,
                        multiplicity: 3
                    });
                }
            }
        }
        // Combine the root intervals if they are adjacent (they are not 
        // allowed to overlap)
        for(let i = 0; i < roots.length - 1; i++){
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
         */ function checkEvenAA() {
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
            for(let ddDiffCount = diffCount + 2; ddDiffCount <= deg; ddDiffCount++){
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
                roots.push({
                    t: a.t,
                    tS: a.tS,
                    tE: a.tE,
                    multiplicity: 2
                });
            }
        }
    }
}
function joinRoots(rs) {
    const newRs = [];
    if (rs.length === 0) {
        return newRs;
    }
    // make a clone of the first interval
    let curR = {
        ...rs[0]
    };
    for(let i = 1; i < rs.length; i++){
        const r = rs[i];
        if (curR.tE < r.tS) {
            // they don't stick together
            newRs.push(curR);
            // make a clone of the next interval
            curR = {
                ...r
            };
        } else {
            // they stick together - expand (accumulating the multiplicities)
            curR.tE = all_roots_certified_max(curR.tE, r.tE);
            curR.multiplicity += r.multiplicity;
            curR.t = (curR.tS + curR.tE) / 2;
        }
    }
    newRs.push(curR);
    return newRs;
}


;// ./src/roots/certified/all-roots-certified-simplified.ts

function allRootsCertifiedSimplified(p, lb = -Infinity, ub = Infinity, returnUndefinedForZeroPoly) {
    return allRootsCertified(p.map((c)=>[
            0,
            c
        ]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}


;// ./node_modules/big-float-ts/node/double-expansion/e-to-double-double.js

/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 *
 * * uses truncation to convert thus accurate to within 1 ulp on low double;
 * (a slower summing method could reduce the max error to 1/2 ulp)
 */
function eToDd(e) {
    e = eCompress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len <= 1) {
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
 */ function ddTaylorShiftWithInpErr(p, h, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return [
            [],
            []
        ];
    }
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = dd_taylor_shift_with_inp_err_abs(h);
    const q = p.slice();
    const q_ = p_.slice();
    for(let k = 0; k <= n; k++){
        for(let i = 1; i <= n - k; i++){
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];
            const hq = ddMultDouble2(h, qi1);
            const hq_ = _h * qi1_ + dd_taylor_shift_with_inp_err_abs(hq[1]);
            const qi = q[i];
            q[i] = ddAddDd(qi, hq);
            q_[i] = q_[i] + hq_ + dd_taylor_shift_with_inp_err_abs(q[i][1]);
        }
    }
    return [
        q,
        q_
    ];
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
 */ function mobiusAndNumSignChanges(p, p_, pDd, pDd_, getPExact) {
    return function mobiusAndNumSignChanges_(a, b, A, B, failCount) {
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
        for(let i = 1; i < q.length - 1; i++){
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
        // (every uncertifiable coefficient is counted as a sign change so
        // `numSignChangesMax === 1` implies `numUncertifyable <= 1`)
        if (numSignChangesMax === 1) {
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
    // (the first coefficient, `q[0]`, equals `p(a)`, i.e. `A`, whose sign is
    // already certified - as for the double precision variant)
    for(let i = 1; i < q.length - 1; i++){
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
    // (every uncertifiable coefficient is counted as a sign change so
    // `numSignChanges === 1` implies `numUncertifyable <= 1`)
    if (numSignChanges === 1) {
        return 1; // **guaranteed** to have exactly one root in the interval
    }
    if (numUncertifyable === 0) {
        return numSignChanges;
    }
    return failCount > 1 ? eMobiusAndNumSignChanges(getPExact, a, b, A, B) : -numSignChanges; // `failCount` is still 1, so we can try again after another split of the interval;
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
    for(let i = 1; i < q.length - 1; i++){
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
 */ function HornerWithInpError(p, x, p_) {
    const _x = horner_with_inp_error_abs(x);
    let r̂ = p[0];
    let r̂_ = p_[0];
    for(let i = 1; i < p.length; i++){
        const r̂x = r̂ * x;
        r̂ = r̂x + p[i];
        r̂_ = r̂_ * _x + horner_with_inp_error_abs(r̂x) + p_[i] + horner_with_inp_error_abs(r̂);
    }
    return [
        r̂,
        r̂_
    ];
}


;// ./src/roots/descartes/isolate-roots.ts









const { abs: isolate_roots_abs, max: isolate_roots_max, log2: isolate_roots_log2, ceil: isolate_roots_ceil } = Math;
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
 */ function isolateRoots(p, pDd, pDd_, lb, ub, getPExact) {
    /**
     * The error bound (that still needs to be multiplied by `γ(1)` of the double
     * precision coefficients.
     */ // `E*γγ3_γ1` -> the new error need to be scaled by `γ1` and not `γγ3`
    // `abs(p[idx])` -> round-off from double-double to double precision
    const p_ = pDd_.map((E, idx)=>E * γγ3_γ1 + isolate_roots_abs(p[idx]));
    //--------------------------------------------------------------------------
    // Make sure endpoints don't fall too close to roots as this drastically
    // slows down the root isolation process.
    //--------------------------------------------------------------------------
    const _lb_ = lb;
    const _ub_ = ub;
    let W = ub - lb;
    let A;
    let ea;
    while(true){
        [A, ea] = HornerWithInpError(p, lb, p_);
        if (isolate_roots_abs(A) > ea * γ1) {
            break;
        }
        lb -= W / 2;
        W *= 2;
        if (!Number.isFinite(lb)) {
            // can only happen if the sign of the leading coefficient cannot
            // be certified in double precision (fail explicitly rather than
            // looping forever)
            throw new Error('Unable to certify the sign of the polynomial at any finite lower bound.');
        }
    }
    let B;
    let eb;
    while(true){
        [B, eb] = HornerWithInpError(p, ub, p_);
        if (isolate_roots_abs(B) > eb * γ1) {
            break;
        }
        ub += W / 2;
        W *= 2;
        if (!Number.isFinite(ub)) {
            throw new Error('Unable to certify the sign of the polynomial at any finite upper bound.');
        }
    }
    //------------------------------------------------
    // Initial root interval with sign-certified endpoint values and a fail count.
    const Is = [
        [
            lb,
            ub,
            A,
            B,
            0
        ]
    ];
    const Is_ = []; // Isolated root intervals will be stored here
    // let treeSize = 0;  // remove eventually
    const mobiusAndNumSignChanges_ = mobiusAndNumSignChanges(p, p_, pDd, pDd_, getPExact);
    let errBound;
    let pDdTransposed;
    while(Is.length > 0){
        // treeSize++;
        const I = Is.pop();
        const [a, b, A, B, failCount] = I;
        //----------------------------------------------------------------------
        // Descarte's rule of signs to count the number of roots in this interval
        //----------------------------------------------------------------------
        const varP = mobiusAndNumSignChanges_(a, b, A, B, failCount);
        // If `varP < 0` we couldn't distinguish Mobius coefficients from `0`
        // without going to infinite precision.
        if (varP === 0) {
            continue;
        }
        if (varP === 1) {
            errBound = errBound || pDd_.map((E)=>E * γγ3);
            pDdTransposed = pDdTransposed || transposePoly(pDd);
            const [tS, tE, t] = refineCertified(pDdTransposed, errBound, a, b, A, B, getPExact, false);
            Is_.push({
                t,
                tS,
                tE,
                multiplicity: 1
            });
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
                Is_.push({
                    t: (a + b) / 2,
                    tS: a,
                    tE: b,
                    multiplicity: isolate_roots_abs(varP)
                });
                continue; // stop recursion when intervals are too small
            }
            realFailCount = Infinity; // split one last time
        }
        const [t, T] = admissablePoint(p, p_, pDd, pDd_, a, b, getPExact);
        // The sign of `T` is certified.
        Is.push([
            a,
            t,
            A,
            T,
            realFailCount
        ]);
        Is.push([
            t,
            b,
            T,
            B,
            realFailCount
        ]);
    }
    // treeSize; //?
    Is_.reverse();
    return Is_.filter((I)=>{
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
    while(true){
        d *= 2;
        for(let j = 1; j < d; j += 2){
            c++;
            const t = a + (b - a) * (d + 2 * j) / (4 * d); // sample in the middle half [a+W/4, a+3W/4]
            const [T, e] = HornerWithInpError(p, t, p_);
            if (isolate_roots_abs(T) > e * γ1) {
                // If we can certify the sign of `p(t)` then don't waste time
                // looking for the best point.
                return [
                    t,
                    T
                ];
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
    while(true){
        d *= 2;
        for(let j = 1; j < d; j += 2){
            c++;
            const t = a + (b - a) * (d + 2 * j) / (4 * d);
            const [T, e] = ddHornerWithInpError(pDd, t, pDd_);
            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if (isolate_roots_abs(T[1]) > e * γγ3) {
                return [
                    t,
                    T[1]
                ];
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
    const n = pE.length - 1;
    let d = 1; // number of subintervals to split the interval into
    let c = 0; // count of points tested so far
    while(true){
        d *= 2;
        for(let j = 1; j < d; j += 2){
            c++;
            const t = a + (b - a) * (d + 2 * j) / (4 * d);
            const T = eCompress(eHorner(pE, t)); // no error
            const $T = T[T.length - 1];
            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if ($T !== 0) {
                return [
                    t,
                    $T
                ];
            }
            if (c > n) {
                // It should not be possible to get to this point since we
                // tested more points than the degree of the polynomial so
                // at least one of the roots should have been resolved from zero.
                // However, if underflow occurs in an expansion product we might
                // reach this point.
                throw new Error('Cannot resolve root even in Shewchuk expansion precision');
            }
        }
    }
}


;// ./src/roots/descartes/roots.ts




const { abs: roots_abs, max: roots_max, log2: roots_log2, ceil: roots_ceil } = Math;
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
 * @param tryReduceInterval defaults to `false`; if `true` (or if `|lb|` or
 * `|ub|` is larger than `2^20`, e.g. when they are infinite) then the interval
 * `[lb,ub]` will be reduced to a smaller interval containing all roots (if
 * possible) before starting the algorithm.
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
 */ function roots(pDd, lb = -Infinity, ub = +Infinity, pDd_, getPExact, tryReduceInterval = false) {
    if (typeof pDd[0] === 'number') {
        pDd = pDd.map((c)=>[
                0,
                c
            ]);
    }
    // We cache `pExact`
    let pExact = undefined;
    const getPExact_ = ()=>{
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
    } else if (pDd.length === 1) {
        return []; // return `[]` for a (a non-zero) degree 0 polynomial
    }
    // Approximate `p` from `pDd`
    const p = pDd.map((c)=>c[0] + c[1]);
    if (tryReduceInterval || roots_abs(lb) > 2 ** 20 || roots_abs(ub) > 2 ** 20) {
        [lb, ub] = reduceInterval(lb, ub, p, pDd_, γγ3);
    }
    if (lb === ub) {
        const halfWidth = 2 * eps * roots_max(1, 2 ** roots_ceil(roots_log2(roots_max(roots_abs(lb), roots_abs(ub)))));
        lb -= halfWidth;
        ub += halfWidth;
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




const { abs: refine_k1_abs, log2: refine_k1_log2, ceil: refine_k1_ceil } = Math;
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
 */ function refineK1(ri, p) {
    const { tS, tE } = ri;
    const W = tE - tS;
    if (W === 0) {
        return [
            {
                tS: [
                    0,
                    tS
                ],
                tE: [
                    0,
                    tS
                ],
                multiplicity: ri.multiplicity
            }
        ];
    }
    const δ = 2 ** refine_k1_ceil(refine_k1_log2(W)); // Ensure scale is a power of 2
    // Translate the polynomial such that the root is within δ from 0, then
    // scale it such that the roots stay <= 1, i.e. is in [0,1]
    const pExactK1 = eChangeVariablesLinear(p, δ, tS);
    // reduce the polynomial to double-double precision for faster root finding
    const pDdK1 = pExactK1.map(eToDd);
    // Update the double-double precision error bound - it is simply the error
    // in rounding the exact coefficients to double-double precision. `eToDd`
    // keeps only the two most significant components of the (compressed,
    // non-overlapping) expansion so the dropped part is `< 4u²|hi|` where
    // `hi` is the high double. `roots` scales the given (positive!) error
    // bound by `γγ3 ≈ 3u²` so the conservative unscaled bound `2|hi|` is used.
    const errBoundK1 = pDdK1.map((c)=>2 * refine_k1_abs(c[1]));
    const getPExactK1 = ()=>pExactK1;
    // const risLo = allRootsCertified(pDdK1, 0, 1, errBoundK1, getPExactK1)!;
    const risLo = roots(pDdK1, 0, 1, errBoundK1, getPExactK1);
    const ris = [];
    for (const riLo of risLo){
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
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
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
 */ function bDeflate(p, root) {
    if (p.length <= 1) {
        return [];
    }
    const d = p.length - 1;
    const bs = [
        p[0]
    ];
    for(let i = 1; i < d; i++){
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
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial (given as a double).
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], 2); //=> [[0,1], [0,-3], [0,2]]
 * ddDeflate([[0,1], [0,-3], [0,2]], 2);         //=> [[0,1], [0,-1]]
 * ddDeflate([[0,1], [0,-1]], 1);                //=> [[0,1]]
 * ```
 *
 * @doc
 */ function ddDeflate(p, root) {
    if (p.length <= 1) {
        return [];
    }
    const d = p.length - 1;
    const bs = [
        p[0]
    ];
    for(let i = 1; i < d; i++){
        bs.push(// p[i] + root*bs[i-1]
        ddAddDd(p[i], ddMultDouble2(root, bs[i - 1])));
    }
    return bs;
}


;// ./src/roots/deflate/dd-deflate-with-running-error.ts


const dd_deflate_with_running_error_qmd = ddMultDouble2;
const dd_deflate_with_running_error_qaq = ddAddDd;
const { abs: dd_deflate_with_running_error_abs } = Math;
/**
 * Returns a deflated version of the given polynomial *approximately* by 
 * removing a factor (x - t). Also returns an coefficient-wise absolute error
 * bound.
 * 
 * @param pDd a polynomial with coefficients given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ the coefficient-wise absolute error bound of the input
 * polynomial that still needs to be multiplied by `γγ3`, i.e. the actual
 * absolute error bound of the coefficient of `xⁱ` is `pDd_[i]*γγ3`.
 * @param t an evaluation point of the polynomial.
 * 
 * @doc
 */ function ddDeflateWithRunningError(pDd, pDd_, t) {
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
    const d = pDd.length - 1;
    const bs = [
        pDd[0]
    ]; // coefficients
    let b_ = pDd_[0]; // running error
    const bEs = [
        b_
    ]; // coefficient-wise error bound
    for(let i = 1; i < d; i++){
        // p[i] + t*bs[i-1];
        const a = bs[i - 1];
        const $m = t * a[1];
        const _t = dd_deflate_with_running_error_abs(t);
        const m_ = _t * b_ + dd_deflate_with_running_error_abs($m);
        const pi = pDd[i];
        const p_ = pDd_[i];
        b_ = p_ + m_ + dd_deflate_with_running_error_abs(pi[1] + $m);
        const b = dd_deflate_with_running_error_qaq(pi, dd_deflate_with_running_error_qmd(t, a));
        bs.push(b);
        bEs.push(b_);
    }
    return {
        coeffs: bs,
        // errBound: bEs.map(e => γγ3*e)
        errBound: bEs
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
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
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
 */ function deflate(p, root) {
    if (p.length <= 1) {
        return [];
    }
    const d = p.length - 1;
    const bs = [
        p[0]
    ];
    for(let i = 1; i < d; i++){
        bs.push(p[i] + root * bs[i - 1]);
    }
    return bs;
}


;// ./src/roots/deflate/e-deflate.ts


/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * eDeflate([[1], [-5], [8], [-4]], 2); //=> [[1], [-3], [2]]
 * ```
 *
 * @doc
 */ function eDeflate(p, t) {
    if (p.length <= 1) {
        return [];
    }
    const d = p.length - 1;
    const bs = [
        p[0]
    ];
    for(let i = 1; i < d; i++){
        bs.push(// p[i] + root*bs[i-1]
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
 */ function bFromRoots(roots) {
    let p = [
        1n
    ];
    for(let i = 0; i < roots.length; i++){
        p = bMultiply(p, [
            1n,
            -roots[i]
        ]);
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
 */ function eFromRoots(roots) {
    let pE = [
        [
            1
        ]
    ];
    for(let i = 0; i < roots.length; i++){
        pE = eMultiply(pE, [
            [
                1
            ],
            eNegativeOf(roots[i])
        ]);
    }
    pE = pE.map(eCompress);
    const pDd = pE.map(eToDd);
    const pDd_ = pE.map((c)=>e_from_roots_abs(c[c.length - 1]) / 3 // `/ 3` since the error is ~ `γγ1` and not `γγ3`
    );
    const p = pE.map((c)=>eEstimate(c));
    const p_ = pE.map((_, idx)=>e_from_roots_abs(p[idx]));
    return {
        pE,
        pDd,
        pDd_,
        p,
        p_
    };
}


;// ./src/roots/naive/brent-poly.ts

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
 * brentPoly(p,a,b); //=> 3.000000000000003
 * b = 3.1;
 * brentPoly(p,a,b); //=> 3.000000000000001
 * ```
 * 
 * @doc
 */ function brentPoly(p, lb, ub, fa = Horner(p, lb), fb = Horner(p, ub)) {
    // Precondition: fa, fb !== 0
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while(true){
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
        } else {
            let s = fb / fa;
            let p;
            let q;
            if (a === c) {
                p = 2 * m * s;
                q = 1 - s;
            } else {
                q = fa / fc;
                const r = fb / fc;
                p = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < p) {
                q = -q;
            } else {
                p = -p;
            }
            s = e;
            e = d;
            if (2 * p < 3 * m * q - brent_poly_abs(δ * q) && p < brent_poly_abs(0.5 * s * q)) {
                d = p / q;
            } else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < brent_poly_abs(d)) {
            b = b + d;
        } else if (0 < m) {
            b = b + δ;
        } else {
            //b = b - eps;
            b = b - δ;
        }
        fb = Horner(p, b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }
        if (fb === 0) {
            return b;
        }
        if (fb < 0 === fc < 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


;// ./src/roots/root-bounds/positive-to-negative-bound.ts

/**
 * Returns a function that returns a negative root bound given a function that 
 * returns a positive root bound.
 * 
 * @param positiveBoundFunction 
 * 
 * @internal
 */ function positiveToNegativeBound(positiveBoundFunction) {
    return (p)=>{
        return -positiveBoundFunction(reflectAboutYAxis(p));
    };
}


;// ./src/roots/root-bounds/lmq/negative-root-lower-bound-lmq.ts


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
 */ const negativeRootLowerBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);


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
 */ function allRoots(p, lb = -Infinity, ub = Infinity) {
    p = removeLeadingZeros(p);
    //---- count and remove roots at zero
    let numZerosAtZero = 0;
    while(p[p.length - 1] === 0){
        p = p.slice(0, -1);
        numZerosAtZero++;
    }
    //------------------------
    // return an empty array for a constant or the zero polynomial
    if (p.length <= 1) {
        const roots = [];
        for(let j = 0; j < numZerosAtZero; j++){
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
    const ps = [
        p
    ];
    for(let i = 1; i <= p.length - 1; i++){
        ps.push(differentiate(ps[i - 1]));
    }
    //const δ = Math.max(2*eps, 2*eps * Math.max(Math.abs(lb), Math.abs(ub)));
    /** root intervals */ let is = [];
    // loop: ps[diffCount] === [linear, quadratic, ..., deg]
    for(let diffCount = p.length - 2; diffCount >= 0; diffCount--){
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
        for(let i = 0; i < is.length; i++){
            const _b_ = is[i];
            const _B_ = Horner(p, _b_);
            // if there is a root at the right interval then add it
            if (_B_ === 0) {
                roots.push(_b_);
            } else if (_A_ !== 0 && _A_ < 0 !== _B_ < 0) {
                // (sign test without a product, which could underflow to zero;
                // `_B_ !== 0` here and a zero `_A_` was already pushed as a root)
                roots.push(brentPoly(p, _a_, _b_, _A_, _B_));
            }
            _a_ = _b_;
            _A_ = _B_;
        }
        const _B_ = Horner(p, ub);
        // (sign test without a product, which could underflow to zero)
        if (_A_ !== 0 && _B_ !== 0 && _A_ < 0 !== _B_ < 0) {
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
        for(let i = 0; i < is.length; i++){
            if (!zerosInserted && is[i] >= 0) {
                // push the zero roots
                for(let j = 0; j < numZerosAtZero; j++){
                    isWithZeroRoots.push(0);
                }
                zerosInserted = true;
            }
            isWithZeroRoots.push(is[i]);
        }
        if (!zerosInserted) {
            // push the zero roots
            for(let j = 0; j < numZerosAtZero; j++){
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
 */ function bisection(f, a, b) {
    if (b < a) {
        [a, b] = [
            b,
            a
        ]; // Swap a and b 
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
    if (fa < 0 === fb < 0) {
        // Root is not bracketed - this is a precondition.
        throw new Error('Root not bracketed');
    }
    while(true){
        const c = a + (b - a) / 2; // Take midpoint
        const fc = f(c);
        if (fc === 0) {
            return c;
        }
        if (fa < 0 !== fc < 0) {
            b = c;
        } else {
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
 */ function brent(f, lb, ub) {
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
    while(true){
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
        } else {
            let s = fb / fa;
            let p;
            let q;
            if (a === c) {
                p = 2 * m * s;
                q = 1 - s;
            } else {
                q = fa / fc;
                const r = fb / fc;
                p = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < p) {
                q = -q;
            } else {
                p = -p;
            }
            s = e;
            e = d;
            if (2 * p < 3 * m * q - brent_abs(δ * q) && p < brent_abs(0.5 * s * q)) {
                d = p / q;
            } else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < brent_abs(d)) {
            b = b + d;
        } else if (0 < m) {
            b = b + δ;
        } else {
            //b = b - eps;
            b = b - δ;
        }
        fb = f(b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }
        if (fb === 0) {
            return b;
        }
        if (fb < 0 === fc < 0) {
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
 */ function quadraticRoots(p) {
    const [a, b, c] = p;
    const _D = b * b - 4 * a * c;
    if (_D < 0) {
        // No real roots;
        return [];
    }
    if (_D === 0) {
        return [
            -b / (2 * a)
        ];
    }
    const D = quadratic_roots_sqrt(_D);
    if (b >= 0) {
        const root1 = (-b - D) / (2 * a);
        const root2 = 2 * c / (-b - D);
        return root1 < root2 ? [
            root1,
            root2
        ] : [
            root2,
            root1
        ];
    }
    const root1 = 2 * c / (-b + D);
    const root2 = (-b + D) / (2 * a);
    return root1 < root2 ? [
        root1,
        root2
    ] : [
        root2,
        root1
    ];
}


;// ./src/roots/root-bounds/upper-to-lower-bound.ts
/**
 * Returns a function that returns a positive lower root bound given a function 
 * that returns a positive upper root bound.
 * 
 * @param positiveUpperBoundFunction 
 * 
 * @internal
 */ function upperToLowerBound(positiveUpperBoundFunction) {
    return (p)=>{
        return 1 / positiveUpperBoundFunction(p.toReversed());
    };
}


;// ./src/roots/root-bounds/lmq/positive-root-lower-bound-lmq.ts


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
 */ const positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);


;// ./src/roots/root-bounds/lmq/negative-root-upper-bound-lmq.ts


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
 */ const negativeRootUpperBound_LMQ = upperToLowerBound(negativeRootLowerBound_LMQ);


;// ./src/roots/root-bounds/upper-to-lower-bound-with-err.ts
/**
 * Returns a function that returns a positive lower root bound given a function 
 * that returns a positive upper root bound.
 * 
 * @param positiveUpperBoundFunction 
 * 
 * @internal
 */ function upperToLowerBound_WithError(positiveUpperBoundFunction) {
    return (p, p_)=>{
        return 1 / positiveUpperBoundFunction(p.toReversed(), p_.toReversed());
    };
}


;// ./src/roots/root-bounds/lmq/positive-root-lower-bound-lmq-with-err.ts


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
 */ const positiveRootLowerBound_LMQ_WithError = upperToLowerBound_WithError(positiveRootUpperBound_LMQ_WithError);


;// ./src/roots/root-bounds/lmq/negative-root-upper-bound-lmq-with-err.ts


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
 */ const negativeRootUpperBound_LMQ_WithError = upperToLowerBound_WithError(negativeRootLowerBound_LMQ_WithError);


;// ./src/roots/root-bounds/fujiwara/root-magnitude-upper-bound-fujiwara.ts
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
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 4.7753019278348
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 * ```
 * 
 * @doc
 */ function rootMagnitudeUpperBound_fujiwara(p) {
    if (p.length <= 1) {
        return 0;
    }
    const d = p.length - 1;
    const an = p[0];
    const bs = [];
    for(let i = 1; i < d; i++){
        bs.push(root_magnitude_upper_bound_fujiwara_abs(p[i] / an) ** (1 / i));
    }
    bs.push(root_magnitude_upper_bound_fujiwara_abs(p[d] / (2 * an)) ** (1 / d));
    return 2 * root_magnitude_upper_bound_fujiwara_max(...bs);
}


;// ./src/roots/root-bounds/rouche/root-magnitude-upper-bound-rouche.ts

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
 */ function rootMagnitudeUpperBound_rouche(p) {
    if (p.length <= 1) {
        return 0;
    }
    return 1 + pInfNorm(p.slice(1)) / Math.abs(p[0]);
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
 */ function bSignChanges(p) {
    let r = 0;
    let _s = 0; // sign of the previous non-zero coefficient (`0` if none yet)
    for(let i = 0; i < p.length; i++){
        const s = p[i] === 0n ? 0 : p[i] < 0n ? -1 : +1;
        if (s === 0) {
            continue;
        } // zeros are ignored
        if (_s !== 0 && s !== _s) {
            r++;
        }
        _s = s;
    }
    return r;
}


;// ./src/roots/sturm/bigint/b-num-roots.ts




/**
 * Returns the *exact* number of *distinct* real roots in the interval `(-∞,+∞)`
 * of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */ function bNumRoots(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length === 0) {
        return Infinity; // the zero polynomial
    }
    if (p.length === 1) {
        return 0; // a non-zero constant
    }
    const ps = bSturmChain(p);
    const as = ps.map((p)=>bDegree(p) % 2 === 0 ? p[0] : -p[0]);
    const bs = ps.map((p)=>p[0]);
    return bSignChanges(as) - bSignChanges(bs);
}


;// ./src/roots/sturm/bigint/b-num-roots-0-1.ts





/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root in `[0,1]`, namely `1`.
 *
 * * roots at the endpoints `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bNumRootsIn01([1n, -4n, 5n, -2n]);  //=> 1  (the roots are 1 (double) and 2)
 * bNumRootsIn01([1n, 0n, 0n]);        //=> 1  (a double root at 0)
 * ```
 *
 * @doc
 */ function bNumRootsIn01(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length === 0) {
        return Infinity; // the zero polynomial
    }
    // Sturm's theorem requires that the endpoints are not multiple roots so
    // deflate all roots at the endpoints first and count them separately
    // (once each).
    // Check for a root at 0
    let hasRootAt0 = 0;
    while(p.length > 1 && p[p.length - 1] === 0n){
        p = p.slice(0, p.length - 1);
        hasRootAt0 = 1;
    }
    // Check for a root at 1
    let hasRootAt1 = 0;
    while(p.length > 1 && bEvaluateAt1(p) === 0n){
        p = bDeflate(p, 1n);
        hasRootAt1 = 1;
    }
    if (p.length === 1) {
        // a (possibly deflated) non-zero constant
        return hasRootAt0 + hasRootAt1;
    }
    const ps = bSturmChain(p);
    const as = ps.map((p)=>p[p.length - 1]); // evaluate at 0
    const bs = ps.map((p)=>bEvaluateAt1(p)); // evaluate at 1
    return bSignChanges(as) - bSignChanges(bs) + hasRootAt0 + hasRootAt1;
}


;// ./src/roots/sturm/bigint/b-num-roots-in-range.ts





/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * roots at the endpoints `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
 */ function bNumRootsInRange(p, a, b) {
    if (a > b) {
        return 0; // empty interval
    }
    p = bRemoveLeadingZeros(p);
    if (p.length === 0) {
        return Infinity; // the zero polynomial
    }
    // Sturm's theorem requires that the endpoints are not multiple roots so
    // deflate all roots at the endpoints first and count them separately
    // (once each).
    // Check for a root at `a`
    let hasRootAtA = 0;
    while(p.length > 1 && bHorner(p, a) === 0n){
        p = bDeflate(p, a);
        hasRootAtA = 1;
    }
    // Check for a root at `b`
    let hasRootAtB = 0;
    if (a !== b) {
        while(p.length > 1 && bHorner(p, b) === 0n){
            p = bDeflate(p, b);
            hasRootAtB = 1;
        }
    }
    if (p.length === 1) {
        // a (possibly deflated) non-zero constant
        return hasRootAtA + hasRootAtB;
    }
    const ps = bSturmChain(p);
    const as = ps.map((p)=>bHorner(p, a));
    const bs = ps.map((p)=>bHorner(p, b));
    return bSignChanges(as) - bSignChanges(bs) + hasRootAtA + hasRootAtB;
}


;// ./src/roots/sturm/double/num-roots.ts


/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval `(-∞,+∞)` of the given polynomial.
 * 
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
 */ function numRoots(p) {
    return bNumRoots(scaleFloatsToBigints(p));
}


;// ./src/roots/sturm/double/num-roots-in-0-1.ts


/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */ function numRootsIn01(p) {
    return bNumRootsIn01(scaleFloatsToBigints(p));
}


;// ./src/scale-to-int/common-scale-power.ts

/**
 * Returns the (smallest) power of two, `e`, such that `a*2**e` is an integer
 * for *every* given float `a` - this is the power used by
 * [[scaleFloatsToBigints]], [[scaleFloatsToInts]], etc.
 *
 * * returns `0` if all the given floats are zero
 *
 * @param as an array of double precision floating point numbers
 *
 * @internal
 */ function commonScalePower(as) {
    let e = -Infinity;
    for(let i = 0; i < as.length; i++){
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scalePower = -lsbExponent(a);
        if (scalePower > e) {
            e = scalePower;
        }
    }
    return e === -Infinity ? 0 : e;
}


;// ./src/roots/sturm/double/num-roots-in-range.ts




/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
 */ function numRootsInRange(p, a, b) {
    // The endpoints are scaled by the same power of two, `2**e`, such that
    // they become integers, i.e. `A === a*2**e` and `B === b*2**e` (exactly).
    const [A, B] = scaleFloatsToBigints([
        a,
        b
    ]);
    const e = commonScalePower([
        a,
        b
    ]);
    // The polynomial's roots must be scaled by the same power of two, i.e.
    // `p(x) -> p(x / 2**e)` (which is then made integral again).
    const d = p.length;
    let pB = scaleFloatsToBigints(p);
    if (e > 0) {
        const S = 2n ** BigInt(e);
        pB = pB.map((c)=>c * S ** BigInt(d));
        pB = bInvScale(pB, S); // exact division
    } else if (e < 0) {
        pB = bScale(pB, 2n ** BigInt(-e));
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
 */ const descartes = (/* unused pure expression or super */ null && (signChanges));
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
 */ function signChanges(p) {
    let r = 0;
    let _s = 0; // sign of the previous non-zero coefficient (`0` if none yet)
    for(let i = 0; i < p.length; i++){
        const s = sign_changes_sign(p[i]);
        if (s === 0) {
            continue;
        } // zeros are ignored
        if (_s !== 0 && s !== _s) {
            r++;
        }
        _s = s;
    }
    return r;
}


;// ./src/roots/sturm/expansion/e-num-roots.ts



/**
 * Returns the *exact* number of *distinct* real roots in the open interval (-∞,+∞) 
 * of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
 */ function eNumRoots(p) {
    return bNumRoots(scaleFloatssToBigintss(p).map(bSum));
}


;// ./src/roots/sturm/expansion/e-num-roots-0-1.ts



/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */ function eNumRootsIn01(p) {
    return bNumRootsIn01(scaleFloatssToBigintss(p).map(bSum));
}


;// ./src/roots/sturm/expansion/e-num-roots-in-range.ts






/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
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
 */ function eNumRootsInRange(p, a, b) {
    a = eCompress(a);
    b = eCompress(b);
    // The endpoints are scaled by the same power of two, `2**e`, such that
    // all their components become integers, i.e. `A === a*2**e` and
    // `B === b*2**e` (exactly).
    const [A, B] = scaleFloatssToBigintss([
        a,
        b
    ]).map(bSum);
    const e = commonScalePower([
        ...a,
        ...b
    ]);
    // The polynomial's roots must be scaled by the same power of two, i.e.
    // `p(x) -> p(x / 2**e)` (which is then made integral again).
    const d = p.length;
    let pB = scaleFloatssToBigintss(p).map(bSum);
    if (e > 0) {
        const S = 2n ** BigInt(e);
        pB = pB.map((c)=>c * S ** BigInt(d));
        pB = bInvScale(pB, S); // exact division
    } else if (e < 0) {
        pB = bScale(pB, 2n ** BigInt(-e));
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
 */ function eSignChanges(p) {
    let r = 0;
    let _s = 0; // sign of the previous non-zero coefficient (`0` if none yet)
    for(let i = 0; i < p.length; i++){
        const s = e_sign_changes_sign(eSign(p[i]));
        if (s === 0) {
            continue;
        } // zeros are ignored
        if (_s !== 0 && s !== _s) {
            r++;
        }
        _s = s;
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
    for (const c of q){
        if (c % multiplier !== 0n) {
            throw new Error('Pseudo quotient is not divisible by expected multiplier in bYunsAlgorithm.');
        }
    }
    return bRemoveLeadingZeros(bDivideByConst(q, multiplier));
}
function bGcdPrsSafe(a, b) {
    return a.length >= b.length ? bGcdPrs(a, b) : bGcdPrs(b, a);
}
/**
 * Returns the square-free factorization of the given polynomial.
 *
 * * see e.g. [Yun's algorithm](https://en.wikipedia.org/wiki/Square-free_polynomial)
 *
 * * **note:** the implementation uses the (simpler) repeated-gcd method
 *   (Musser's algorithm) which gives the same result as Yun's algorithm in
 *   characteristic 0
 * 
 * @param a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @returns square-free factors paired with their multiplicities
 */ function bYunsAlgorithm(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length <= 1) {
        return [];
    }
    // Yun's algorithm is defined on primitive polynomials over characteristic 0.
    p = bPrimitivePart(p);
    const pDiff = bDifferentiate(p); // (non-empty since `p.length >= 2`)
    const factors = [];
    let g = bPrimitivePart(bGcdPrsSafe(p, pDiff));
    let w = bExactDiv(p, g);
    let multiplicity = 1;
    while(w.length > 1){
        const y = g.length <= 1 ? [
            1n
        ] : bPrimitivePart(bGcdPrsSafe(g, w));
        const factor = bExactDiv(w, y);
        if (factor.length > 1) {
            factors.push({
                factor,
                multiplicity
            });
        }
        w = y;
        g = bExactDiv(g, y);
        multiplicity++;
    }
    return factors;
}


;// ./src/generate/generate-mignotte-poly.ts

/**
 * Returns a Generalized Mignotte polynomial of the form `x^d - 2*(v*x - 1)^k`
 * 
 * * if `k=2` then we get the classic Mignotte polynomial `x^d - 2*(v*x - 1)^2`
 * * if `k>2` then the clustered roots are not necessarily real
 * * root seperation of the Classical Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 * @param k defaults to `2`; the exponent (must be >= 2, if 2 then we get the classic Mignotte polynomial)
 *
 * @example
 * ```typescript
 * generateMignottePolynomial(3, 2);  //=> [1, -8, 8, -2]
 * ```
 *
 * @doc
 */ function generateMignottePolynomial(d, v, k = 2) {
    // Build (v*x - 1)^k, then subtract 2 times that polynomial from x^d.
    const base = [
        v,
        -1
    ];
    let power = [
        1
    ];
    for(let i = 0; i < k; i++){
        power = multiply(power, base);
    }
    const degree = Math.max(d, k);
    const p = new Array(degree + 1).fill(0);
    p[degree - d] = 1; // x^d
    const offset = degree - (power.length - 1);
    for(let i = 0; i < power.length; i++){
        p[offset + i] += -2 * power[i];
    }
    return p;
}


;// ./src/generate/dd-generate-mignotte-poly.ts


/**
 * Returns the Classical Mignotte polynomial of the form `x^d - 2*(v*x - 1)^2`
 * with coefficients represented as double-double floating point numbers.
 *
 * * root seperation of Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * * a classic ill-conditioned polynomial with two real roots very close
 *   together (near `x = 1/v`), used to stress-test root isolation.
 *
 * * the coefficients are exact (bar overflow) since `v²` is calculated as a
 *   double-double
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 *
 * @example
 * ```typescript
 * ddGenerateMignottePolynomial(3, 2);  //=> [[0,1], [0,-8], [0,8], [0,-2]]
 * ```
 *
 * @doc
 */ function ddGenerateMignottePolynomial(d, v) {
    if (d < 2) {
        throw new Error('The degree `d` must be >= 2.');
    }
    // Mignotte polynomial: x^d - 2*(v*x - 1)^2
    //   = x^d - 2*v^2*x^2 + 4*v*x - 2
    const p = [];
    for(let i = 0; i <= d; i++){
        p.push([
            0,
            0
        ]); // (fresh arrays - no aliasing)
    }
    const vv = twoProduct(v, v); // v² exactly (as a double-double)
    const lo = vv[0] === 0 ? 0 : -2 * vv[0];
    const m2vv = [
        lo,
        -2 * vv[1]
    ]; // -2v² exactly
    p[0] = [
        0,
        1
    ]; // x^d
    p[d - 2] = d === 2 ? ddAddDd(p[0], m2vv) : m2vv; // x^2 (or x^d - 2v²x² if d === 2)
    p[d - 1] = [
        0,
        4 * v
    ]; // x^1
    p[d] = [
        0,
        -2
    ]; // x^0
    return p;
}


;// ./src/generate/e-generate-mignotte-poly.ts

/**
 * Returns the Classical Mignotte polynomial of the form `x^d - 2*(v*x - 1)^2`
 * with coefficients represented as Shewchuck floating point expansions.
 *
 * * root seperation of Mignotte polynomials: `Δ(P) ~ 1 / (v^((d+2)/2))` where
 * `v` is the parameter and `d` is the degree.
 *
 * * a classic ill-conditioned polynomial with two real roots very close
 *   together (near `x = 1/v`), used to stress-test root isolation.
 *
 * * the coefficients are exact (bar overflow)
 *
 * @param d the degree of the Mignotte polynomial (must be >= 2)
 * @param v the parameter
 *
 * @example
 * ```typescript
 * eGenerateMignottePolynomial(3, 2);  //=> [[1], [-8], [8], [-2]]
 * ```
 *
 * @doc
 */ function eGenerateMignottePolynomial(d, v) {
    if (d < 2) {
        throw new Error('The degree `d` must be >= 2.');
    }
    // Mignotte polynomial: x^d - 2*(v*x - 1)^2
    //   = x^d - 2*v^2*x^2 + 4*v*x - 2
    const p = [];
    for(let i = 0; i <= d; i++){
        p.push([
            0
        ]); // (fresh arrays - no aliasing)
    }
    const vv = twoProduct(v, v); // v² exactly (as an expansion)
    const m2vv = vv[0] === 0 ? [
        -2 * vv[1]
    ] : [
        -2 * vv[0],
        -2 * vv[1]
    ]; // -2v² exactly
    p[0] = [
        1
    ]; // x^d
    p[d - 2] = d === 2 ? fastExpansionSum(p[0], m2vv) : m2vv; // x^2 (or x^d - 2v²x² if d === 2)
    p[d - 1] = [
        4 * v
    ]; // x^1
    p[d] = [
        -2
    ]; // x^0
    return p;
}


;// ./src/util/double/factorial.ts
const factorialCache = [
    1,
    1,
    2,
    6,
    24,
    120,
    720,
    5040,
    40320,
    362880,
    3628800,
    39916800,
    479001600,
    6227020800,
    87178291200,
    1307674368000,
    20922789888000,
    355687428096000,
    6402373705728000
];
const len = factorialCache.length;
/**
 * Returns the factorial of the given number.
 *
 * * the result is exact for `n <= 18` (`18! < 2^53`); for `18 < n <= 23` the
 *   result is rounded to double precision and for `n > 23` an error is thrown
 *
 * @param n
 */ function factorial(n) {
    if (n < len) {
        return factorialCache[n];
    }
    if (n > 23) {
        throw new Error(`factorial(${n}) is not supported (the limit is 23!; results are only exact up to 18!).`);
    }
    return n * factorial(n - 1);
}


;// ./src/util/bigint/b-binomial.ts
const b_binomial_ABS_MAX_LIMIT = 1000n;
let b_binomial_maxLimit = 2;
const b_binomial_binomialTable = b_binomial_precomputeBinomialCoefficients(b_binomial_maxLimit);
function b_binomial_precomputeBinomialCoefficients(maxN) {
    // Initialize a 2D array matrix of size (maxN + 1) x (maxN + 1) filled with 0
    const dp = Array.from({
        length: maxN + 1
    }, ()=>new Array(maxN + 1).fill(0n));
    for(let i = 0; i <= maxN; i++){
        // The inner loop only needs to run up to 'i' (Pascal's triangle width grows with the row index)
        for(let j = 0; j <= i; j++){
            if (j === 0 || j === i) {
                dp[i][j] = 1n; // Base cases: nC0 = 1 and nCn = 1
            } else {
                // Pascal's Identity: nCk = (n-1)C(k-1) + (n-1)Ck
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
        }
    }
    return dp;
}
function b_binomial_extendBinomialCoefficients(binomialTable, maxN) {
    const currentMaxN = binomialTable.length - 1;
    if (maxN <= currentMaxN) {
        return binomialTable;
    }
    // Keep rows rectangular to simplify indexing.
    for(let i = 0; i <= currentMaxN; i++){
        const row = binomialTable[i];
        for(let j = row.length; j <= maxN; j++){
            row.push(0n);
        }
    }
    // Add new rows using Pascal's identity.
    for(let i = currentMaxN + 1; i <= maxN; i++){
        const row = new Array(maxN + 1).fill(0n);
        row[0] = 1n;
        row[i] = 1n;
        for(let j = 1; j < i; j++){
            row[j] = binomialTable[i - 1][j - 1] + binomialTable[i - 1][j];
        }
        binomialTable.push(row);
    }
    b_binomial_maxLimit = maxN;
    return binomialTable;
}
/**
 * Returns n choose k (nCk) as a bigint.
 * 
 * @param n 
 * @param k 
 */ function bBinomial(n, k) {
    if (n > b_binomial_ABS_MAX_LIMIT) {
        throw new Error(`n = ${n} exceeds the current maximum limit of ${b_binomial_ABS_MAX_LIMIT}.`);
    }
    if (n > b_binomial_maxLimit) {
        b_binomial_extendBinomialCoefficients(b_binomial_binomialTable, Number(n));
    }
    return b_binomial_binomialTable[Number(n)][Number(k)];
}


;// ./src/util/bigint/b-factorial.ts
const b_factorial_factorialCache = [
    1n,
    1n,
    2n,
    6n,
    24n,
    120n,
    720n,
    5040n,
    40320n,
    362880n,
    3628800n,
    39916800n,
    479001600n,
    6227020800n,
    87178291200n,
    1307674368000n,
    20922789888000n,
    355687428096000n,
    6402373705728000n
];
const b_factorial_len = b_factorial_factorialCache.length;
/**
 * Returns the factorial of the given number.
 * 
 * @param n 
 */ function bFactorial(n) {
    if (n < b_factorial_len) {
        return b_factorial_factorialCache[n];
    }
    return BigInt(n) * bFactorial(n - 1);
}


;// ./src/scale-to-int/scale-float-to-int.ts


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is
 * returned.
 *
 * * the result is exact (no round-off can occur)
 * * subnormal numbers are handled correctly
 *
 * @param a a double precision floating point number
 *
 * @doc
 */ function scaleFloatToInt(a) {
    if (a === 0) {
        return 0;
    }
    return multByPow2(a, -lsbExponent(a));
}


;// ./src/scale-to-int/scale-floats-to-ints.ts


/**
 * Returns the result of scaling the given floats by the *same* power of two
 * such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can if the
 *   magnitudes of the given floats differ too much - use [[scaleFloatsToBigints]]
 *   if this is a concern)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials or Shewchuk expansions
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */ function scaleFloatsToInts(as) {
    let e = -1024;
    for(let i = 0; i < as.length; i++){
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scalePower = -lsbExponent(a);
        if (scalePower > e) {
            e = scalePower;
        }
    }
    return as.map((a)=>multByPow2(a, e));
}


;// ./src/scale-to-int/scale-float-to-bigint.ts


/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 *
 * * subnormal numbers are handled correctly
 *
 * @param a a double precision floating point number
 *
 * @doc
 */ function scaleFloatToBigint(a) {
    if (a === 0) {
        return 0n;
    }
    return BigInt(multByPow2(a, -lsbExponent(a)));
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

// generate



// util double


// util bigint




// scale to int







export { AbsHorner, CompHornerK, EFTHorner, Horner, absCoeff, add, allRoots, allRootsCertified, allRootsCertifiedSimplified, bAbsCoeff, bAdd, bBinomial, bChangeVariablesLinear, bChangeVariablesScale, bChangeVariablesTranslateX, bCompose, bContent, bDecomposePowerSubstitution, bDeflate, bDegree, bDifferentiate, bDivideByConst, bDivides, bDivmod, bElevateDegree, bEqual, bEvaluateAt0, bEvaluateAt1, bFactorial, bFlatCoefficients, bFlatCoefficientsArr, bFlatRoots, bFlatRootsArr, bFromRoots, bGcdInt, bGcdInts, bGcdModP, bGcdModular, bGcdPrs, bHorner, bInverseModP, bInvert, bIsRationalMultipleOf, bLandauMignotteBound, bLandauMignotteBoundBigint, bMultiply, bMultiplyByConst, bNegate, bNumRoots, bNumRootsIn01, bNumRootsInRange, bP1Norm, bP2NormSquared, bPInfNorm, bPdivModP, bPdivTrivial, bPremSequencePrimitive, bPremSequenceSubresultant, bPremSequenceTrivial, bPrimitivePart, bReflectAboutYAxis, bRemoveLeadingZeros, bRittDecompose, bRittRecompose, bScale, bSignChanges, bSqrtCeil, bSturmChain, bSubtract, bSum, bTaylorShift, bXgcd, bYunsAlgorithm, bernsteinToPowerBasis, bernsteinToPowerBasis01, binomial, bisection, brent, brentPoly, changeVariablesLinear, changeVariablesScale, changeVariablesTranslateX, chineseRemainderAlgorithm, compHorner, compHornerIsFaithful, compHornerWithRunningError, compose, conditionNumber, content, createRootExact, ddAbsCoeff, ddAdd, ddDeflate, ddDeflateWithRunningError, ddDegree, ddDifferentiate, ddDifferentiateWithError, ddDivideByConst, ddGenerateMignottePolynomial, ddHorner, ddHornerWithInpError, ddInplaceScaleWithInpErr, ddIntegrate, ddMultiply, ddMultiplyByConst, ddNegate, ddRemoveLeadingZeros, ddScaleWithInpErr, ddSubtract, ddTaylorShift, deflate, degree, differentiate, divideByConst, divmod, eAbsCoeff, eAdd, eChangeVariablesLinear, eChangeVariablesScale, eChangeVariablesTranslateX, eCompose, eContent, eDeflate, eDegree, eDifferentiate, eDivmod, eEqual, eEvaluateAt0, eEvaluateAt1, eFromRoots, eGcdInt, eGcdInts, eGenerateMignottePolynomial, eHorner, eInvert, eIsConstOrZero, eIsRationalMultipleOf, eIsUnit, eMobius, eMultiply, eMultiplyByConst, eNegate, eNumRoots, eNumRootsIn01, eNumRootsInRange, eP1Norm, eP2Norm, ePInfNorm, ePdivTrivial, ePremSequencePrimitive, ePremSequenceSubresultant, ePrimitivePart, eProduct, eReflectAboutYAxis, eRemoveLeadingZeros, eScale, eSignChanges, eSturmChain, eSubtract, eTaylorShift, eeHorner, eeTaylorShift, eps, equal, evalCertified, evalCertifiedInclError, evalK, evaluateAt0, evaluateAt1, factorial, flatCoefficients, flatCoefficientsArr, flatRoots, flatRootsArr, fromRoots, gcdInt, gcdInts, gcdPrs, generateMignottePolynomial, getUlp, hornerWithRunningError, inplaceTaylorShiftBy1WithInpErr, integrate, invert, isExactPowerOf2, isRationalMultipleOf, isSubnormal, mid, mobius, multiply, multiplyByConst, multiplyKaratsuba, negate, negativeRootLowerBound_LMQ, negativeRootLowerBound_LMQ_WithError, negativeRootUpperBound_LMQ, negativeRootUpperBound_LMQ_WithError, nextdown, nextup, numRoots, numRootsIn01, numRootsInRange, p1Norm, p2Norm, pInfNorm, positiveRootLowerBound_LMQ, positiveRootLowerBound_LMQ_WithError, positiveRootUpperBound_LMQ, positiveRootUpperBound_LMQ_WithError, powerToBernsteinBasis, powerToBernsteinBasis01, predictiveRandom, premSequenceSubresultant, primitivePart, quadraticRoots, random, randomIntInRange, refineK1, reflectAboutYAxis, removeLeadingZeros, rootIntervalToExp, rootMagnitudeUpperBound_fujiwara, rootMagnitudeUpperBound_rouche, roots, scale, scaleFloatToBigint, scaleFloatToInt, scaleFloatsToBigints, scaleFloatsToInts, scaleFloatssToBigintss, scaleFloatssToIntss, scaleWithInpErr, signChanges, sturmChain, subtract, taylorShift, taylorShiftWithInpErr, toCasStr, toPolyForPositiveRootUpperBound_LMQ, u, uu, γ, γ1, γγ, γγ3 };
