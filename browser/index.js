/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "oM": () => (/* reexport */ AbsHorner),
  "Pg": () => (/* reexport */ CompHornerK),
  "rH": () => (/* reexport */ EFTHorner),
  "E2": () => (/* reexport */ Horner),
  "UR": () => (/* reexport */ absCoeff),
  "IH": () => (/* reexport */ add),
  "Tr": () => (/* reexport */ allRoots),
  "oH": () => (/* reexport */ allRootsCertified),
  "Dy": () => (/* reexport */ allRootsCertifiedSimplified),
  "l2": () => (/* reexport */ bAbsCoeff),
  "Ve": () => (/* reexport */ bAdd),
  "IU": () => (/* reexport */ bChangeVariablesLinear),
  "KL": () => (/* reexport */ bChangeVariablesScale),
  "Ew": () => (/* reexport */ bChangeVariablesTranslateX),
  "KG": () => (/* reexport */ bContent),
  "gM": () => (/* reexport */ bDegree),
  "dv": () => (/* reexport */ bDifferentiate),
  "bu": () => (/* reexport */ bDivideByConst),
  "Zv": () => (/* reexport */ bEqual),
  "OP": () => (/* reexport */ bEvaluateAt0),
  "KI": () => (/* reexport */ bEvaluateAt1),
  "dA": () => (/* reexport */ bFlatCoefficients),
  "CR": () => (/* reexport */ bFlatCoefficientsArr),
  "ds": () => (/* reexport */ bFlatRoots),
  "OA": () => (/* reexport */ bFlatRootsArr),
  "eg": () => (/* reexport */ bFromRoots),
  "DC": () => (/* reexport */ bGcdInt),
  "SG": () => (/* reexport */ bGcdInts),
  "zY": () => (/* reexport */ bGcdPrs),
  "LD": () => (/* reexport */ bHorner),
  "$v": () => (/* reexport */ bInvert),
  "$l": () => (/* reexport */ bIsRationalMultipleOf),
  "c1": () => (/* reexport */ bMultiply),
  "Sl": () => (/* reexport */ bMultiplyByConst),
  "db": () => (/* reexport */ bNegate),
  "pD": () => (/* reexport */ bNumRoots),
  "Ak": () => (/* reexport */ bNumRootsIn01),
  "i6": () => (/* reexport */ bNumRootsInRange),
  "jV": () => (/* reexport */ bP1Norm),
  "Dc": () => (/* reexport */ bP2NormSquared),
  "hg": () => (/* reexport */ bPInfNorm),
  "ib": () => (/* reexport */ bPdivTrivial),
  "aP": () => (/* reexport */ bPremSequencePrimitive),
  "YF": () => (/* reexport */ bPremSequenceSubresultant),
  "tK": () => (/* reexport */ bPremSequenceTrivial),
  "dI": () => (/* reexport */ bPrimitivePart),
  "i7": () => (/* reexport */ bReflectAboutYAxis),
  "iK": () => (/* reexport */ bRemoveLeadingZeros),
  "j5": () => (/* reexport */ bSignChanges),
  "K": () => (/* reexport */ bSturmChain),
  "J9": () => (/* reexport */ bSubtract),
  "HH": () => (/* reexport */ bisection),
  "YQ": () => (/* reexport */ brent),
  "u1": () => (/* reexport */ brentPoly),
  "uO": () => (/* reexport */ changeVariablesLinear),
  "ef": () => (/* reexport */ changeVariablesScale),
  "K0": () => (/* reexport */ changeVariablesTranslateX),
  "YT": () => (/* reexport */ compHorner),
  "fy": () => (/* reexport */ compHornerIsFaithful),
  "rP": () => (/* reexport */ compHornerWithRunningError),
  "$k": () => (/* reexport */ conditionNumber),
  "kQ": () => (/* reexport */ content),
  "UC": () => (/* reexport */ createRootExact),
  "aF": () => (/* reexport */ ddDeflate),
  "Xz": () => (/* reexport */ ddDifferentiate),
  "sF": () => (/* reexport */ ddDifferentiateWithError),
  "sG": () => (/* reexport */ ddIntegrate),
  "Wt": () => (/* reexport */ deflate),
  "U8": () => (/* reexport */ degree),
  "YC": () => (/* reexport */ differentiate),
  "FV": () => (/* reexport */ divideByConst),
  "ZX": () => (/* reexport */ eAbsCoeff),
  "_L": () => (/* reexport */ eAdd),
  "_n": () => (/* reexport */ eChangeVariablesLinear),
  "FI": () => (/* reexport */ eChangeVariablesScale),
  "rm": () => (/* reexport */ eChangeVariablesTranslateX),
  "QO": () => (/* reexport */ eContent),
  "wY": () => (/* reexport */ eDegree),
  "YV": () => (/* reexport */ eDifferentiate),
  "qW": () => (/* reexport */ eEqual),
  "u3": () => (/* reexport */ eEvaluateAt0),
  "Fg": () => (/* reexport */ eEvaluateAt1),
  "g7": () => (/* reexport */ eFromRoots),
  "gX": () => (/* reexport */ eGcdInt),
  "Oh": () => (/* reexport */ eGcdInts),
  "dY": () => (/* reexport */ eHorner),
  "vD": () => (/* reexport */ eInvert),
  "MY": () => (/* reexport */ eIsConstOrZero),
  "BW": () => (/* reexport */ eIsRationalMultipleOf),
  "_4": () => (/* reexport */ eIsUnit),
  "d2": () => (/* reexport */ eMultiply),
  "md": () => (/* reexport */ eMultiplyByConst),
  "zC": () => (/* reexport */ eNegate),
  "mq": () => (/* reexport */ eNumRoots),
  "th": () => (/* reexport */ eNumRootsIn01),
  "y1": () => (/* reexport */ eNumRootsInRange),
  "Xh": () => (/* reexport */ eP1Norm),
  "Ws": () => (/* reexport */ eP2Norm),
  "ww": () => (/* reexport */ ePInfNorm),
  "HA": () => (/* reexport */ ePdivTrivial),
  "b9": () => (/* reexport */ ePremSequencePrimitive),
  "_V": () => (/* reexport */ ePremSequenceSubresultant),
  "kP": () => (/* reexport */ ePrimitivePart),
  "Fp": () => (/* reexport */ eProduct),
  "QU": () => (/* reexport */ eReflectAboutYAxis),
  "XN": () => (/* reexport */ eRemoveLeadingZeros),
  "t": () => (/* reexport */ eSignChanges),
  "_u": () => (/* reexport */ eSturmChain),
  "x1": () => (/* reexport */ eSubtract),
  "ZW": () => (/* reexport */ eeHorner),
  "Dg": () => (/* reexport */ equal),
  "f6": () => (/* reexport */ evalCertified),
  "Kj": () => (/* reexport */ evalCertifiedInclError),
  "Of": () => (/* reexport */ evalK),
  "Th": () => (/* reexport */ evaluateAt0),
  "M9": () => (/* reexport */ evaluateAt1),
  "sd": () => (/* reexport */ flatCoefficients),
  "b1": () => (/* reexport */ flatCoefficientsArr),
  "m4": () => (/* reexport */ flatRoots),
  "rL": () => (/* reexport */ flatRootsArr),
  "Ht": () => (/* reexport */ fromRoots),
  "a8": () => (/* reexport */ gcdInt),
  "JK": () => (/* reexport */ gcdInts),
  "xD": () => (/* reexport */ hornerWithRunningError),
  "lF": () => (/* reexport */ integrate),
  "U_": () => (/* reexport */ invert),
  "IP": () => (/* reexport */ isRationalMultipleOf),
  "Pi": () => (/* reexport */ mid),
  "Jp": () => (/* reexport */ multiply),
  "$d": () => (/* reexport */ multiplyByConst),
  "tk": () => (/* reexport */ negate),
  "$3": () => (/* reexport */ negativeRootLowerBound_LMQ),
  "kT": () => (/* reexport */ negativeRootUpperBound_LMQ),
  "lV": () => (/* reexport */ numRoots),
  "$6": () => (/* reexport */ numRootsIn01),
  "XP": () => (/* reexport */ numRootsInRange),
  "Gn": () => (/* binding */ src_operators),
  "fk": () => (/* reexport */ p1Norm),
  "P5": () => (/* reexport */ p2Norm),
  "Yz": () => (/* reexport */ pInfNorm),
  "Fw": () => (/* reexport */ positiveRootLowerBound_LMQ),
  "FW": () => (/* reexport */ positiveRootUpperBound_LMQ),
  "Hq": () => (/* reexport */ predictiveRandom),
  "A_": () => (/* reexport */ premSequenceSubresultant),
  "$5": () => (/* reexport */ primitivePart),
  "GD": () => (/* reexport */ quadraticRoots),
  "X_": () => (/* reexport */ refineK1),
  "NF": () => (/* reexport */ reflectAboutYAxis),
  "Qo": () => (/* reexport */ removeLeadingZeros),
  "WM": () => (/* reexport */ rootIntervalToExp),
  "Dk": () => (/* reexport */ rootMagnitudeUpperBound_fujiwara),
  "T9": () => (/* reexport */ rootMagnitudeUpperBound_rouche),
  "GG": () => (/* reexport */ scaleFloatToBigint),
  "we": () => (/* reexport */ scaleFloatToInt),
  "D9": () => (/* reexport */ scaleFloatsToBigints),
  "yM": () => (/* reexport */ scaleFloatsToInts),
  "Bz": () => (/* reexport */ scaleFloatssToBigintss),
  "Rm": () => (/* reexport */ scaleFloatssToIntss),
  "bN": () => (/* reexport */ signChanges),
  "SW": () => (/* reexport */ sturmChain),
  "$X": () => (/* reexport */ subtract),
  "yd": () => (/* reexport */ toCasStr),
  "H8": () => (/* reexport */ γ),
  "Uv": () => (/* reexport */ γγ)
});

;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-estimate.js
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
;// CONCATENATED MODULE: ./src/basic/to-cas-str.ts

/** @internal */
function isNumber(x) {
    return typeof x === 'number';
}
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
            ? (_v < 0n ? -v : v)
            : Math.abs(v);
        let cStr = nonNegativeNumberToString(absV);
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
    if (Math.abs(num) < 1) {
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-abs-coeff.ts
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        const v = p[i];
        p_.push(v < 0n ? -v : v);
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/basic/bigint/b-remove-leading-zeros.ts
/**
 * If the highest power coefficient of the given polynomial is 0 then
 * removeLeadingZeros can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 * @param p a polynomial whose leading zeros should be removed
 *
 * @doc
 */
function bRemoveLeadingZeros(p) {
    // @ts-nocheck
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-add.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_add_bRemoveLeadingZeros = bRemoveLeadingZeros;
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
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || 0n;
        const c2 = p2[i + Δd2] || 0n;
        result.push(c1 + c2);
    }
    // Ensure the result is a valid polynomial representation
    return b_add_bRemoveLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/basic/bigint/b-degree.ts
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-divide-by-const.ts
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
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}


;// CONCATENATED MODULE: ./src/basic/bigint/b-equal.ts
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-invert.ts
/**
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
    return p.slice().reverse();
}


;// CONCATENATED MODULE: ./src/gcd/bigint/b-integer-gcd.ts
/**
 * Computes and returns the greatest common divisor of two integers a and b,
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-is-rational-multiple-of.ts

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


;// CONCATENATED MODULE: ./src/basic/bigint/b-multiply.ts
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


;// CONCATENATED MODULE: ./src/basic/bigint/b-multiply-by-const.ts
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
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(c * p[i]);
    }
    return r;
}


;// CONCATENATED MODULE: ./src/basic/bigint/b-negate.ts
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(-p[i]);
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/basic/bigint/b-subtract.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_subtract_bRemoveLeadingZeros = bRemoveLeadingZeros;
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
    const d = Math.max(da, db);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = a[i + Δd1] || 0n;
        const c2 = b[i + Δd2] || 0n;
        result.push(c1 - c2);
    }
    // Ensure the result is a valid polynomial representation
    return b_subtract_bRemoveLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/basic/double/abs-coeff.ts
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(Math.abs(p[i]));
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/basic/double/remove-leading-zeros.ts
/**
 * If the highest power coefficient of the given polynomial is 0 then
 * removeLeadingZeros can be called to remove all such highest terms so that
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


;// CONCATENATED MODULE: ./src/basic/double/add.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const add_removeLeadingZeros = removeLeadingZeros;
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
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || 0;
        const c2 = p2[i + Δd2] || 0;
        result.push(c1 + c2);
    }
    // Ensure the result is a valid polynomial representation
    return add_removeLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/basic/double/degree.ts
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


;// CONCATENATED MODULE: ./src/basic/double/divide-by-const.ts
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
    const r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}


;// CONCATENATED MODULE: ./src/basic/double/equal.ts
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


;// CONCATENATED MODULE: ./src/basic/double/invert.ts
/**
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
    return p.slice().reverse();
}


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/double-to-octets.js
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/parse-double.js
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
    const exponent_ = ((p0 & 127) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 15) + hiddenMsb;
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/exponent.js

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return parseDouble(a).exponent;
}

//# sourceMappingURL=exponent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/significand.js

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */
function significand(a) {
    return parseDouble(a).significand;
}

//# sourceMappingURL=significand.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/get-max-set-bit.js

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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-compress.js
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
function e_compress_eCompress(e) {
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-sign.js
/**
 * Returns the sign of the given expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to
 * determine its sign (take the sign of the largest component) ... "
 *
 * @param e A floating point expansion with zeroes eliminated.
 */
function e_sign_eSign(e) {
    return e[e.length - 1];
}

//# sourceMappingURL=e-sign.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/bit-length.js




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
    const a_ = e_compress_eCompress(a);
    if (e_sign_eSign(a_) === 0) {
        return 0;
    }
    const msbyte = a_[a_.length - 1];
    const lsbyte = a_[0];
    return exponent(msbyte) - exponent(lsbyte) + (53 - getLowestSetBit(lsbyte));
}

//# sourceMappingURL=bit-length.js.map
;// CONCATENATED MODULE: ./src/scale-to-int/scale-floats-to-ints.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_floats_to_ints_exponent = exponent;
const scale_floats_to_ints_bitLength = bitLength;
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
        const scaleFactor = -scale_floats_to_ints_exponent(a) + scale_floats_to_ints_bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }
    return as.map(a => a * 2 ** e);
}


;// CONCATENATED MODULE: ./src/gcd/double/integer-gcd.ts
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers
 *
 * @doc
 */
function gcdInt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
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
    a = Math.abs(a);
    b = Math.abs(b);
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
        vals_[i] = Math.abs(vals_[i]);
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
        vals_[i] = Math.abs(vals_[i]);
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

//export { gcdInt, gcdInts }

;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/two-product.js
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
function two_product_twoProduct(a, b) {
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-negative-of.js
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = (/* unused pure expression or super */ null && (eCompress));
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/grow-expansion.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const grow_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/two-sum.js
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
function two_sum_twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]

//# sourceMappingURL=two-sum.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-sum.js



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = two_sum_twoSum;
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/scale-expansion.js




const scale_expansion_f = 134217729; // 2**27 + 1;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = (/* unused pure expression or super */ null && (twoProduct));
const scale_expansion_ts = (/* unused pure expression or super */ null && (twoSum));
const fts = (/* unused pure expression or super */ null && (fastTwoSum));
const scale_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-diff.js


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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-long-divide.js







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_long_divide_eNegativeOf = eNegativeOf;
const e_long_divide_fastExpansionSum = fastExpansionSum;
const e_long_divide_eCompress = e_compress_eCompress;
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-compare.js


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
    return e_sign_eSign(eDiff(a, b));
}

//# sourceMappingURL=e-compare.js.map
;// CONCATENATED MODULE: ./src/basic/double/is-rational-multiple-of.ts



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
        const Ab = two_product_twoProduct(A, b_[i]);
        const { div, rem } = eLongDivide(Ab, [B]);
        if (e_sign_eSign(rem) !== 0) {
            return false;
        }
        if (eCompare(div, [a_[i]]) !== 0) {
            return false;
        }
    }
    return true;
}


;// CONCATENATED MODULE: ./src/basic/double/multiply.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const multiply_removeLeadingZeros = removeLeadingZeros;
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
    return multiply_removeLeadingZeros(r);
}


;// CONCATENATED MODULE: ./src/basic/double/multiply-by-const.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const multiply_by_const_removeLeadingZeros = removeLeadingZeros;
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
    const p_ = [];
    for (let i = 0; i < d; i++) {
        p_.push(c * p[i]);
    }
    // We *have* to clip due to possible floating point underflow
    return multiply_by_const_removeLeadingZeros(p_);
}


;// CONCATENATED MODULE: ./src/basic/double/negate.ts
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(-p[i]);
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/basic/double/subtract.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const subtract_removeLeadingZeros = removeLeadingZeros;
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
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || 0;
        const c2 = p2[i + Δd2] || 0;
        result.push(c1 - c2);
    }
    // Ensure the result is a valid polynomial representation
    return subtract_removeLeadingZeros(result);
}


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-abs.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_abs_sign = (/* unused pure expression or super */ null && (eSign));
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
;// CONCATENATED MODULE: ./src/basic/expansion/e-abs-coeff.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_abs_coeff_eAbs = eAbs;
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(e_abs_coeff_eAbs(p[i]));
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-remove-leading-zeros.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_remove_leading_zeros_eSign = e_sign_eSign;
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
        if (e_remove_leading_zeros_eSign(p[i]) !== 0) {
            break;
        }
        lzCount++;
    }
    if (lzCount !== 0) {
        p = p.slice(lzCount);
    }
    return p;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-add.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_add_fastExpansionSum = fastExpansionSum;
const e_add_eRemoveLeadingZeros = eRemoveLeadingZeros;
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
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result.push(e_add_fastExpansionSum(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return e_add_eRemoveLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-degree.ts
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


;// CONCATENATED MODULE: ./src/basic/expansion/e-equal.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_equal_eCompare = eCompare;
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
        if (e_equal_eCompare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-invert.ts
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


;// CONCATENATED MODULE: ./src/basic/expansion/e-is-const-or-zero.ts
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


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-int-div.js

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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/expansion-product.js



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scaleExpansion;
const expansion_product_add = fastExpansionSum;
const expansion_product_compress = (/* unused pure expression or super */ null && (eCompress));
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
;// CONCATENATED MODULE: ./src/scale-to-int/scale-floatss-to-intss.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_floatss_to_intss_exponent = exponent;
const scale_floatss_to_intss_bitLength = bitLength;
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
            const scaleFactor = -scale_floatss_to_intss_exponent(a) + scale_floatss_to_intss_bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }
    return ass.map(as => as.map(a => a * 2 ** e));
}


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-rem.js

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
;// CONCATENATED MODULE: ./src/gcd/expansion/e-integer-gcd.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_integer_gcd_eAbs = eAbs;
const e_integer_gcd_eSign = e_sign_eSign;
const e_integer_gcd_eRem = eRem;
/**
 * Computes the greatest common divisor of two integers a and b, using the
 * Euclidean Algorithm.
 *
 * **precondition** a, b must be integers given as Shewchuk expansions
 *
 * @doc
 */
function eGcdInt(a, b) {
    a = e_integer_gcd_eAbs(a);
    b = e_integer_gcd_eAbs(b);
    // The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
    //return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
    if (e_integer_gcd_eSign(a) === 0) {
        return b;
    }
    if (e_integer_gcd_eSign(b) === 0) {
        return a;
    }
    while (e_integer_gcd_eSign(b) !== 0) {
        const t = b;
        b = e_integer_gcd_eRem(a, b);
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
        vals_[i] = e_integer_gcd_eAbs(vals_[i]);
    }
    let a = vals_[0];
    for (let i = 1; i < len; i++) {
        a = eGcdInt(a, vals_[i]);
    }
    return a;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-is-rational-multiple-of.ts



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
    const a_ = scaleFloatssToIntss(e_sign_eSign(a[0]) < 0 ? a.map(c => eNegativeOf(c)) : a);
    const b_ = scaleFloatssToIntss(e_sign_eSign(b[0]) < 0 ? b.map(c => eNegativeOf(c)) : b);
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
        if (e_sign_eSign(rem) !== 0) {
            return false;
        }
        if (eCompare(div, a_[i]) !== 0) {
            return false;
        }
    }
    return true;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-is-unit.ts
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


;// CONCATENATED MODULE: ./src/basic/expansion/e-multiply.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_multiply_eRemoveLeadingZeros = eRemoveLeadingZeros;
const e_multiply_expansionProduct = expansionProduct;
const e_multiply_fastExpansionSum = fastExpansionSum;
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
            result[d - (i + j)] = e_multiply_fastExpansionSum(result[d - (i + j)], e_multiply_expansionProduct(a[da - i], b[db - j]));
        }
    }
    return e_multiply_eRemoveLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-multiply-by-const.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_multiply_by_const_eSign = e_sign_eSign;
const e_multiply_by_const_expansionProduct = expansionProduct;
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
    if (e_multiply_by_const_eSign(c) === 0) {
        return [];
    }
    const d = p.length - 1;
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        result.push(e_multiply_by_const_expansionProduct(c, p[i]));
    }
    return result;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-negate.ts
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗

const e_negate_eNegativeOf = eNegativeOf;
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
    const result = [];
    for (let i = 0; i < p.length; i++) {
        result.push(e_negate_eNegativeOf(p[i]));
    }
    return result;
}


;// CONCATENATED MODULE: ./src/basic/expansion/e-product.ts

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


;// CONCATENATED MODULE: ./src/basic/expansion/e-subtract.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_subtract_eDiff = eDiff;
const e_subtract_eRemoveLeadingZeros = eRemoveLeadingZeros;
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
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result.push(e_subtract_eDiff(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return e_subtract_eRemoveLeadingZeros(result);
}


;// CONCATENATED MODULE: ./src/calculus/bigint/b-differentiate.ts
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
    const r = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        r.push(BigInt((d - i)) * p[i]);
    }
    return r;
}


;// CONCATENATED MODULE: ./src/calculus/double/differentiate.ts
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
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push((d - i) * p[i]);
    }
    return result;
}


;// CONCATENATED MODULE: ./src/calculus/double/integrate.ts
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
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d + 1; i++) {
        result.push(p[i] / (d + 1 - i));
    }
    result.push(c);
    return result;
}


;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-diff-dd.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-min.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
/** @internal */
const diff = ddDiffDd;
/**
 * Returns the minimum of a and b.
 * @param a a double-double precision floating point number
 * @param b another double-double precision floating point number
 */
function ddMin(a, b) {
    const res = diff(a, b)[1];
    return res > 0 ? b : a;
}

//# sourceMappingURL=dd-min.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-max.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
/** @internal */
const dd_max_diff = ddDiffDd;
/**
 * Returns the maximum of a and b.
 * @param a a double-double precision floating point number
 * @param b another double-double precision floating point number
 */
function ddMax(a, b) {
    const res = dd_max_diff(a, b)[1];
    return res > 0 ? a : b;
}

//# sourceMappingURL=dd-max.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-sqrt.js
/** @internal */
const dd_sqrt_f = 134217729; // 2**27 + 1;
// Taken from https://github.com/munrocket/double.js/blob/master/src/double.ts
// Unfortunately no error bound given
/**
 * Returns the square root of a double-double as a double-double.
 * * no error bound is returned
 *
 * @param x a double-double precision floating point number
 */
// TODO - calculate an error bound and add to function description
function ddSqrt(x) {
    const xl = x[0];
    const xh = x[1];
    if (xh === 0) {
        return [0, 0];
    }
    const s = Math.sqrt(xh);
    //const [tl,th] = twoSquare(s);
    const th = s * s;
    const c = dd_sqrt_f * s;
    const ah = c - (c - s);
    const al = s - ah;
    const tl = (al * al) - ((th - (ah * ah)) - 2 * (ah * al));
    const e = (xh - th - tl + xl) * 0.5 / s;
    return [e - ((s + e) - s), s + e];
}

//# sourceMappingURL=dd-sqrt.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-mixed-double-double/double-sqrt.js
/** @internal */
const double_sqrt_f = 134217729; // 2**27 + 1;
// Taken from https://github.com/munrocket/double.js/blob/master/src/double.ts
// Unfortunately no error bound given
/**
 * Returns the square root of a double as a double-double.
 * * no error bound is returned
 */
// TODO - calculate an error bound and add to function description
function doubleSqrt(x) {
    if (x === 0) {
        return [0, 0];
    }
    const s = Math.sqrt(x);
    //const [tl,th] = twoSquare(s);
    const th = s * s;
    const c = double_sqrt_f * s;
    const ah = c - (c - s);
    const al = s - ah;
    const tl = (al * al) - ((th - (ah * ah)) - 2 * (ah * al));
    const e = (x - th - tl) * 0.5 / s;
    x = s + e;
    const xl = e - (x - s);
    return [xl, x];
}

//# sourceMappingURL=double-sqrt.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-with-err/sqrt-with-err.js
/** @internal */
const eps = Number.EPSILON;
/**
 * Returns the result of the square root of a double floating point number
 * together with an absolute error bound where x_ is an absolute error
 * bound on the input value.
 * * see also "A Reduced Product of Absolute and Relative Error Bounds for Floating-point Analysis"
 * by Maxime Jacquemin, Sylvie Putot, and Franck Vedrine
 * @param x numerator
 * @param x_ absolute value error bound in numerator
 */
function sqrtWithErr(x, x_) {
    // Note: it is assumed x + x_ >= 0, else the error in x_ was wrong in the
    // first place (since we can't have a negative input to the square root)
    // estimate the result of the square root
    if (x - x_ <= 0) {
        const est = x > 0 ? Math.sqrt(x) : 0;
        return {
            est,
            err: Math.max(Math.sqrt(x + x_) - est, est)
        };
    }
    const est = Math.sqrt(x);
    const minSqrt = Math.sqrt(x - x_);
    const maxSqrt = Math.sqrt(x + x_);
    const err = Math.max(Math.abs(minSqrt - est), Math.abs(maxSqrt - est));
    //err += eps*abs(est + err);
    //err = eps*abs(est + err);
    // approx relative input error
    //const rel = x_/abs(x);
    // propogated error bound
    //const err = est*(Math.sqrt(1 + rel) - 1) + u*abs(est);
    return { est, err };
}

//# sourceMappingURL=sqrt-with-err.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-abs.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-mixed-double-double/dd-add-double.js
/**
 * Returns the result of adding a double to a double-double precision floating
 * point number.
 *
 * * relative error bound: 2u^2, i.e. fl(a+b) = (a+b)(1+ϵ),
 * where ϵ <= 2u^2, u = 0.5 * Number.EPSILON
 * * the error bound is sharp
 *
 * ALGORITHM 4 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * @param x a double-double precision floating point number
 * @param y a double precision floating point number
 */
function ddAddDouble(x, y) {
    const xl = x[0];
    const xh = x[1];
    //const [sl,sh] = twoSum(xh, y);
    const sh = xh + y;
    const c = sh - xh;
    const sl = (xh - (sh - c)) + (y - c);
    const v = xl + sl;
    //const [zl,zh] = fastTwoSum(sh,v);
    const zh = sh + v;
    const zl = v - (zh - sh);
    return [zl, zh];
}

//# sourceMappingURL=dd-add-double.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-add-dd.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-mult-dd.js
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
    //const xl = x[0];
    const xh = x[1];
    //const yl = y[0];
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/multi/dd-product.js

/**
 * Returns the result of multiplying together an array of double-double-precision
 * floating point numbers naively (i.e. not using pairwise addition to reduce
 * error a bit).
 *
 * * an error bound is given by: (n-1)(1+ϵ),
 * where ϵ <= 7u^2, u = 0.5 * Number.EPSILON
 */
function ddProduct(qs) {
    let q = qs[0];
    for (let i = 1; i < qs.length; i++) {
        q = ddMultDd(q, qs[i]);
    }
    return q;
}

//# sourceMappingURL=dd-product.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/multi/dd-sum.js

/**
 * Returns the result of summing an array of double-double-precision floating
 * point numbers naively (i.e. not using pairwise addition to reduce error a bit).
 *
 * * an error bound is given by: (n-1)(1+ϵ),
 * where ϵ <= 3u^2 + 13u^3, u = 0.5 * Number.EPSILON
 */
function ddSum(qs) {
    let q = qs[0];
    for (let i = 1; i < qs.length; i++) {
        q = ddAddDd(q, qs[i]);
    }
    return q;
}

//# sourceMappingURL=dd-sum.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-compare.js
/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 *
 * @param x a double-double precision floating point number
 * @param y another double-double precision floating point number
 */
function ddCompare(x, y) {
    //return ddDiffDd(x,y)[1];
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
    return zh;
}

//# sourceMappingURL=dd-compare.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-mixed-double-double/dd-mult-double.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-mult-by-2.js
/**
 * Returns the result of multiplying the given double-double by 2.
 * * The result is exact
 * @param f a double-double precision floating point number
 */
function ddMultBy2(f) {
    return [2 * f[0], 2 * f[1]];
}

//# sourceMappingURL=dd-mult-by-2.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-mult-by-4.js
/**
 * Returns the result of multiplying the given double-double by 4.
 * * The result is exact
 * @param f a double-double precision floating point number
 */
function ddMultBy4(f) {
    return [4 * f[0], 4 * f[1]];
}

//# sourceMappingURL=dd-mult-by-4.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-div-by-2.js
/**
 * Returns the result of dividing the given double-double by 2.
 * @param f a double-double precision floating point number
 */
function ddDivBy2(f) {
    return [f[0] / 2, f[1] / 2];
}

//# sourceMappingURL=dd-div-by-2.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-mult-by-neg-2.js
/**
 * Returns the result of multiplying the given double-double by -2.
 * * The result is exact
 * @param f a double-double precision floating point number
 */
function ddMultByNeg2(f) {
    return [-2 * f[0], -2 * f[1]];
}

//# sourceMappingURL=dd-mult-by-neg-2.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-mult-by-neg-4.js
/**
 * Returns the result of multiplying the given double-double by -4.
 * * The result is exact
 * @param f a double-double precision floating point number
 */
function ddMultByNeg4(f) {
    return [-4 * f[0], -4 * f[1]];
}

//# sourceMappingURL=dd-mult-by-neg-4.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-mixed-double-double/dd-div-double.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/binary/dd-div-dd.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-negative-of.js
/**
 * Returns the negative of the given double-double precision floating point
 * number.
 * * the result is exact
 * @param f a double-double precision floating point number
 */
function ddNegativeOf(f) {
    return [-f[0], -f[1]];
}

//# sourceMappingURL=dd-negative-of.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double/unary/dd-sign.js
/**
 * Returns the sign of the given double-double-precision floating point number.
 * * a positive or negative double or zero is returned - not necessarily +1, 0
 * or -1
 * * prefer inlining this - it is really only here for reference
 */
function ddSign(f) {
    return f[1];
}

//# sourceMappingURL=dd-sign.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/fast-two-diff.js
/**
 * Returns the difference and exact error of subtracting two floating point
 * numbers.
 * Uses an EFT (error-free transformation), i.e. `a-b === x+y` exactly.
 * The returned result is a non-overlapping expansion (smallest value first!).
 *
 * * **precondition:** `abs(a) >= abs(b)` - A fast test that can be used is
 * `(a > b) === (a > -b)`
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastTwoDiff(a, b) {
    const x = a - b;
    const y = (a - x) - b;
    return [y, x];
}

//# sourceMappingURL=fast-two-diff.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/fast-two-sum.js
/**
 * Returns the sum and exact error of adding two floating point numbers.
 * Uses an EFT (error-free transformation), i.e. a+b === x+y exactly.
 * The returned sum is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fast_two_sum_fastTwoSum(a, b) {
    const x = a + b;
    return [b - (x - a), x];
}
// inlined
//const R = a + b; const r = b - (R - a); return [r, R];

//# sourceMappingURL=fast-two-sum.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/split.js
/**
 * === 2^Math.ceil(p/2) + 1 where p is the # of significand bits in a double === 53.
 * @internal
 */
const split_f = 134217729; // 2**27 + 1;
/**
 * Returns the result of splitting a double into 2 26-bit doubles.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * see e.g. [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * @param a A double floating point number
 */
function split(a) {
    const c = split_f * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [a_h, a_l];
}
// inlined - input a, output a_h, a_l
// const c = f * a; const a_h = c - (c - a); const a_l = a - a_h; return [a_h, a_l];

//# sourceMappingURL=split.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/two-diff.js
/**
 * Returns the exact result of subtracting b from a.
 *
 * @param a minuend - a double-double precision floating point number
 * @param b subtrahend - a double-double precision floating point number
 */
function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = (a - (x + bvirt)) + (bvirt - b);
    return [y, x];
}

//# sourceMappingURL=two-diff.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/two-product.js
/** @internal */
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
function basic_two_product_twoProduct(a, b) {
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-mixed-double-double/double-div-double.js
/** @internal */
const double_div_double_f = 134217729; // 2**27 + 1;
/**
 * Returns the result of dividing a double-precision floating point
 * number by a double with the result given as a double-double.
 * This is a slight modification of ddDivDd.
 *
 * * **!! NOT an error-free transformation !!**
 * * relative error bound: 3u^2, i.e. fl(a/b) = (a/b)(1+ϵ), where ϵ <= 3u^2,
 * u = 0.5 * Number.EPSILON
 *
 * * ALGORITHM 15 of https://hal.archives-ouvertes.fr/hal-01351529v3/document
 * (slightly modified)
 * @param x dividend
 * @param y divisor
 */
function doubleDivDouble(x, y) {
    const th = x / y;
    //const [πl,πh] = twoProduct(th,y);
    const πh = th * y;
    const c = double_div_double_f * th;
    const ah = c - (c - th);
    const al = th - ah;
    const d = double_div_double_f * y;
    const bh = d - (d - y);
    const bl = y - bh;
    const πl = (al * bl) - ((πh - (ah * bh)) - (al * bh) - (ah * bl));
    const δh = x - πh; // exact operation
    const δt = δh - πl; // exact operation
    const tl = δt / y;
    //return fastTwoSum(th,tl);
    const xx = th + tl;
    return [tl - (xx - th), xx];
}

//# sourceMappingURL=double-div-double.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/two-sum.js
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
function basic_two_sum_twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]

//# sourceMappingURL=two-sum.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/basic/reduce-significand.js
/**
 * Truncates a floating point value's significand and returns the result.
 * Similar to split, but with the ability to specify the number of bits to keep.
 *
 * **Theorem 17 (Veltkamp-Dekker)**: Let a be a p-bit floating-point number, where
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/double-to-octets.js
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/double-to-binary-string.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

/** @internal */
function double_to_binary_string_doubleToBinaryString(number) {
    return octetsToBinaryString(double_to_octets_doubleToOctets(number));
}
/**
 * @param octets The 8 bytes composing a double (msb first)
 * @internal
 */
function octetsToBinaryString(octets) {
    return octets
        .map(int8ToBinaryString)
        .join('');
}
/**
 * intToBinaryString(8) -> "00001000"
 * @internal
 */
function int8ToBinaryString(i) {
    let iStr = i.toString(2);
    for (; iStr.length < 8; iStr = "0" + iStr)
        ;
    return iStr;
}

//# sourceMappingURL=double-to-binary-string.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/parse-double.js
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
    const exponent_ = ((p0 & 127) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 15) + hiddenMsb;
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
    const str = double_to_binary_string_doubleToBinaryString(x);
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
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/significand.js

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 *
 * @param a A double
 */
function significand_significand(a) {
    return parse_double_parseDouble(a).significand;
}

//# sourceMappingURL=significand.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/get-max-set-bit.js

/**
 * Returns the lowest set bit of the given value in [1, (2**31)-1],
 * i.e. from 1 up to 2147483647 else if no bit is set (input === 0) returns
 * NaN, otherwise if the number is out of range returns a non-finite
 * number.
 * See https://stackoverflow.com/a/35190288/2010061
 * @internal
 */
function get_max_set_bit_getLowestSetBit_(a) {
    return Math.log2(a & -a);
}
/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function get_max_set_bit_getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // Note: the significand includes the hidden bit!
    const s = significand_significand(a);
    const len = s.length;
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === 0) {
            continue;
        }
        const l = get_max_set_bit_getLowestSetBit_(s[i]);
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
 * @internal
 */
function get_max_set_bit_getHighestSetBit_(a) {
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
function get_max_set_bit_getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the 
    // number is not a subnormal.
    const s = significand_significand(a);
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const l = get_max_set_bit_getHighestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}

//# sourceMappingURL=get-max-set-bit.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/exponent.js

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent_exponent(a) {
    return parse_double_parseDouble(a).exponent;
}

//# sourceMappingURL=exponent.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/is-bit-aligned.js


/**
 * Returns true if the given number is bit-aligned in the sense that its a
 * multiple of a given power of 2, say e, and such that the number, say a,
 * conforms to: a/2^e < 2^(l-e), where l is the max allowed bit length.
 * This essentially means the numbers act somewhat like fixed-point numbers
 * which can drastically speed up some geometric algorithms and also reduce
 * their complexity.
 *
 * Visually:
 * These numbers (a,b and c) are grid aligned with e === 3 and max
 * bitlength === 6:
 *   a -> 00|101100|000
 *   b -> 00|000100|000
 *   c -> 00|110111|000
 * These are not
 *   a -> 01|101100|000
 *   b -> 00|000100|000
 * These are not
 *   a -> 00|101100|000
 *   b -> 00|000100|100
 * These are not
 *   a -> 00|101100|100
 *   b -> 00|000100|100
 * @param as An array of numbers to check
 * @param maxBitLength The max allowed bitlength
 * @param gridSpacingExponent The grid spacing === 1^gridSpacingExponent
 */
function isBitAligned(a, maxBitLength, gridSpacingExponent) {
    if (a === 0) {
        return true;
    }
    const e = exponent_exponent(a);
    const maxSetBit = get_max_set_bit_getHighestSetBit(a) - 52 + e;
    const minSetBit = get_max_set_bit_getLowestSetBit(a) - 52 + e;
    const minBitBigEnough = minSetBit >= gridSpacingExponent;
    const maxBitSmallEnough = maxSetBit <= maxBitLength - 1 + gridSpacingExponent;
    return minBitBigEnough && maxBitSmallEnough;
}

//# sourceMappingURL=is-bit-aligned.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/msb-exponent.js


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent_exponent(a);
    // Will return e for all but subnormal numbers
    return get_max_set_bit_getHighestSetBit(a) - 52 + e;
}

//# sourceMappingURL=msb-exponent.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/lsb-exponent.js


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent_exponent(a);
    return get_max_set_bit_getLowestSetBit(a) - 52 + e;
}

//# sourceMappingURL=lsb-exponent.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-representation/bit-length.js

/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a a double precision floating point number
 */
function bit_length_bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return get_max_set_bit_getHighestSetBit(a) - get_max_set_bit_getLowestSetBit(a) + 1;
}

//# sourceMappingURL=bit-length.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-double-with-error/dd-div-dd-with-error.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
/** @internal */
const div = ddDivDd;
/** @internal */
const dd_div_dd_with_error_eps = Number.EPSILON;
/** @internal */
const u = dd_div_dd_with_error_eps / 2;
/** @internal */
const uu = u * u;
/**
 * Returns the result of dividing two double-double-precision floating point
 * numbers together with an absolute error bound where nE and dE are absolute
 * error bounds on the *input* values.
 *
 * @param numer numerator - a double-double-precision float
 * @param denom denominator - a double-double-precision float
 * @param nE absolute value error bound in numerator
 * @param dE absolute value error bound in denominator
 */
function ddDivDdWithError(numer, denom, nE, dE) {
    const n = numer[0];
    const N = numer[1];
    const d = denom[0];
    const D = denom[1];
    // estimate the result of the division
    const est = div(numer, denom);
    const _n = Math.abs(n + N); // absolute value of estimate of n accurate to within 1/2 ulp
    const _d = Math.abs(d + D); // absolute value of estimate of d accurate to within 1/2 ulp
    const δd = u * _d; // the max error in the rounding to _d
    // if the error in the denominator is too high the error can be 
    // arbitrarily high
    const minD = _d - δd - dE;
    // maxErr is only valid if minD > 0
    if (minD <= 0) {
        // the error can be arbitrarily high; est is mostly irrelevant
        return { est, err: Number.POSITIVE_INFINITY };
    }
    const err = ((_d * nE + _n * dE) / minD ** 2) + 9 * uu * Math.abs(_n / _d);
    return { est, err };
}

//# sourceMappingURL=dd-div-dd-with-error.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/double-with-err/div-with-err.js
/** @internal */
const div_with_err_u = Number.EPSILON / 2;
/**
 * Returns the result of dividing two double floating point numbers
 * together with an absolute error bound where nE and dE are absolute error
 * bounds on the input values.
 * @param n numerator
 * @param d denominator
 * @param nE absolute value error bound in numerator
 * @param dE absolute value error bound in denominator
 */
function divWithErr(n, d, nE, dE) {
    // estimate the result of the division
    const est = n / d;
    const _n = Math.abs(n);
    const _d = Math.abs(d);
    // if the error in the denominator is too high the error can be 
    // arbitrarily high
    const minD = _d - dE;
    // maxErr is only valid if minD > 0
    if (minD <= 0) {
        // the error can be arbitrarily high; est is mostly irrelevant
        return { est, err: Number.POSITIVE_INFINITY };
    }
    const err = ((_d * nE + _n * dE) / minD ** 2) + div_with_err_u * Math.abs(_n / _d);
    return { est, err };
}

//# sourceMappingURL=div-with-err.js.map
;// CONCATENATED MODULE: ./node_modules/double-double/node/index.js











































const node_ddMultDouble2 = ddMultDouble2;
const node_parseDoubleDetailed = parse_double_parseDoubleDetailed;
const node_getLowestSetBit = get_max_set_bit_getLowestSetBit;
const node_ddMin = ddMin;
const node_ddMax = ddMax;
const node_ddSqrt = ddSqrt;
const node_doubleSqrt = doubleSqrt;
const node_sqrtWithErr = sqrtWithErr;
const node_ddAbs = ddAbs;
const node_ddAddDouble = ddAddDouble;
const node_ddAddDd = ddAddDd;
const node_ddProduct = ddProduct;
const node_ddSum = ddSum;
const node_ddCompare = ddCompare;
const node_ddDiffDd = ddDiffDd;
const node_ddMultDouble1 = ddMultDouble1;
const node_ddMultBy2 = ddMultBy2;
const node_ddMultBy4 = ddMultBy4;
const node_ddDivBy2 = ddDivBy2;
const node_ddMultByNeg2 = ddMultByNeg2;
const node_ddMultByNeg4 = ddMultByNeg4;
const node_ddMultDd = ddMultDd;
const node_ddDivDouble = ddDivDouble;
const node_ddDivDd = ddDivDd;
const node_ddNegativeOf = ddNegativeOf;
const node_ddSign = ddSign;
const node_fastTwoDiff = fastTwoDiff;
const node_fastTwoSum = fast_two_sum_fastTwoSum;
const node_split = split;
const node_twoDiff = twoDiff;
const node_twoProduct = basic_two_product_twoProduct;
const node_doubleDivDouble = doubleDivDouble;
const node_twoSum = basic_two_sum_twoSum;
const node_reduceSignificand = reduceSignificand;
const node_parseDouble = parse_double_parseDouble;
const node_isBitAligned = isBitAligned;
const node_msbExponent = msbExponent;
const node_lsbExponent = lsbExponent;
const node_bitLength = bit_length_bitLength;
const node_exponent = exponent_exponent;
const node_significand = significand_significand;
const node_doubleToBinaryString = double_to_binary_string_doubleToBinaryString;
const node_doubleToOctets = double_to_octets_doubleToOctets;
const node_getHighestSetBit = get_max_set_bit_getHighestSetBit;
const node_ddDivDdWithError = ddDivDdWithError;
const node_divWithErr = divWithErr;
const operators = {
    //---- basic ----//
    fastTwoDiff: node_fastTwoDiff,
    fastTwoSum: node_fastTwoSum,
    split: node_split,
    twoDiff: node_twoDiff,
    twoProduct: node_twoProduct,
    doubleDivDouble: node_doubleDivDouble,
    twoSum: node_twoSum,
    reduceSignificand: node_reduceSignificand,
    //---- double-double precision ----//
    doubleSqrt: node_doubleSqrt,
    ddSqrt: node_ddSqrt,
    ddAbs: node_ddAbs,
    ddAddDouble: node_ddAddDouble,
    ddAddDd: node_ddAddDd,
    ddProduct: node_ddProduct,
    ddSum: node_ddSum,
    ddCompare: node_ddCompare,
    ddDiffDd: node_ddDiffDd,
    ddMultDouble1: node_ddMultDouble1,
    ddMultDouble2: node_ddMultDouble2,
    ddMultDd: node_ddMultDd,
    ddDivDouble: node_ddDivDouble,
    ddDivDd: node_ddDivDd,
    ddNegativeOf: node_ddNegativeOf,
    ddSign: node_ddSign,
    ddMultBy2: node_ddMultBy2,
    ddMultBy4: node_ddMultBy4,
    ddDivBy2: node_ddDivBy2,
    ddMultByNeg2: node_ddMultByNeg2,
    ddMultByNeg4: node_ddMultByNeg4,
    ddMin: node_ddMin,
    ddMax: node_ddMax,
    //---- double-double precision error propagation - with error bound on input parameters
    ddDivDdWithError: node_ddDivDdWithError,
    //---- double precision error propagation - with error bound on input parameters
    divWithErr: node_divWithErr,
    sqrtWithErr: node_sqrtWithErr,
    //---- double floating point representation ----//
    parseDouble: node_parseDouble,
    parseDoubleDetailed: node_parseDoubleDetailed,
    isBitAligned: node_isBitAligned,
    msbExponent: node_msbExponent,
    lsbExponent: node_lsbExponent,
    bitLength: node_bitLength,
    doubleToBinaryString: node_doubleToBinaryString,
    doubleToOctets: node_doubleToOctets,
    getHighestSetBit: node_getHighestSetBit,
    getLowestSetBit: node_getLowestSetBit,
    exponent: node_exponent,
    significand: node_significand
};


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/calculus/double-double/dd-differentiate.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const dd_differentiate_ddMultDouble2 = node_ddMultDouble2;
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
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(dd_differentiate_ddMultDouble2((d - i), p[i]));
    }
    return result;
}


;// CONCATENATED MODULE: ./src/error-analysis/gamma.ts
const gamma_u = Number.EPSILON / 2;
const gamma_uu = gamma_u * gamma_u;
/**
 * The canonical floating point error function, γ.
 *
 * * roughly `=== n * (Number.EPSILON / 2)`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this === 2*d + 1, where d is the degree of the
 * polynomial
 *
 * @doc
 */
function γ(n) {
    const nu = n * gamma_u;
    return nu / (1 - nu);
}
/**
 * The canonical, once compensated (implying double-double precision),
 * floating point error function.
 *
 * * roughly `=== n * (Number.EPSILON / 2)**2`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this === 2*d + 1, where d is the degree of the
 * polynomial
 *
 * @doc
 */
function γγ(n) {
    const nuu = n * gamma_uu;
    return nuu / (1 - nuu);
}


;// CONCATENATED MODULE: ./src/calculus/double-double/dd-differentiate-with-err.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const dd_differentiate_with_err_ddMultDouble2 = node_ddMultDouble2;
const dd_differentiate_with_err_eEstimate = eEstimate;
const γγ3 = γγ(3);
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
    const dp = [];
    const dpE = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        const deg = d - i;
        const c = dd_differentiate_with_err_ddMultDouble2(deg, p[i]);
        dp.push(c);
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        const extraErr = (deg & deg - 1) === 0 ? 0 : γγ3;
        const $c = dd_differentiate_with_err_eEstimate(c);
        dpE.push(
        //deg * (pE[i] + Math.abs($c)*extraErr)
        deg * pE[i] + Math.abs($c) * extraErr);
    }
    return { p: dp, pE: dpE };
}


;// CONCATENATED MODULE: ./src/calculus/double-double/dd-integrate.ts

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
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d + 1; i++) {
        result.push(node_ddDivDouble(p[i], (d + 1 - i)));
    }
    result.push(c);
    return result;
}


;// CONCATENATED MODULE: ./src/calculus/expansion/e-differentiate.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_differentiate_scaleExpansion = scaleExpansion;
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
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(e_differentiate_scaleExpansion(p[i], d - i));
    }
    return result;
}


;// CONCATENATED MODULE: ./src/change-variables/bigint/b-change-variables-linear.ts
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
    // We let the coefficients of p(ax + b) be denoted by d_i in the 
    // code below. 
    // d_i is calculated as d = T*c, where c are the original 
    // coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0n));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1n;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + a * t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0n);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0n;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/bigint/b-change-variables-scale.ts
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 *
 * @example
 * ```typescript
 * bChangeVariablesScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
 * ```
 *
 * @doc
 */
function bChangeVariablesScale(p, a) {
    // We let the coefficients of `p(ax)` be denoted by `d_i` in the code below. 
    // `d_i` is calculated as `d = T*c`, where `c` is the original coefficient
    // vector.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0n));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1n;
    for (let j = 1; j <= d; j++) {
        t[0][j] = 0n;
        for (let i = 1; i <= j; i++) {
            t[i][j] = a * t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0n);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0n;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/bigint/b-change-variables-translate-x.ts
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(x + b).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @example
 * ```typescript
 * bChangeVariablesTranslateX([1n,2n,7n], 3n); //=> [1n, 8n, 22n]
 * ```
 *
 * @doc
 */
function bChangeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0n));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1n;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0n);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0n;
        for (let j = i; j <= d; j++) {
            const acc = t[i][j] * p[d - j];
            res[d - i] += acc;
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/bigint/b-reflect-about-y-axis.ts
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
        if (i % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/change-variables/double/change-variables-linear.ts
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
    // We let the coefficients of p(ax + b) be denoted by d_i in the 
    // code below. 
    // d_i is calculated as d = T*c, where c are the original 
    // coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + a * t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/double/change-variables-scale.ts
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(ax) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
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
function changeVariablesScale(p, a) {
    // We let the coefficients of `p(ax)` be denoted by `d_i` in the code below. 
    // `d_i` is calculated as `d = T*c`, where `c` is the original coefficient
    // vector.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1;
    for (let j = 1; j <= d; j++) {
        t[0][j] = 0;
        for (let i = 1; i <= j; i++) {
            t[i][j] = a * t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/double/change-variables-translate-x.ts
/**
 * Returns the result of performing a change of variables of the
 * form: p(x) <- p(x + b) in double precision.
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @example
 * ```typescript
 * changeVariablesTranslateX([1,2,7], 3); //=> [1, 8, 22]
 * ```
 *
 * @doc
 */
function changeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + t[i - 1][j - 1];
        }
    }
    // Multiply
    const res = new Array(d + 1).fill(0);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0;
        for (let j = i; j <= d; j++) {
            res[d - i] += t[i][j] * p[d - j];
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/double/reflect-about-y-axis.ts
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
        if (i % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/change-variables/expansion/e-change-variables-linear.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_change_variables_linear_expansionProduct = expansionProduct;
const e_change_variables_linear_fastExpansionSum = fastExpansionSum;
const e_change_variables_linear_scaleExpansion2 = scaleExpansion2;
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
    // We let the coefficients of p(ax + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill([0]));
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = e_change_variables_linear_scaleExpansion2(b, t[0][j - 1]);
        for (let i = 1; i <= j; i++) {
            t[i][j] = e_change_variables_linear_fastExpansionSum(e_change_variables_linear_scaleExpansion2(b, t[i][j - 1]), e_change_variables_linear_scaleExpansion2(a, t[i - 1][j - 1]));
        }
    }
    // Multiply
    const res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            const acc = e_change_variables_linear_expansionProduct(t[i][j], p[d - j]);
            res[d - i] = e_change_variables_linear_fastExpansionSum(res[d - i], acc);
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/expansion/e-change-variables-scale.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_change_variables_scale_expansionProduct = expansionProduct;
const e_change_variables_scale_fastExpansionSum = fastExpansionSum;
const e_change_variables_scale_scaleExpansion2 = scaleExpansion2;
/**
 * Returns the exact result (bar underflow / overflow) of performing a change
 * of variables of the form: p(x) <- p(ax).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 *
 * @example
 * ```typescript
 * eChangeVariablesScale([[1],[2],[7]], 3); //=> [[9], [6], [7]]
 * ```
 *
 * @doc
 */
function eChangeVariablesScale(p, a) {
    // We let the coefficients of `p(ax)` be denoted by `d_i` in the code below. 
    // `d_i` is calculated as `d = T*c`, where `c` is the original coefficient
    // vector.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill([0]));
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = [0];
        for (let i = 1; i <= j; i++) {
            t[i][j] = e_change_variables_scale_scaleExpansion2(a, t[i - 1][j - 1]);
        }
    }
    // Multiply
    const res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            res[d - i] = e_change_variables_scale_fastExpansionSum(res[d - i], e_change_variables_scale_expansionProduct(t[i][j], p[d - j]));
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/expansion/e-change-variables-translate-x.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_change_variables_translate_x_expansionProduct = expansionProduct;
const e_change_variables_translate_x_fastExpansionSum = fastExpansionSum;
const e_change_variables_translate_x_scaleExpansion2 = scaleExpansion2;
/**
 * Returns the exact result (bar undeflow / overflow) of performing a change of
 * variables of the form: p(x) <- p(x + b) on the given polynomial (with
 * coefficients given as Shewchuk expansions).
 *
 * * see [this stackoverflow question](http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system)
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param b the `b` in `x + b`
 *
 * @doc
 */
function eChangeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    // Initialize a zero matrix
    const t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill([0]));
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = e_change_variables_translate_x_scaleExpansion2(b, t[0][j - 1]);
        for (let i = 1; i <= j; i++) {
            t[i][j] = e_change_variables_translate_x_fastExpansionSum(e_change_variables_translate_x_scaleExpansion2(b, t[i][j - 1]), t[i - 1][j - 1]);
        }
    }
    // Multiply
    const res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            const acc = e_change_variables_translate_x_expansionProduct(t[i][j], p[d - j]);
            res[d - i] = e_change_variables_translate_x_fastExpansionSum(res[d - i], acc);
        }
    }
    return res;
}


;// CONCATENATED MODULE: ./src/change-variables/expansion/e-reflect-about-y-axis.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_reflect_about_y_axis_eNegativeOf = eNegativeOf;
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
        if (i % 2) {
            result[i] = e_reflect_about_y_axis_eNegativeOf(result[i]);
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/evaluate/double/vec-sum.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const vec_sum_twoSum = two_sum_twoSum;
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
        [p[i - 1], p[i]] = vec_sum_twoSum(p[i], p[i - 1]);
    }
    return p;
}


;// CONCATENATED MODULE: ./src/evaluate/double/sum-k.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sum_k_vecSum = vecSum;
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
        p = sum_k_vecSum(p);
    }
    let res = p[0];
    for (let i = 1; i < p.length; i++) {
        res += p[i];
    }
    return res;
}


;// CONCATENATED MODULE: ./src/evaluate/double/eft-horner.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eft_horner_twoSum = two_sum_twoSum;
const eft_horner_twoProduct = two_product_twoProduct;
/**
 * Returns an EFT (error free transformation) for the Horner evaluation of a
 * polymial at a specified x. The result is returned as an object with
 * properties: r̂ -> the calculated evaluation, pπ and pσ -> two polynomials
 * with coefficients around 2^53 times smaller than the input polynomial.
 *
 * * r̂ + pπ(x) + pσ(x) = the *exact* evaluation (no error)
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
function EFTHorner(p, x) {
    const pπ = []; // A polynomial containing part of the error
    const pσ = []; // Another polynomial containing part of the error
    let σ;
    let r̂ = p[0];
    for (let i = 1; i < p.length; i++) {
        const [π, pi] = eft_horner_twoProduct(r̂, x);
        [σ, r̂] = eft_horner_twoSum(pi, p[i]);
        // inlined
        //r̂ = pi + p[i]; const bv = r̂ - pi; σ = (pi - (x-bv)) + (p[i]-bv);
        pπ.push(π);
        pσ.push(σ);
    }
    return { r̂, pπ, pσ };
}
// inlined
//const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];	for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); } return { r̂, pπ, pσ }


;// CONCATENATED MODULE: ./src/evaluate/double/eft-horner-k.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eft_horner_k_EFTHorner = EFTHorner;
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
        const { r̂, pπ, pσ } = eft_horner_k_EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    return { hs, ps: ps.slice(2 ** (K - 1)) };
}


;// CONCATENATED MODULE: ./src/evaluate/double/horner.ts
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method in double precision floating point arithmetic.
 *
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
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


;// CONCATENATED MODULE: ./src/evaluate/double/comp-horner-k.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const comp_horner_k_SumK = SumK;
const comp_horner_k_EFTHornerK = EFTHornerK;
const comp_horner_k_Horner = Horner;
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
    const { hs, ps } = comp_horner_k_EFTHornerK(p, x, K);
    const leafStart = 2 ** (K - 1); // cardinality and start of the leaves
    for (let i = 0; i < leafStart; i++) {
        hs.push(comp_horner_k_Horner(ps[leafStart + i], x));
    }
    const r̄ = comp_horner_k_SumK(hs, K);
    return r̄;
}


;// CONCATENATED MODULE: ./src/error-analysis/condition-number.ts


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


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-elevate-degree.ts
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-pdiv-internal.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_pdiv_internal_bDegree = bDegree;
const b_pdiv_internal_bElevateDegree = bElevateDegree;
const b_pdiv_internal_bAdd = bAdd;
const b_pdiv_internal_bMultiply = bMultiply;
const b_pdiv_internal_bSubtract = bSubtract;
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
 * [[scaleFloatssToBigintss]] before calling this function (recall that all floating
 * point numbers are rational).
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 *
 * @internal
 */
function bPdivInternal(a, b) {
    let q = [];
    const d = b_pdiv_internal_bDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = b_pdiv_internal_bDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        const s = b_pdiv_internal_bElevateDegree([r[0] / c], deg);
        q = b_pdiv_internal_bAdd(q, s);
        r = b_pdiv_internal_bSubtract(r, b_pdiv_internal_bMultiply(s, b));
    }
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-pdiv-trivial.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_pdiv_trivial_bDegree = bDegree;
const b_pdiv_trivial_bMultiplyByConst = bMultiplyByConst;
const b_pdiv_trivial_bPdivInternal = bPdivInternal;
const abs = (n) => n >= 0 ? n : -n;
/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder`
 * of the pseudo division of `a/b` (a, b both being polynomials) in such a way
 * that all intermediate calculations and the final result are done in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 *
 * * **precondition:** the coefficients must be bigints; if they are not they
 * can easily be scaled from floating point numbers to bigints by calling
 * [[scaleFloatsToBigints]] or similar before calling this function (recall that
 * all floating point numbers are rational).
 *
 * * **precondition:** b !== [0], i.e. unequal to the zero polynomial.
 *
 * * see [trivial pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 * * see also [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier defaults to false - if set to true then the
 * multiplier (of the coefficients of the dividend)
 * `leadingCoeff(b)^(deg(a)-deg(b)+1)` will be
 * modified to `abs(leadingCoeff(b)^(deg(a)-deg(b)+1))`
 *
 * @doc
 */
function bPdivTrivial(a, b, positiveMultiplier = false) {
    const d = b_pdiv_trivial_bDegree(a) - b_pdiv_trivial_bDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a };
    }
    let m = b[0] ** BigInt(d);
    m = positiveMultiplier
        ? abs(m)
        : m;
    const a_ = b_pdiv_trivial_bMultiplyByConst(m, a);
    return b_pdiv_trivial_bPdivInternal(a_, b);
}


;// CONCATENATED MODULE: ./src/factor/bigint/b-content.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_content_bGcdInts = bGcdInts;
// for some reason the tests fails if not done like below likely because Node
// and TypeScript and BigInt doesn't work perfectly together yet
const b1 = 1n;
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
        return b1;
    }
    return p[0] < 0n ? -b_content_bGcdInts(p) : b_content_bGcdInts(p);
}


;// CONCATENATED MODULE: ./src/factor/bigint/b-primitive-part.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_primitive_part_bContent = bContent;
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
    const c = b_primitive_part_bContent(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-prem-sequence-primitive.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_prem_sequence_primitive_bPdivTrivial = bPdivTrivial;
const bGetPrimitivePart = bPrimitivePart;
/**
 * Returns the primitive pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
* * see [Primitive Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Primitive_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
function bPremSequencePrimitive(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        let r_ = b_prem_sequence_primitive_bPdivTrivial(r[i - 1], r[i]).r;
        r_ = bGetPrimitivePart(r_);
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-prem-sequence-subresultant.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_prem_sequence_subresultant_bDegree = bDegree;
const b_prem_sequence_subresultant_bPdivTrivial = bPdivTrivial;
/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
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
    const d = [b_prem_sequence_subresultant_bDegree(f), b_prem_sequence_subresultant_bDegree(g)];
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
        let r_ = b_prem_sequence_subresultant_bPdivTrivial(r[i - 1], r[i], sturm).r
            .map(coeff => coeff / D);
        r_ = sgn > 0 ? r_ : r_.map(c => -c);
        d.push(b_prem_sequence_subresultant_bDegree(r_));
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-prem-sequence-trivial.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_prem_sequence_trivial_bPdivTrivial = bPdivTrivial;
/**
 * ❗ DON'T USE - coefficients grow way too big, making it slow - use
 * [[bPremSequenceSubresultant]] instead. ❗
 *
 * Returns the trivial pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
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
        const r_ = b_prem_sequence_trivial_bPdivTrivial(r[i - 1], r[i]).r;
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/bigint/b-sturm-chain.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_sturm_chain_bDifferentiate = bDifferentiate;
const b_sturm_chain_bPremSequenceSubresultant = bPremSequenceSubresultant;
/**
 * Returns the Sturm Chain for the given polynomial using pseudo remainders.
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
    const dp = b_sturm_chain_bDifferentiate(p);
    return b_sturm_chain_bPremSequenceSubresultant(p, dp, true);
}


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-product.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const e_product_tp = two_product_twoProduct;
const e_product_multByDouble = scaleExpansion;
const e_product_compress = e_compress_eCompress;
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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-int-pow.js


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
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/msb-exponent.js


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msb_exponent_msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    // Will return e for all but subnormal numbers
    return getHighestSetBit(a) - 52 + e;
}

//# sourceMappingURL=msb-exponent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/reduce-significand.js
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
function reduce_significand_reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}

//# sourceMappingURL=reduce-significand.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_bitlength_sign = e_sign_eSign;
const e_to_bitlength_compress = e_compress_eCompress;
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
    const maxMsb = msb_exponent_msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        const msb_ = msb_exponent_msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    const keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduce_significand_reduceSignificand(b, keepBits);
    const result = a.slice(i);
    result[0] = b;
    return result;
}

//# sourceMappingURL=e-to-bitlength.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-div.js





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_div_mult = expansionProduct;
const toBitlength = eToBitlength;
const e_div_bitLength = expBitLength;
const e_div_diff = eDiff;
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
        F = e_div_diff([2], D_);
        i *= 2;
    }
}

//# sourceMappingURL=e-div.js.map
;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-elevate-degree.ts
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-pdiv-internal.ts






// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_pdiv_internal_eDiv = eDiv;
const e_pdiv_internal_eDegree = eDegree;
const e_pdiv_internal_eElevateDegree = eElevateDegree;
const e_pdiv_internal_eAdd = eAdd;
const e_pdiv_internal_eMultiply = eMultiply;
const subtractExact = eSubtract;
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
    const d = e_pdiv_internal_eDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = e_pdiv_internal_eDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        let s = [e_pdiv_internal_eDiv(r[0], c, 0)];
        s = e_pdiv_internal_eElevateDegree(s, deg);
        q = e_pdiv_internal_eAdd(q, s);
        r = subtractExact(r, e_pdiv_internal_eMultiply(s, b));
    }
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-pdiv-trivial.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_pdiv_trivial_eDegree = eDegree;
const e_pdiv_trivial_eAbs = eAbs;
const e_pdiv_trivial_eIntPow = eIntPow;
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
    const d = e_pdiv_trivial_eDegree(a) - e_pdiv_trivial_eDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a };
    }
    let m = e_pdiv_trivial_eIntPow(b[0], d);
    m = positiveMultiplier
        ? e_pdiv_trivial_eAbs(m)
        : m;
    const a_ = eMultiplyByConst(m, a);
    return ePdivInternal(a_, b);
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-prem-sequence-subresultant.ts







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_prem_sequence_subresultant_ePdivTrivial = ePdivTrivial;
const e_prem_sequence_subresultant_eIsConstOrZero = eIsConstOrZero;
const e_prem_sequence_subresultant_expansionProduct = expansionProduct;
const e_prem_sequence_subresultant_eIntPow = eIntPow;
const e_prem_sequence_subresultant_eDiv = eDiv;
const e_prem_sequence_subresultant_eNegativeOf = eNegativeOf;
const e_prem_sequence_subresultant_eDegree = eDegree;
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
    const d = [e_prem_sequence_subresultant_eDegree(f), e_prem_sequence_subresultant_eDegree(g)];
    const a = [[1]]; // a_1 === 1
    const c = [[1]]; // c_1 === 1
    let i = 2;
    while (true) {
        a.push(r[i - 1][0]); // leading coefficient of r[i-1]
        const d_ = d[i - 2] - d[i - 1];
        const sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        const D = e_prem_sequence_subresultant_expansionProduct(a[i - 2], e_prem_sequence_subresultant_eIntPow(c[i - 2], d_));
        const exp = -d_ + 1;
        const cTerm1 = e_prem_sequence_subresultant_eIntPow(a[i - 1], d_);
        const cTerm2 = e_prem_sequence_subresultant_eIntPow(c[i - 2], Math.abs(exp));
        c.push(exp < 0
            ? e_prem_sequence_subresultant_eDiv(cTerm1, cTerm2, 0)
            : e_prem_sequence_subresultant_expansionProduct(cTerm1, cTerm2));
        let r_ = e_prem_sequence_subresultant_ePdivTrivial(r[i - 2], r[i - 1], sturm).r
            .map(coeff => e_prem_sequence_subresultant_eDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(e_prem_sequence_subresultant_eNegativeOf);
        d.push(e_prem_sequence_subresultant_eDegree(r_));
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (e_prem_sequence_subresultant_eIsConstOrZero(r_)) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/double/prem-sequence-subresultant.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const prem_sequence_subresultant_ePremSequenceSubresultant = ePremSequenceSubresultant;
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
    return prem_sequence_subresultant_ePremSequenceSubresultant(f.map(c => [c]), g.map(c => [c]), sturm);
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/double/sturm-chain.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sturm_chain_eDifferentiate = eDifferentiate;
const sturm_chain_ePremSequenceSubresultant = ePremSequenceSubresultant;
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
    const dp = sturm_chain_eDifferentiate(p_);
    return sturm_chain_ePremSequenceSubresultant(p_, dp, true);
}


;// CONCATENATED MODULE: ./src/factor/expansion/e-content.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_content_eGcdInts = eGcdInts;
const e_content_eSign = e_sign_eSign;
const e_content_eNegativeOf = eNegativeOf;
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
    return e_content_eSign(p[0]) < 0 ? e_content_eNegativeOf(e_content_eGcdInts(p)) : e_content_eGcdInts(p);
}


;// CONCATENATED MODULE: ./src/factor/expansion/e-primitive-part.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_primitive_part_eContent = eContent;
const e_primitive_part_eDiv = eDiv;
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
    const c = e_primitive_part_eContent(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(e_primitive_part_eDiv(p[i], c, 0));
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-prem-sequence-primitive.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_prem_sequence_primitive_ePdivTrivial = ePdivTrivial;
const eGetPrimitivePart = ePrimitivePart;
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
        let r_ = e_prem_sequence_primitive_ePdivTrivial(r[i - 1], r[i]).r;
        r_ = eGetPrimitivePart(r_);
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


;// CONCATENATED MODULE: ./src/euclidean-division-related/expansion/e-sturm-chain.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_sturm_chain_eDifferentiate = eDifferentiate;
const e_sturm_chain_ePremSequenceSubresultant = ePremSequenceSubresultant;
const e_sturm_chain_scaleFloatssToIntss = scaleFloatssToIntss;
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
    p = e_sturm_chain_scaleFloatssToIntss(p);
    const dp = e_sturm_chain_eDifferentiate(p);
    return e_sturm_chain_ePremSequenceSubresultant(p, dp, true);
}


;// CONCATENATED MODULE: ./src/evaluate/bigint/b-horner.ts
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


;// CONCATENATED MODULE: ./src/evaluate/bigint/b-evaluate-at-0.ts
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


;// CONCATENATED MODULE: ./src/evaluate/bigint/b-evaluate-at-1.ts
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


;// CONCATENATED MODULE: ./src/evaluate/double/abs-horner.ts
const abs_horner_abs = Math.abs;
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method and where the absolute value of each coefficient is taken.
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
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * x + abs_horner_abs(p[i]);
    }
    return q;
}
// inlined (with q => e2, p => p0)
//let e2 = abs(p0[0]); for (let i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }


;// CONCATENATED MODULE: ./src/evaluate/double/horner-sum.ts
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


;// CONCATENATED MODULE: ./src/evaluate/double/comp-horner.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const comp_horner_EFTHorner = EFTHorner;
const comp_horner_HornerSum = HornerSum;
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
    const { r̂, pπ, pσ } = comp_horner_EFTHorner(p, x);
    const ĉ = comp_horner_HornerSum(pπ, pσ, x);
    return r̂ + ĉ;
}


;// CONCATENATED MODULE: ./src/evaluate/double/horner-abs-sum.ts
/**
 * @param p1
 * @param p2
 *
 * @internal
 */
function HornerAbsSum(p1, p2, x) {
    let q = 0;
    for (let i = 0; i < p1.length; i++) {
        // TODO - Math.abs(p1[i] + p2[i]) <-- should this be Math.abs(p1[i]) + Math.abs(p2[i]) ??
        q = Math.abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}


;// CONCATENATED MODULE: ./src/evaluate/double/gammas.ts
const gammas_u = Number.EPSILON / 2;
// cache standard error bound units
const _γs = [];
/** @internal */
function γs(n) {
    return _γs[n] || ((1 + gammas_u) * (n * gammas_u / (1 - n * gammas_u)));
}


;// CONCATENATED MODULE: ./src/evaluate/double/comp-horner-is-faithful.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const comp_horner_is_faithful_twoSum = two_sum_twoSum;
const comp_horner_is_faithful_HornerSum = HornerSum;
const comp_horner_is_faithful_EFTHorner = EFTHorner;
const comp_horner_is_faithful_HornerAbsSum = HornerAbsSum;
const comp_horner_is_faithful_s = γs;
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
    const { r̂, pπ, pσ } = comp_horner_is_faithful_EFTHorner(p, x);
    const ĉ = comp_horner_is_faithful_HornerSum(pπ, pσ, x);
    const [e, r̄] = comp_horner_is_faithful_twoSum(r̂, ĉ);
    const b̂ = comp_horner_is_faithful_HornerAbsSum(pπ, pσ, Math.abs(x));
    const α̂ = (comp_horner_is_faithful_s(2 * n - 1) * b̂) / ((1 - 2 * (n + 1) * comp_horner_is_faithful_u));
    const β̂ = (α̂ + Math.abs(e)) / (1 - 2 * comp_horner_is_faithful_u);
    return {
        isFaithful: α̂ < (comp_horner_is_faithful_u / 2) * Math.abs(r̄),
        errBound: β̂,
        r̄
    };
}


;// CONCATENATED MODULE: ./src/evaluate/double/comp-horner-with-running-error.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const comp_horner_with_running_error_twoSum = two_sum_twoSum;
const comp_horner_with_running_error_EFTHorner = EFTHorner;
const comp_horner_with_running_error_HornerSum = HornerSum;
const comp_horner_with_running_error_HornerAbsSum = HornerAbsSum;
const comp_horner_with_running_error_s = γs;
const comp_horner_with_running_error_u = Number.EPSILON / 2;
/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound as an array in the
 * form: [result, absolute error].
 *
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
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
function compHornerWithRunningError(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = comp_horner_with_running_error_EFTHorner(p, x);
    // inlined
    //const pπ: number[] = []; const pσ: number[] = []; const σ: number; const r̂ = p[0];	for (const i=1; i<p.length; i++) { const [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
    const ĉ = comp_horner_with_running_error_HornerSum(pπ, pσ, x);
    const [e, r̄] = comp_horner_with_running_error_twoSum(r̂, ĉ);
    const b̂ = comp_horner_with_running_error_HornerAbsSum(pπ, pσ, Math.abs(x));
    const α̂ = (comp_horner_with_running_error_s(2 * n - 1) * b̂) / ((1 - 2 * (n + 1) * comp_horner_with_running_error_u));
    const β̂ = (α̂ + Math.abs(e)) / (1 - 2 * comp_horner_with_running_error_u);
    return [r̄, β̂];
}


;// CONCATENATED MODULE: ./src/evaluate/double/horner-with-running-error.ts
const horner_with_running_error_abs = Math.abs;
const horner_with_running_error_u = Number.EPSILON / 2;
/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound as an array in the form `[r,e]` where `r` is the result
 * of the evaluation and `e` is the error.
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
    let r̂ = p[0];
    let e = horner_with_running_error_abs(r̂) * 0.5;
    for (let i = 1; i < p.length; i++) {
        r̂ = r̂ * x + p[i];
        e = e * horner_with_running_error_abs(x) + horner_with_running_error_abs(r̂);
    }
    e = horner_with_running_error_u * (2 * e - horner_with_running_error_abs(r̂));
    return [r̂, e];
}
// inlined (where r̂ => r, e => e1, p => p0)
//let r = p0[0]; let e1 = Math.abs(r) / 2; for (let i=1; i<p0.length; i++) { r = r*x + p0[i]; e1 = Math.abs(x)*e1 + Math.abs(r); } e1 = Number.EPSILON * (2*e1 - Math.abs(r));


;// CONCATENATED MODULE: ./src/evaluate/double/eval-certified.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eval_certified_ = γ;
const eval_certified_EFTHorner = EFTHorner;
const eval_certified_hornerWithRunningError = hornerWithRunningError;
const eval_certified_Horner = Horner;
const eval_certified_AbsHorner = AbsHorner;
const γ1 = eval_certified_(1);
const γ2 = eval_certified_(2);
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
    const absX = Math.abs(x);
    const p0 = p[0];
    // first do a fast evaluation
    const [r, e1] = eval_certified_hornerWithRunningError(p0, x);
    // inlined above line:
    //const r = p0[0]; const e1 = Math.abs(r) / 2; for (const i=1; i<p0.length; i++) { r = r*x + p0[i]; e1 = Math.abs(x)*e1 + Math.abs(r); } e1 = Number.EPSILON * (2*e1 - Math.abs(r));
    /** the error due to not considering p[1] */
    // the line below was changed due to negative values of x now also allowed
    const e2 = γ2 * eval_certified_AbsHorner(p0, absX);
    // inlined above line:
    //const e2 = abs(p0[0]); for (const i=1; i<p0.length; i++) { e2 = e2*x + abs(p0[i]); }
    /** error due to imprecision in coefficients */
    // the line below was changed due to negative values of x now also allowed
    const E = pE !== undefined ? eval_certified_Horner(pE, absX) : 0;
    //const E = p0[0]; for (const i=1; i<p0.length; i++) {E = E*x + p0[i]; }
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < Math.abs(r)) {
        // we are within bounds
        return r;
    }
    // error is too large - do a more precise evaluation (i.e. once compensated
    // with K === 2)
    const EFTHorner_ = eval_certified_EFTHorner(p0, x);
    const { pπ, pσ } = EFTHorner_;
    let { r̂ } = EFTHorner_;
    const [C1, c1] = eval_certified_hornerWithRunningError(pπ, x);
    const [C2, c2] = eval_certified_hornerWithRunningError(pσ, x);
    const [C3, c3] = eval_certified_hornerWithRunningError(p[1], x);
    // typically: c1,c2 < c3 < E
    let e = (c1 + c2 + c3) + E;
    // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    r̂ = (C1 + C2 + C3) + r̂;
    e += γ1 * r̂;
    if (e * multiplier < Math.abs(r̂)) {
        return r̂;
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return 0;
}


;// CONCATENATED MODULE: ./src/evaluate/double/eval-certified-incl-error.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eval_certified_incl_error_ = γ;
const eval_certified_incl_error_EFTHorner = EFTHorner;
const eval_certified_incl_error_hornerWithRunningError = hornerWithRunningError;
const eval_certified_incl_error_Horner = Horner;
const eval_certified_incl_error_AbsHorner = AbsHorner;
const eval_certified_incl_error_1 = eval_certified_incl_error_(1);
const eval_certified_incl_error_2 = eval_certified_incl_error_(2);
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
    const absX = Math.abs(x);
    // first do a fast evaluation
    const [r, e1] = eval_certified_incl_error_hornerWithRunningError(p[0], x);
    // the line below was changed due to negative values of x now also allowed
    const e2 = eval_certified_incl_error_2 * eval_certified_incl_error_AbsHorner(p[0], absX); // the error due to not considering p[1]
    // error due to imprecision in coefficients
    // the line below was changed due to negative values of x now also allowed
    //const E = pE ? Horner(pE, x) : 0; 
    const E = pE !== undefined
        ? eval_certified_incl_error_Horner(pE, absX)
        : 0;
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < Math.abs(r)) {
        // we are within bounds
        return { r̂: r, e: ee };
    }
    // error is too large - do a more precise evaluation
    const EFTHorner_ = eval_certified_incl_error_EFTHorner(p[0], x);
    const { pπ, pσ } = EFTHorner_;
    let { r̂ } = EFTHorner_;
    const [C1, c1] = eval_certified_incl_error_hornerWithRunningError(pπ, x);
    const [C2, c2] = eval_certified_incl_error_hornerWithRunningError(pσ, x);
    const [C3, c3] = eval_certified_incl_error_hornerWithRunningError(p[1], x);
    let e = (c1 + c2 + c3) + E; // typically: c1,c2 < c3 < E
    r̂ = (C1 + C2 + C3) + r̂; // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    e += eval_certified_incl_error_1 * r̂;
    if (e * multiplier < Math.abs(r̂)) {
        return { r̂, e };
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return { r̂: 0, e };
}


;// CONCATENATED MODULE: ./src/evaluate/double/eval-k.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eval_k_hornerWithRunningError = hornerWithRunningError;
const eval_k_CompHornerK = CompHornerK;
const eval_k_compHornerWithRunningError = compHornerWithRunningError;
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
    const [r̂, e] = eval_k_hornerWithRunningError(p, x);
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
    const [r̂, e] = eval_k_compHornerWithRunningError(p, x);
    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }
    return r̂;
}
// inlined
//[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
function evalK4(p, x) {
    const r̂ = eval_k_CompHornerK(p, x, 4);
    return r̂;
}


;// CONCATENATED MODULE: ./src/evaluate/double/evaluate-at-0.ts
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


;// CONCATENATED MODULE: ./src/evaluate/double/evaluate-at-1.ts
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


;// CONCATENATED MODULE: ./src/evaluate/expansion/e-e-horner.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_e_horner_fastExpansionSum = fastExpansionSum;
const e_e_horner_expansionProduct = expansionProduct;
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
        result = e_e_horner_fastExpansionSum(p[i], e_e_horner_expansionProduct(result, x));
    }
    return result;
}


;// CONCATENATED MODULE: ./src/evaluate/expansion/e-evaluate-at-0.ts
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


;// CONCATENATED MODULE: ./src/evaluate/expansion/e-evaluate-at-1.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_evaluate_at_1_fastExpansionSum = fastExpansionSum;
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
        res = e_evaluate_at_1_fastExpansionSum(res, p[i]);
    }
    return res;
}


;// CONCATENATED MODULE: ./src/evaluate/expansion/e-horner.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fes = fastExpansionSum;
const sce = scaleExpansion;
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
        q = fes(p[i], sce(q, x));
    }
    return q;
}


;// CONCATENATED MODULE: ./src/factor/double/content.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const content_gcdInts = gcdInts;
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
    return Math.sign(p[0]) * content_gcdInts(p);
}


;// CONCATENATED MODULE: ./src/factor/double/primitive-part.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const getContent = content;
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
    const c = getContent(p);
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}


;// CONCATENATED MODULE: ./src/gcd/bigint/b-gcd-prs.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_gcd_prs_bPremSequenceSubresultant = bPremSequenceSubresultant;
/**
 * :::tip Heads up!
 * Use the modular gcd algorithm, [[gcdModular]] (still to be implemented 😢), instead - it is faster.
 * :::
 *
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs) (bar overflow). The returned GCD is a
 * polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`.
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
    const seq = b_gcd_prs_bPremSequenceSubresultant(a, b, false);
    return seq[seq.length - 1];
}


;// CONCATENATED MODULE: ./src/norm/bigint/b-p-1-norm.ts
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


;// CONCATENATED MODULE: ./src/norm/bigint/b-p-2-norm-squared.ts
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


;// CONCATENATED MODULE: ./src/norm/bigint/b-p-inf-norm.ts
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


;// CONCATENATED MODULE: ./src/norm/double/p-1-norm.ts
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
        s += Math.abs(p[i]);
    }
    return s;
}


;// CONCATENATED MODULE: ./src/norm/double/p-2-norm.ts
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
    return Math.sqrt(s);
}


;// CONCATENATED MODULE: ./src/norm/double/p-inf-norm.ts
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


;// CONCATENATED MODULE: ./src/norm/expansion/e-p-1-norm.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_p_1_norm_eEstimate = eEstimate;
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
        s += Math.abs(e_p_1_norm_eEstimate(p[i]));
    }
    return s;
}


;// CONCATENATED MODULE: ./src/norm/expansion/e-p-2-norm.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_p_2_norm_eEstimate = eEstimate;
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
        s += e_p_2_norm_eEstimate(p[i]) ** 2;
    }
    return Math.sqrt(s);
}


;// CONCATENATED MODULE: ./src/norm/expansion/e-p-inf-norm.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_p_inf_norm_eEstimate = eEstimate;
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
        const v = Math.abs(e_p_inf_norm_eEstimate(p[i]));
        if (v > max) {
            max = v;
        }
    }
    return max;
}


;// CONCATENATED MODULE: ./src/roots/from-roots/double/from-roots.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const from_roots_multiply = multiply;
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
        p = from_roots_multiply(p, [1, -roots[i]]);
    }
    return p;
}


;// CONCATENATED MODULE: ./src/predictive-random/double/random.ts

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


;// CONCATENATED MODULE: ./src/scale-to-int/scale-floats-to-bigints.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_floats_to_bigints_exponent = exponent;
const scale_floats_to_bigints_bitLength = bitLength;
const b0 = 0n; // so tests are not tripped up - awaiting better support
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
        const scalePower = -scale_floats_to_bigints_exponent(a) + scale_floats_to_bigints_bitLength(a) - 1;
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
                return b0;
            }
            const scalePower = -scale_floats_to_bigints_exponent(a) + scale_floats_to_bigints_bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        });
    }
    // overflow / underflow cannot occur
    return as.map(a => BigInt(a * 2 ** e));
}


;// CONCATENATED MODULE: ./src/predictive-random/bigint/b-random.ts


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


;// CONCATENATED MODULE: ./src/roots/certified/transpose-poly.ts
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


;// CONCATENATED MODULE: ./src/roots/certified/eval-adaptive.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eval_adaptive_evalCertified = evalCertified;
const eval_adaptive_eHorner = eHorner;
const eval_adaptive_eEstimate = eEstimate;
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
    const r = eval_adaptive_evalCertified(p, x, pE, 4);
    if (r !== 0) {
        return r;
    }
    // condition number is too high - request higher precision
    return eval_adaptive_eEstimate(eval_adaptive_eHorner(getPolyExact(), x));
}


;// CONCATENATED MODULE: ./src/roots/certified/refine-certified.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const refine_certified_evalCertified = evalCertified;
const refine_certified_eHorner = eHorner;
const refine_certified_eEstimate = eEstimate;
const refine_certified_eps = Number.EPSILON;
const refine_certified_abs = Math.abs;
const max = Math.max;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given polynomial using Brent's Method - modified slightly to allow for
 * error certified bounds.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method), except that it is specialzed to polynomial evaluation
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
 * * [c++ implementation of Brent's Method](https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp)
 *
 * @param p A polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`. If `exact` is `true` then this is allowed
 * to be `undefined`.
 * @param pE An error polynomial that provides a coefficientwise error bound on
 * the input polynomial; all coefficients must be positive. If `exact` is `true`
 * then this is allowed to be `undefined`.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa the result of evaluating the input polynomial at `a`
 * @param fb the result of evaluating the input polynomial at `b`
 * @param psExact
 * @param getPsExact
 * @param diffCount
 * @param exact set to true if you need to do exact evaluations from the start
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
        const mm = max(refine_certified_abs(a), refine_certified_abs(b));
        if (mm <= 1) {
            δ = refine_certified_eps;
        }
        else {
            // keep δ = eps * a power of 2
            //δ = eps * 2**Math.ceil(Math.log2(Math.ceil(mm)));  // may be faster to get log2 of an integer
            δ = refine_certified_eps * 2 ** Math.ceil(Math.log2(mm));
        }
        //tol = 2.0 * macheps * abs ( b ) + t;
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        // modified from the original since we dont need the fb === 0 check here
        if (refine_certified_abs(m) <= δ) {
            // TODO - could potentially make b - c a power of 2 here δ
            return b < c ? [b, c] : [c, b];
        }
        if (refine_certified_abs(e) < δ || refine_certified_abs(fa) <= refine_certified_abs(fb)) {
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
            if (2 * p < 3 * m * q - refine_certified_abs(δ * q) && p < refine_certified_abs(0.5 * s * q)) {
                d = p / q;
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
            ? refine_certified_eEstimate(refine_certified_eHorner(getPolyExact(), b))
            // keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
            // here by a precondition
            : refine_certified_evalCertified(p, b, pE);
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
            const sL = Math.max(lb, b - δ); // dont overstep bounds
            const sR = Math.min(ub, b + δ); // dont overstep bounds
            // Note: sR - sL <= 2*δ provided lb, ub are in [-1..1] - usually 
            // (when sL === s - δ and sR === s + δ) sR - sL === 2*δ. Also δ > 0
            // keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
            // here by a precondition
            const fsL = refine_certified_evalCertified(p, sL, pE);
            const fsR = refine_certified_evalCertified(p, sR, pE);
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
            fb = refine_certified_eEstimate(refine_certified_eHorner(getPolyExact(), b));
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


;// CONCATENATED MODULE: ./src/roots/root-bounds/upper-to-lower-bound.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const upper_to_lower_bound_invert = invert;
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
        return 1 / positiveUpperBoundFunction(upper_to_lower_bound_invert(p));
    };
}


;// CONCATENATED MODULE: ./src/roots/root-bounds/positive-to-negative-bound.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const positive_to_negative_bound_reflectAboutYAxis = reflectAboutYAxis;
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
        return -positiveBoundFunction(positive_to_negative_bound_reflectAboutYAxis(p));
    };
}


;// CONCATENATED MODULE: ./src/roots/root-bounds/root-bounds-lmq.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const root_bounds_lmq_negate = negate;
const root_bounds_lmq_upperToLowerBound = upperToLowerBound;
const root_bounds_lmq_positiveToNegativeBound = positiveToNegativeBound;
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
        p = root_bounds_lmq_negate(p);
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
        let tempub = Number.POSITIVE_INFINITY;
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
const positiveRootLowerBound_LMQ = root_bounds_lmq_upperToLowerBound(positiveRootUpperBound_LMQ);
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
const negativeRootLowerBound_LMQ = root_bounds_lmq_positiveToNegativeBound(positiveRootUpperBound_LMQ);
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
const negativeRootUpperBound_LMQ = root_bounds_lmq_upperToLowerBound(negativeRootLowerBound_LMQ);


;// CONCATENATED MODULE: ./src/roots/certified/all-roots-certified.ts











// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const all_roots_certified_ddDifferentiateWithError = ddDifferentiateWithError;
const all_roots_certified_evalCertified = evalCertified;
const all_roots_certified_eHorner = eHorner;
const all_roots_certified_transposePoly = transposePoly;
const all_roots_certified_evalAdaptive = evalAdaptive;
const all_roots_certified_refineCertified = refineCertified;
const all_roots_certified_negativeRootUpperBound_LMQ = negativeRootLowerBound_LMQ;
const all_roots_certified_positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ;
const all_roots_certified_eDifferentiate = eDifferentiate;
const all_roots_certified_eEstimate = eEstimate;
const all_roots_certified_hornerWithRunningError = hornerWithRunningError;
const all_roots_certified_eSign = e_sign_eSign;
const all_roots_certified_max = Math.max;
const min = Math.min;
const all_roots_certified_abs = Math.abs;
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
    // (the case of leading zero coefficients can now be handled)
    // `p` and `getPExact()` *must* be of same length
    //----------------------------------------------------------------------
    let polyExact = undefined; // lazy loaded
    // while the leading coefficient is smaller then the error bound 
    // i.e. possibly zero	
    while (p.length > 0 && all_roots_certified_abs(p[0][1]) <= pE[0]) {
        polyExact = polyExact || getPExact();
        // if leading coefficient really is zero
        if (all_roots_certified_eSign(polyExact[0]) === 0) {
            // shift the leading coefficient and error out without altering the 
            // given polynomial and error bound (shift is destructive, slice is not)
            p = p.slice();
            p.shift();
            pE = pE.slice();
            pE.shift();
            // also shift out the exact polynomial's leading coefficient
            polyExact.shift();
            continue;
        }
        break;
    }
    if (p.length === 0) {
        // return `undefined` for the zero polynomial?
        return returnUndefinedForZeroPoly ? undefined : [];
    }
    else if (p.length === 1) {
        // return `[]` for a degree 1 polynomial (a non-zero constant)
        return [];
    }
    if (lb === Number.NEGATIVE_INFINITY || ub === Number.POSITIVE_INFINITY) {
        const pDoubleCoeffs = p.map(c => c[1]);
        if (lb === Number.NEGATIVE_INFINITY) {
            lb = all_roots_certified_negativeRootUpperBound_LMQ(pDoubleCoeffs);
        }
        if (ub === Number.POSITIVE_INFINITY) {
            ub = all_roots_certified_positiveRootUpperBound_LMQ(pDoubleCoeffs);
        }
    }
    const p_ = all_roots_certified_transposePoly(p);
    let bCount;
    let exact;
    const deg = p.length - 1;
    bCount = 0;
    exact = false;
    let LB; // evaluation at lb
    do {
        LB = exact
            ? all_roots_certified_eEstimate(all_roots_certified_eHorner(getPolyExact(), lb))
            : all_roots_certified_evalCertified(p_, lb, pE);
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
            ? all_roots_certified_eEstimate(all_roots_certified_eHorner(getPolyExact(), ub))
            : all_roots_certified_evalCertified(p_, ub, pE);
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
    const ps_ = [all_roots_certified_transposePoly(p)]; // the transposed versions
    for (let i = 1; i <= deg; i++) {
        const dP = all_roots_certified_ddDifferentiateWithError(ps[i - 1]);
        ps.push(dP);
        ps_.push(all_roots_certified_transposePoly(dP.p)); // the transposed versions
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
        // keep TypeScript happy; `getPExact` cannot be `undefined` here
        let poly = polyExact || getPExact();
        psExact = [poly];
        while (poly.length > 1) {
            poly = all_roots_certified_eDifferentiate(poly);
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
        const LB = all_roots_certified_evalAdaptive(curP_, curPE, lb, getPolyExact);
        if (!is.length) {
            // close even root not possible
            const UB = all_roots_certified_evalAdaptive(curP_, curPE, ub, getPolyExact);
            if (LB * UB >= 0) {
                return [];
            }
            const [tS, tE] = all_roots_certified_refineCertified(curP_, curPE, lb, ub, LB, UB, getPolyExact /*, δ*/);
            return [{ tS, tE, multiplicity: 1 }];
        }
        //---- First check from lb to the left side of the first micro-interval.
        let _a = is[0].tS;
        let _A = all_roots_certified_evalAdaptive(curP_, curPE, _a, getPolyExact);
        if (LB * _A > 0) {
            // no roots possible (curve is monotone increasing or decreasing)
        }
        else if (LB * _A < 0) {
            // recall LB must !== 0 as a precondition
            const [tS, tE] = all_roots_certified_refineCertified(curP_, curPE, lb, _a, LB, _A, getPolyExact /*, δ*/);
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
            A_ = all_roots_certified_evalAdaptive(curP_, curPE, a_, getPolyExact);
            _B = all_roots_certified_evalAdaptive(curP_, curPE, _b, getPolyExact);
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
                    const [tS, tE] = all_roots_certified_refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
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
                    const [tS, tE] = all_roots_certified_refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
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
                    const [tS, tE] = all_roots_certified_refineCertified(curP_, curPE, a_, _b, A_, _B, getPolyExact /*, δ*/);
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
            //	// evaluate at 1
            //	maxDdP2 += abs(ddP0[j]);  // this is valid only if |lb| and |ub| <= 1
            //}
            const d = (a_ - _a) * onePlusEps;
            let mult = 1;
            let maxDdP = 0;
            for (let ddDiffCount = diffCount + 2; ddDiffCount <= deg; ddDiffCount++) {
                const p = ps_[ddDiffCount][0];
                const h = all_roots_certified_hornerWithRunningError(p, _a);
                const fs = all_roots_certified_abs(h[0]) + h[1];
                maxDdP += fs * mult;
                mult *= d * onePlusEps;
            }
            // maxDdP is now calculated
            const AMinMax = A_ > 0 ? min(_A, A_) : all_roots_certified_max(_A, A_);
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


;// CONCATENATED MODULE: ./src/roots/certified/all-roots-certified-simplified.ts

function allRootsCertifiedSimplified(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY, returnUndefinedForZeroPoly) {
    return allRootsCertified(p.map(c => [0, c]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}


;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-to-double-double.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_double_double_compress = e_compress_eCompress;
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
;// CONCATENATED MODULE: ./src/roots/certified/refine-k1.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const refine_k1_eChangeVariablesLinear = eChangeVariablesLinear;
const refine_k1_allRootsCertified = allRootsCertified;
const refine_k1_eToDd = eToDd;
const refine_k1_twoSum = two_sum_twoSum;
const refine_k1_eps = Number.EPSILON;
/**
 * Returns once compensated root(s) (bar underflow / overflow) given a root
 * interval previously calculated using [[allRootsCertified]].
 *
 * * 'once-compensated' here means that the typical root interval, `W`,
 * (`= Number.EPSILON` at `1`) is reduced to `W**2`; if multiple roots were
 * present in the original interval they may be resolved to individual
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
    const tS = ri.tS;
    // scale is exact by the precondition put on `RootInterval`
    const δ = ri.tE - tS;
    if (δ === 0) {
        return [{
                tS: [0, tS],
                tE: [0, tS],
                multiplicity: ri.multiplicity
            }];
    }
    // Translate the polynomial such that the root is within δ from 0, then
    // scale it such that the roots stay <= 1, i.e. is in [0,1]
    const pExactK1 = refine_k1_eChangeVariablesLinear(p, δ, tS);
    // reduce the polynomial to double-double precision for faster root finding
    const pDdK1 = pExactK1.map(refine_k1_eToDd);
    // update the double-double precision error bound - it is simply the error 
    // in rounding the exact coefficients to double-double precision
    const errBoundK1 = pDdK1.map(c => refine_k1_eps * refine_k1_eps * c[1]);
    const getPExactK1 = () => pExactK1;
    // keep TypeScript happy; `allRootsCertified` can safely be assumed not to
    // return `undefined`
    const risLo = refine_k1_allRootsCertified(pDdK1, 0, 1, errBoundK1, getPExactK1);
    const ris = [];
    for (const riLo of risLo) {
        ris.push({
            tS: refine_k1_twoSum(tS, riLo.tS * δ),
            tE: refine_k1_twoSum(tS, riLo.tE * δ),
            multiplicity: riLo.multiplicity
        });
    }
    return ris;
}


;// CONCATENATED MODULE: ./src/roots/certified/root-interval.ts
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


;// CONCATENATED MODULE: ./src/roots/certified/root-interval-to-exp.ts
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


;// CONCATENATED MODULE: ./src/roots/descartes/bigint/b-sign-changes.ts
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
    let result = 0;
    let prevSign = p[0] === 0n ? 0 : p[0] < 0n ? -1 : +1;
    for (let i = 1; i < d + 1; i++) {
        const sign = p[i] === 0n ? 0 : p[i] < 0n ? -1 : +1;
        if (sign !== prevSign && sign !== 0) {
            result++;
            prevSign = sign;
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/roots/descartes/bigint/b-num-roots.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_num_roots_bSturmChain = bSturmChain;
const b_num_roots_bDegree = bDegree;
const b_num_roots_bSignChanges = bSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
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
    const ps = b_num_roots_bSturmChain(p);
    const as = ps.map(p => b_num_roots_bDegree(p) % 2 === 0 ? p[0] : -p[0]);
    const bs = ps.map(p => p[0]);
    return b_num_roots_bSignChanges(as) - b_num_roots_bSignChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/bigint/b-num-roots-0-1.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_num_roots_0_1_bSturmChain = bSturmChain;
const b_num_roots_0_1_bSignChanges = bSignChanges;
const b_num_roots_0_1_bEvaluateAt1 = bEvaluateAt1;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bNumRootsIn01(p) {
    const ps = b_num_roots_0_1_bSturmChain(p);
    const as = ps.map(p => p[p.length - 1]); // evaluate at 0
    const bs = ps.map(p => b_num_roots_0_1_bEvaluateAt1(p)); // evaluate at 1
    return b_num_roots_0_1_bSignChanges(as) - b_num_roots_0_1_bSignChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/bigint/b-num-roots-in-range.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_num_roots_in_range_bSturmChain = bSturmChain;
const b_num_roots_in_range_bHorner = bHorner;
const b_num_roots_in_range_bSignChanges = bSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial.
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
 * bNumRootsInRange(p,-20,-11);  //=> 0
 * bNumRootsInRange(p,-11,-9);   //=> 1
 * bNumRootsInRange(p,-11,3.5);  //=> 3
 * bNumRootsInRange(p,-11,5);    //=> 4
 * ```
 *
 * @doc
 */
function bNumRootsInRange(p, a, b) {
    const ps = b_num_roots_in_range_bSturmChain(p);
    const as = ps.map(p => b_num_roots_in_range_bHorner(p, a));
    const bs = ps.map(p => b_num_roots_in_range_bHorner(p, b));
    return b_num_roots_in_range_bSignChanges(as) - b_num_roots_in_range_bSignChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/double/sign-changes.ts
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
    let result = 0;
    let prevSign = Math.sign(p[0]);
    for (let i = 1; i < d + 1; i++) {
        const sign = Math.sign(p[i]);
        if (sign !== prevSign && sign !== 0) {
            result++;
            prevSign = sign;
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/roots/descartes/double/num-roots.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const num_roots_signChanges = signChanges;
const num_roots_eSign = e_sign_eSign;
const num_roots_eDegree = eDegree;
const num_roots_eSturmChain = eSturmChain;
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial - subject to floating point underflow / overflow of
 * intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
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
    const p_ = p.map(c => [c]);
    const ps = num_roots_eSturmChain(p_);
    const as = ps.map(p_ => num_roots_eDegree(p_) % 2 === 0 ? num_roots_eSign(p_[0]) : -num_roots_eSign(p_[0]));
    const bs = ps.map(p_ => num_roots_eSign(p_[0]));
    return num_roots_signChanges(as) - num_roots_signChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/double/num-roots-in-0-1.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const num_roots_in_0_1_eEvaluateAt1 = eEvaluateAt1;
const num_roots_in_0_1_eSturmChain = eSturmChain;
const num_roots_in_0_1_signChanges = signChanges;
const num_roots_in_0_1_eSign = e_sign_eSign;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function numRootsIn01(p) {
    const p_ = p.map(c => [c]);
    const ps = num_roots_in_0_1_eSturmChain(p_);
    const as = ps.map(p_ => num_roots_in_0_1_eSign(p_[p_.length - 1])); // evaluate at 0
    const bs = ps.map(p_ => num_roots_in_0_1_eSign(num_roots_in_0_1_eEvaluateAt1(p_))); // evaluate at 1
    return num_roots_in_0_1_signChanges(as) - num_roots_in_0_1_signChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/expansion/e-sign-changes.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_sign_changes_eSign = e_sign_eSign;
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
    let result = 0;
    let prevSign = Math.sign(e_sign_changes_eSign(p[0]));
    for (let i = 1; i < d + 1; i++) {
        const sign_ = Math.sign(e_sign_changes_eSign(p[i]));
        if (sign_ !== prevSign && sign_ !== 0) {
            result++;
            prevSign = sign_;
        }
    }
    return result;
}


;// CONCATENATED MODULE: ./src/roots/descartes/double/num-roots-in-range.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const num_roots_in_range_sturmChain = sturmChain;
const num_roots_in_range_eHorner = eHorner;
const num_roots_in_range_eSignChanges = eSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
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
    const ps = num_roots_in_range_sturmChain(p);
    const as = ps.map(p => num_roots_in_range_eHorner(p, a));
    const bs = ps.map(p => num_roots_in_range_eHorner(p, b));
    return num_roots_in_range_eSignChanges(as) - num_roots_in_range_eSignChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/expansion/e-num-roots.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_num_roots_signChanges = signChanges;
const e_num_roots_eSign = e_sign_eSign;
const e_num_roots_eDegree = eDegree;
const e_num_roots_eSturmChain = eSturmChain;
/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial - subject to floating point underflow / overflow of
 * intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
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
    const ps = e_num_roots_eSturmChain(p);
    const as = ps.map(p => e_num_roots_eDegree(p) % 2 === 0 ? e_num_roots_eSign(p[0]) : -e_num_roots_eSign(p[0]));
    const bs = ps.map(p => e_num_roots_eSign(p[0]));
    return e_num_roots_signChanges(as) - e_num_roots_signChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/expansion/e-num-roots-0-1.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_num_roots_0_1_eEvaluateAt1 = eEvaluateAt1;
const e_num_roots_0_1_eSturmChain = eSturmChain;
const e_num_roots_0_1_signChanges = signChanges;
const e_num_roots_0_1_eSign = e_sign_eSign;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eNumRootsIn01(p) {
    const ps = e_num_roots_0_1_eSturmChain(p);
    const as = ps.map(p => e_num_roots_0_1_eSign(p[p.length - 1])); // evaluate at 0
    const bs = ps.map(p => e_num_roots_0_1_eSign(e_num_roots_0_1_eEvaluateAt1(p))); // evaluate at 1
    return e_num_roots_0_1_signChanges(as) - e_num_roots_0_1_signChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/descartes/expansion/e-num-roots-in-range.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_num_roots_in_range_eeHorner = eeHorner;
const e_num_roots_in_range_eSturmChain = eSturmChain;
const e_num_roots_in_range_eSignChanges = eSignChanges;
/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial - subject to floating point
 * underflow / overflow of intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial, if
 * neither a nor b is a multiple root of p, then V(a) − V(b) is the number of
 * distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound given as a Shewchuk expansion
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRootsInRange(p,-20,-11); //=> 0
 * eNumRootsInRange(p,-11,-9);  //=> 1
 * eNumRootsInRange(p,-11,3.5); //=> 3
 * eNumRootsInRange(p,-11,5);   //=> 4
 * ```
 *
 * @doc
 */
function eNumRootsInRange(p, a, b) {
    const ps = e_num_roots_in_range_eSturmChain(p);
    const as = ps.map(p => e_num_roots_in_range_eeHorner(p, a));
    const bs = ps.map(p => e_num_roots_in_range_eeHorner(p, b));
    return e_num_roots_in_range_eSignChanges(as) - e_num_roots_in_range_eSignChanges(bs);
}


;// CONCATENATED MODULE: ./src/roots/from-roots/bigint/b-from-roots.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const b_from_roots_bMultiply = bMultiply;
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
        p = b_from_roots_bMultiply(p, [1n, -roots[i]]);
    }
    return p;
}


;// CONCATENATED MODULE: ./src/roots/from-roots/expansion/e-from-roots.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const e_from_roots_eMultiply = eMultiply;
const e_from_roots_eNegativeOf = eNegativeOf;
const e_from_roots_eToDd = eToDd;
/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors (x - root1)(x - root2) in infinite precision
 * (bar overflow) and rounding back to double-double precision; also returns
 * a coefficient-wise error polynomial and a function that returns the exact
 * polynomial.
 *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots
 *
 * @doc
 */
function eFromRoots(roots) {
    let p = [[1]];
    for (let i = 0; i < roots.length; i++) {
        p = e_from_roots_eMultiply(p, [[1], e_from_roots_eNegativeOf(roots[i])]);
    }
    const pE = p.map(c => Math.abs(c[c.length - 1] * Number.EPSILON));
    const getPExact = () => p;
    return {
        pDd: p.map(e_from_roots_eToDd),
        pE,
        getPExact
    };
}


;// CONCATENATED MODULE: ./src/roots/naive/brent-poly.ts

const brent_poly_Horner = Horner;
const brent_poly_eps = Number.EPSILON;
const brent_poly_u = brent_poly_eps / 2;
const brent_poly_abs = Math.abs;
const brent_poly_max = Math.max;
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


;// CONCATENATED MODULE: ./src/roots/naive/all-roots.ts






// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const all_roots_differentiate = differentiate;
const all_roots_Horner = Horner;
const all_roots_brentPoly = brentPoly;
const all_roots_negativeRootUpperBound_LMQ = negativeRootLowerBound_LMQ;
const all_roots_positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ;
const all_roots_removeLeadingZeros = removeLeadingZeros;
/**
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
 * @param lb defaults to `Number.NEGATIVE_INFINITY`; lower bound of roots to be
 * returned
 * @param ub defaults to `Number.POSITIVE_INFINITY`; upper bound of roots to be
 * returned
 *
 * @doc
 */
function allRoots(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY) {
    p = all_roots_removeLeadingZeros(p);
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
    if (lb === Number.NEGATIVE_INFINITY) {
        lb = all_roots_negativeRootUpperBound_LMQ(p);
    }
    if (ub === Number.POSITIVE_INFINITY) {
        ub = all_roots_positiveRootUpperBound_LMQ(p);
    }
    // Get all derivatives, i.e. 
    // ps === [p, dp, ddp, ..., constant]
    //        [0,  1,   2, ..., deg     ]
    const ps = [p];
    for (let i = 1; i <= p.length - 1; i++) {
        ps.push(all_roots_differentiate(ps[i - 1]));
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
        let _A_ = all_roots_Horner(p, _a_);
        // if lower bound value is zero and this is the last iteration with 
        // p === the original polynomial then push the root at the lower bound
        if (_A_ === 0 && diffCount === 0) {
            roots.push(lb);
        }
        for (let i = 0; i < is.length; i++) {
            const _b_ = is[i];
            const _B_ = all_roots_Horner(p, _b_);
            // if there is a root at the right interval then add it
            if (_B_ === 0) {
                roots.push(_b_);
            }
            else if (_A_ * _B_ < 0) {
                roots.push(all_roots_brentPoly(p, _a_, _b_, _A_, _B_));
            }
            _a_ = _b_;
            _A_ = _B_;
        }
        const _B_ = all_roots_Horner(p, ub);
        if (_A_ * _B_ < 0) {
            roots.push(all_roots_brentPoly(p, _a_, ub, _A_, _B_));
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
        return isWithZeroRoots;
    }
    return is;
}


;// CONCATENATED MODULE: ./src/roots/naive/bisection.ts
const bisection_abs = Math.abs;
const bisection_max = Math.max;
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


;// CONCATENATED MODULE: ./src/roots/naive/brent.ts
const brent_eps = Number.EPSILON;
const brent_abs = Math.abs;
const brent_max = Math.max;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using Brent's Method. Any function can be supplied (it
 * does not even have to be continuous) as long as the root is bracketed.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method)
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *   * guaranteed converge (unlike the Newton and other so-called single-point
 * methods),
 *   * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 *   * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
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


;// CONCATENATED MODULE: ./src/roots/naive/dd-deflate.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qmd = node_ddMultDouble2;
const qaq = node_ddAddDd;
/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r),
 * where r is a root of the polynomial.
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
        bs.push(qaq(p[i], qmd(root, bs[i - 1])));
    }
    return bs;
}


;// CONCATENATED MODULE: ./src/roots/naive/deflate.ts
/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r),
 * where r is a root of the polynomial.
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


;// CONCATENATED MODULE: ./src/roots/naive/quadratic-roots.ts
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
    const D = Math.sqrt(_D);
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


;// CONCATENATED MODULE: ./src/roots/root-bounds/root-magnitude-upper-bound-fujiwara.ts
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
        bs.push((Math.abs(p[i] / an)) ** (1 / i));
    }
    bs.push((Math.abs(p[d] / 2 * an)) ** (1 / d));
    return 2 * Math.max(...bs);
}


;// CONCATENATED MODULE: ./src/roots/root-bounds/root-magnitude-upper-bound-rouche.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const root_magnitude_upper_bound_rouche_pInfNorm = pInfNorm;
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
    return 1 + (root_magnitude_upper_bound_rouche_pInfNorm(p.slice(1)) / p[0]);
}


;// CONCATENATED MODULE: ./src/scale-to-int/scale-float-to-int.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_float_to_int_exponent = exponent;
const scale_float_to_int_bitLength = bitLength;
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
    return a * 2 ** (-scale_float_to_int_exponent(a) + scale_float_to_int_bitLength(a) - 1);
}


;// CONCATENATED MODULE: ./src/scale-to-int/scale-float-to-bigint.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_float_to_bigint_exponent = exponent;
const scale_float_to_bigint_bitLength = bitLength;
const scale_float_to_bigint_b0 = 0n; // temp until support is better otherwise test fails
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
        return scale_float_to_bigint_b0;
    }
    return BigInt(a * 2 ** (-scale_float_to_bigint_exponent(a) + scale_float_to_bigint_bitLength(a) - 1));
}


;// CONCATENATED MODULE: ./src/scale-to-int/scale-floatss-to-bigintss.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scale_floatss_to_bigintss_exponent = exponent;
const scale_floatss_to_bigintss_bitLength = bitLength;
const scale_floatss_to_bigintss_b0 = 0n; // so tests are not tripped up - awaiting better support
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
            const scaleFactor = -scale_floatss_to_bigintss_exponent(a) + scale_floatss_to_bigintss_bitLength(a) - 1;
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
                return scale_floatss_to_bigintss_b0;
            }
            const scalePower = -scale_floatss_to_bigintss_exponent(a) + scale_floatss_to_bigintss_bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        }));
    }
    // overflow / underflow cannot occur
    return ass.map(as => as.map(a => BigInt(a * 2 ** e)));
}


;// CONCATENATED MODULE: ./src/index.ts
// basic

// basic bigint












// basic double












// basic expansion














// calculus bigint

// calculus double


// calculus double-double



// calculus expansion

// change variables bigint




// change variables double




// change variables expansion




// error analysis



// euclidean division related bigint





// euclidean division related double


// euclidean division related expansion




// evaluate bigint



// evaluate double













// evaluate expansion




// factor bigint


// factor double


// factor expansion


// gcd bigint



// gcd double
//import { gcdPrs } from './gcd/double/gcd-prs.js';


// gcd expansion
//import { eGcdPrs } from './gcd/expansion/e-gcd-prs.js';


// norm bigint



// norm double



// norm expansion



// predictive random double





// predictive random bigint




// roots certified






// roots descartes bigint




// roots descartes double




// roots descartes expansion




// roots from roots



// roots naive







// roots root bounds






// scale to int






const src_operators = {
    // basic
    toCasStr: toCasStr,
    // basic bigint
    bAbsCoeff: bAbsCoeff,
    bAdd: bAdd,
    bDegree: bDegree,
    bDivideByConst: bDivideByConst,
    bEqual: bEqual,
    bInvert: bInvert,
    bIsRationalMultipleOf: bIsRationalMultipleOf,
    bMultiply: bMultiply,
    bMultiplyByConst: bMultiplyByConst,
    bNegate: bNegate,
    bRemoveLeadingZeros: bRemoveLeadingZeros,
    bSubtract: bSubtract,
    // basic double
    absCoeff: absCoeff,
    add: add,
    degree: degree,
    divideByConst: divideByConst,
    equal: equal,
    invert: invert,
    isRationalMultipleOf: isRationalMultipleOf,
    multiply: multiply,
    multiplyByConst: multiplyByConst,
    negate: negate,
    removeLeadingZeros: removeLeadingZeros,
    subtract: subtract,
    // basic expansion
    eAbsCoeff: eAbsCoeff,
    eAdd: eAdd,
    eDegree: eDegree,
    eEqual: eEqual,
    eInvert: eInvert,
    eIsConstOrZero: eIsConstOrZero,
    eIsRationalMultipleOf: eIsRationalMultipleOf,
    eIsUnit: eIsUnit,
    eMultiply: eMultiply,
    eMultiplyByConst: eMultiplyByConst,
    eNegate: eNegate,
    eProduct: eProduct,
    eRemoveLeadingZeros: eRemoveLeadingZeros,
    eSubtract: eSubtract,
    // calculus bigint
    bDifferentiate: bDifferentiate,
    // calculus double
    differentiate: differentiate,
    integrate: integrate,
    // calculus double-double
    ddDifferentiate: ddDifferentiate,
    ddDifferentiateWithError: ddDifferentiateWithError,
    ddIntegrate: ddIntegrate,
    // calculus expansion
    eDifferentiate: eDifferentiate,
    // change variables bigint
    bChangeVariablesLinear: bChangeVariablesLinear,
    bChangeVariablesScale: bChangeVariablesScale,
    bChangeVariablesTranslateX: bChangeVariablesTranslateX,
    bReflectAboutYAxis: bReflectAboutYAxis,
    // change variables double
    changeVariablesLinear: changeVariablesLinear,
    changeVariablesScale: changeVariablesScale,
    changeVariablesTranslateX: changeVariablesTranslateX,
    reflectAboutYAxis: reflectAboutYAxis,
    // change variables expansion
    eChangeVariablesLinear: eChangeVariablesLinear,
    eChangeVariablesScale: eChangeVariablesScale,
    eChangeVariablesTranslateX: eChangeVariablesTranslateX,
    eReflectAboutYAxis: eReflectAboutYAxis,
    // error analysis
    conditionNumber: conditionNumber,
    γ: γ,
    γγ: γγ,
    // euclidean division related bigint
    bPdivTrivial: bPdivTrivial,
    bPremSequencePrimitive: bPremSequencePrimitive,
    bPremSequenceSubresultant: bPremSequenceSubresultant,
    bPremSequenceTrivial: bPremSequenceTrivial,
    bSturmChain: bSturmChain,
    // euclidean division related double
    premSequenceSubresultant: premSequenceSubresultant,
    sturmChain: sturmChain,
    // euclidean division related expansion
    ePdivTrivial: ePdivTrivial,
    ePremSequencePrimitive: ePremSequencePrimitive,
    ePremSequenceSubresultant: ePremSequenceSubresultant,
    eSturmChain: eSturmChain,
    // evaluate bigint
    bHorner: bHorner,
    bEvaluateAt0: bEvaluateAt0,
    bEvaluateAt1: bEvaluateAt1,
    // evaluate double
    AbsHorner: AbsHorner,
    compHorner: compHorner,
    compHornerIsFaithful: compHornerIsFaithful,
    CompHornerK: CompHornerK,
    compHornerWithRunningError: compHornerWithRunningError,
    EFTHorner: EFTHorner,
    evalCertified: evalCertified,
    evalCertifiedInclError: evalCertifiedInclError,
    evalK: evalK,
    evaluateAt0: evaluateAt0,
    evaluateAt1: evaluateAt1,
    Horner: Horner,
    hornerWithRunningError: hornerWithRunningError,
    // evaluate expansion
    eeHorner: eeHorner,
    eEvaluateAt0: eEvaluateAt0,
    eEvaluateAt1: eEvaluateAt1,
    eHorner: eHorner,
    // factor bigint
    bContent: bContent,
    bPrimitivePart: bPrimitivePart,
    // factor double
    content: content,
    primitivePart: primitivePart,
    // factor expansion
    eContent: eContent,
    ePrimitivePart: ePrimitivePart,
    // norm bigint
    bP1Norm: bP1Norm,
    bP2NormSquared: bP2NormSquared,
    bPInfNorm: bPInfNorm,
    // norm double
    p1Norm: p1Norm,
    p2Norm: p2Norm,
    pInfNorm: pInfNorm,
    // norm expansion
    eP1Norm: eP1Norm,
    eP2Norm: eP2Norm,
    ePInfNorm: ePInfNorm,
    // predictive random double
    flatRoots: flatRoots,
    flatRootsArr: flatRootsArr,
    flatCoefficients: flatCoefficients,
    flatCoefficientsArr: flatCoefficientsArr,
    predictiveRandom: predictiveRandom,
    // predictive random bigint
    bFlatRoots: bFlatRoots,
    bFlatRootsArr: bFlatRootsArr,
    bFlatCoefficients: bFlatCoefficients,
    bFlatCoefficientsArr: bFlatCoefficientsArr,
    // roots certified
    allRootsCertified: allRootsCertified,
    allRootsCertifiedSimplified: allRootsCertifiedSimplified,
    refineK1: refineK1,
    mid: mid,
    createRootExact: createRootExact,
    rootIntervalToExp: rootIntervalToExp,
    // roots descartes bigint
    bNumRoots: bNumRoots,
    bNumRootsIn01: bNumRootsIn01,
    bNumRootsInRange: bNumRootsInRange,
    bSignChanges: bSignChanges,
    // roots descartes double
    numRoots: numRoots,
    numRootsIn01: numRootsIn01,
    numRootsInRange: numRootsInRange,
    signChanges: signChanges,
    // roots descartes expansion
    eNumRoots: eNumRoots,
    eNumRootsIn01: eNumRootsIn01,
    eNumRootsInRange: eNumRootsInRange,
    eSignChanges: eSignChanges,
    // roots from roots
    bFromRoots: bFromRoots,
    fromRoots: fromRoots,
    eFromRoots: eFromRoots,
    // roots naive
    allRoots: allRoots,
    bisection: bisection,
    brent: brent,
    brentPoly: brentPoly,
    ddDeflate: ddDeflate,
    deflate: deflate,
    quadraticRoots: quadraticRoots,
    // roots root bounds
    positiveRootUpperBound_LMQ: positiveRootUpperBound_LMQ,
    positiveRootLowerBound_LMQ: positiveRootLowerBound_LMQ,
    negativeRootLowerBound_LMQ: negativeRootLowerBound_LMQ,
    negativeRootUpperBound_LMQ: negativeRootUpperBound_LMQ,
    rootMagnitudeUpperBound_fujiwara: rootMagnitudeUpperBound_fujiwara,
    rootMagnitudeUpperBound_rouche: rootMagnitudeUpperBound_rouche,
    // scale to int
    scaleFloatToInt: scaleFloatToInt,
    scaleFloatsToInts: scaleFloatsToInts,
    scaleFloatssToIntss: scaleFloatssToIntss,
    scaleFloatToBigint: scaleFloatToBigint,
    scaleFloatsToBigints: scaleFloatsToBigints,
    scaleFloatssToBigintss: scaleFloatssToBigintss,
    // gcd bigint
    bGcdPrs: bGcdPrs,
    bGcdInt: bGcdInt,
    bGcdInts: bGcdInts,
    // gcd double
    //gcdPrs,
    gcdInt: gcdInt,
    gcdInts: gcdInts,
    // gcd expansion
    //eGcdPrs,
    eGcdInt: eGcdInt,
    eGcdInts: eGcdInts
};



var __webpack_exports__AbsHorner = __webpack_exports__.oM;
var __webpack_exports__CompHornerK = __webpack_exports__.Pg;
var __webpack_exports__EFTHorner = __webpack_exports__.rH;
var __webpack_exports__Horner = __webpack_exports__.E2;
var __webpack_exports__absCoeff = __webpack_exports__.UR;
var __webpack_exports__add = __webpack_exports__.IH;
var __webpack_exports__allRoots = __webpack_exports__.Tr;
var __webpack_exports__allRootsCertified = __webpack_exports__.oH;
var __webpack_exports__allRootsCertifiedSimplified = __webpack_exports__.Dy;
var __webpack_exports__bAbsCoeff = __webpack_exports__.l2;
var __webpack_exports__bAdd = __webpack_exports__.Ve;
var __webpack_exports__bChangeVariablesLinear = __webpack_exports__.IU;
var __webpack_exports__bChangeVariablesScale = __webpack_exports__.KL;
var __webpack_exports__bChangeVariablesTranslateX = __webpack_exports__.Ew;
var __webpack_exports__bContent = __webpack_exports__.KG;
var __webpack_exports__bDegree = __webpack_exports__.gM;
var __webpack_exports__bDifferentiate = __webpack_exports__.dv;
var __webpack_exports__bDivideByConst = __webpack_exports__.bu;
var __webpack_exports__bEqual = __webpack_exports__.Zv;
var __webpack_exports__bEvaluateAt0 = __webpack_exports__.OP;
var __webpack_exports__bEvaluateAt1 = __webpack_exports__.KI;
var __webpack_exports__bFlatCoefficients = __webpack_exports__.dA;
var __webpack_exports__bFlatCoefficientsArr = __webpack_exports__.CR;
var __webpack_exports__bFlatRoots = __webpack_exports__.ds;
var __webpack_exports__bFlatRootsArr = __webpack_exports__.OA;
var __webpack_exports__bFromRoots = __webpack_exports__.eg;
var __webpack_exports__bGcdInt = __webpack_exports__.DC;
var __webpack_exports__bGcdInts = __webpack_exports__.SG;
var __webpack_exports__bGcdPrs = __webpack_exports__.zY;
var __webpack_exports__bHorner = __webpack_exports__.LD;
var __webpack_exports__bInvert = __webpack_exports__.$v;
var __webpack_exports__bIsRationalMultipleOf = __webpack_exports__.$l;
var __webpack_exports__bMultiply = __webpack_exports__.c1;
var __webpack_exports__bMultiplyByConst = __webpack_exports__.Sl;
var __webpack_exports__bNegate = __webpack_exports__.db;
var __webpack_exports__bNumRoots = __webpack_exports__.pD;
var __webpack_exports__bNumRootsIn01 = __webpack_exports__.Ak;
var __webpack_exports__bNumRootsInRange = __webpack_exports__.i6;
var __webpack_exports__bP1Norm = __webpack_exports__.jV;
var __webpack_exports__bP2NormSquared = __webpack_exports__.Dc;
var __webpack_exports__bPInfNorm = __webpack_exports__.hg;
var __webpack_exports__bPdivTrivial = __webpack_exports__.ib;
var __webpack_exports__bPremSequencePrimitive = __webpack_exports__.aP;
var __webpack_exports__bPremSequenceSubresultant = __webpack_exports__.YF;
var __webpack_exports__bPremSequenceTrivial = __webpack_exports__.tK;
var __webpack_exports__bPrimitivePart = __webpack_exports__.dI;
var __webpack_exports__bReflectAboutYAxis = __webpack_exports__.i7;
var __webpack_exports__bRemoveLeadingZeros = __webpack_exports__.iK;
var __webpack_exports__bSignChanges = __webpack_exports__.j5;
var __webpack_exports__bSturmChain = __webpack_exports__.K;
var __webpack_exports__bSubtract = __webpack_exports__.J9;
var __webpack_exports__bisection = __webpack_exports__.HH;
var __webpack_exports__brent = __webpack_exports__.YQ;
var __webpack_exports__brentPoly = __webpack_exports__.u1;
var __webpack_exports__changeVariablesLinear = __webpack_exports__.uO;
var __webpack_exports__changeVariablesScale = __webpack_exports__.ef;
var __webpack_exports__changeVariablesTranslateX = __webpack_exports__.K0;
var __webpack_exports__compHorner = __webpack_exports__.YT;
var __webpack_exports__compHornerIsFaithful = __webpack_exports__.fy;
var __webpack_exports__compHornerWithRunningError = __webpack_exports__.rP;
var __webpack_exports__conditionNumber = __webpack_exports__.$k;
var __webpack_exports__content = __webpack_exports__.kQ;
var __webpack_exports__createRootExact = __webpack_exports__.UC;
var __webpack_exports__ddDeflate = __webpack_exports__.aF;
var __webpack_exports__ddDifferentiate = __webpack_exports__.Xz;
var __webpack_exports__ddDifferentiateWithError = __webpack_exports__.sF;
var __webpack_exports__ddIntegrate = __webpack_exports__.sG;
var __webpack_exports__deflate = __webpack_exports__.Wt;
var __webpack_exports__degree = __webpack_exports__.U8;
var __webpack_exports__differentiate = __webpack_exports__.YC;
var __webpack_exports__divideByConst = __webpack_exports__.FV;
var __webpack_exports__eAbsCoeff = __webpack_exports__.ZX;
var __webpack_exports__eAdd = __webpack_exports__._L;
var __webpack_exports__eChangeVariablesLinear = __webpack_exports__._n;
var __webpack_exports__eChangeVariablesScale = __webpack_exports__.FI;
var __webpack_exports__eChangeVariablesTranslateX = __webpack_exports__.rm;
var __webpack_exports__eContent = __webpack_exports__.QO;
var __webpack_exports__eDegree = __webpack_exports__.wY;
var __webpack_exports__eDifferentiate = __webpack_exports__.YV;
var __webpack_exports__eEqual = __webpack_exports__.qW;
var __webpack_exports__eEvaluateAt0 = __webpack_exports__.u3;
var __webpack_exports__eEvaluateAt1 = __webpack_exports__.Fg;
var __webpack_exports__eFromRoots = __webpack_exports__.g7;
var __webpack_exports__eGcdInt = __webpack_exports__.gX;
var __webpack_exports__eGcdInts = __webpack_exports__.Oh;
var __webpack_exports__eHorner = __webpack_exports__.dY;
var __webpack_exports__eInvert = __webpack_exports__.vD;
var __webpack_exports__eIsConstOrZero = __webpack_exports__.MY;
var __webpack_exports__eIsRationalMultipleOf = __webpack_exports__.BW;
var __webpack_exports__eIsUnit = __webpack_exports__._4;
var __webpack_exports__eMultiply = __webpack_exports__.d2;
var __webpack_exports__eMultiplyByConst = __webpack_exports__.md;
var __webpack_exports__eNegate = __webpack_exports__.zC;
var __webpack_exports__eNumRoots = __webpack_exports__.mq;
var __webpack_exports__eNumRootsIn01 = __webpack_exports__.th;
var __webpack_exports__eNumRootsInRange = __webpack_exports__.y1;
var __webpack_exports__eP1Norm = __webpack_exports__.Xh;
var __webpack_exports__eP2Norm = __webpack_exports__.Ws;
var __webpack_exports__ePInfNorm = __webpack_exports__.ww;
var __webpack_exports__ePdivTrivial = __webpack_exports__.HA;
var __webpack_exports__ePremSequencePrimitive = __webpack_exports__.b9;
var __webpack_exports__ePremSequenceSubresultant = __webpack_exports__._V;
var __webpack_exports__ePrimitivePart = __webpack_exports__.kP;
var __webpack_exports__eProduct = __webpack_exports__.Fp;
var __webpack_exports__eReflectAboutYAxis = __webpack_exports__.QU;
var __webpack_exports__eRemoveLeadingZeros = __webpack_exports__.XN;
var __webpack_exports__eSignChanges = __webpack_exports__.t;
var __webpack_exports__eSturmChain = __webpack_exports__._u;
var __webpack_exports__eSubtract = __webpack_exports__.x1;
var __webpack_exports__eeHorner = __webpack_exports__.ZW;
var __webpack_exports__equal = __webpack_exports__.Dg;
var __webpack_exports__evalCertified = __webpack_exports__.f6;
var __webpack_exports__evalCertifiedInclError = __webpack_exports__.Kj;
var __webpack_exports__evalK = __webpack_exports__.Of;
var __webpack_exports__evaluateAt0 = __webpack_exports__.Th;
var __webpack_exports__evaluateAt1 = __webpack_exports__.M9;
var __webpack_exports__flatCoefficients = __webpack_exports__.sd;
var __webpack_exports__flatCoefficientsArr = __webpack_exports__.b1;
var __webpack_exports__flatRoots = __webpack_exports__.m4;
var __webpack_exports__flatRootsArr = __webpack_exports__.rL;
var __webpack_exports__fromRoots = __webpack_exports__.Ht;
var __webpack_exports__gcdInt = __webpack_exports__.a8;
var __webpack_exports__gcdInts = __webpack_exports__.JK;
var __webpack_exports__hornerWithRunningError = __webpack_exports__.xD;
var __webpack_exports__integrate = __webpack_exports__.lF;
var __webpack_exports__invert = __webpack_exports__.U_;
var __webpack_exports__isRationalMultipleOf = __webpack_exports__.IP;
var __webpack_exports__mid = __webpack_exports__.Pi;
var __webpack_exports__multiply = __webpack_exports__.Jp;
var __webpack_exports__multiplyByConst = __webpack_exports__.$d;
var __webpack_exports__negate = __webpack_exports__.tk;
var __webpack_exports__negativeRootLowerBound_LMQ = __webpack_exports__.$3;
var __webpack_exports__negativeRootUpperBound_LMQ = __webpack_exports__.kT;
var __webpack_exports__numRoots = __webpack_exports__.lV;
var __webpack_exports__numRootsIn01 = __webpack_exports__.$6;
var __webpack_exports__numRootsInRange = __webpack_exports__.XP;
var __webpack_exports__operators = __webpack_exports__.Gn;
var __webpack_exports__p1Norm = __webpack_exports__.fk;
var __webpack_exports__p2Norm = __webpack_exports__.P5;
var __webpack_exports__pInfNorm = __webpack_exports__.Yz;
var __webpack_exports__positiveRootLowerBound_LMQ = __webpack_exports__.Fw;
var __webpack_exports__positiveRootUpperBound_LMQ = __webpack_exports__.FW;
var __webpack_exports__predictiveRandom = __webpack_exports__.Hq;
var __webpack_exports__premSequenceSubresultant = __webpack_exports__.A_;
var __webpack_exports__primitivePart = __webpack_exports__.$5;
var __webpack_exports__quadraticRoots = __webpack_exports__.GD;
var __webpack_exports__refineK1 = __webpack_exports__.X_;
var __webpack_exports__reflectAboutYAxis = __webpack_exports__.NF;
var __webpack_exports__removeLeadingZeros = __webpack_exports__.Qo;
var __webpack_exports__rootIntervalToExp = __webpack_exports__.WM;
var __webpack_exports__rootMagnitudeUpperBound_fujiwara = __webpack_exports__.Dk;
var __webpack_exports__rootMagnitudeUpperBound_rouche = __webpack_exports__.T9;
var __webpack_exports__scaleFloatToBigint = __webpack_exports__.GG;
var __webpack_exports__scaleFloatToInt = __webpack_exports__.we;
var __webpack_exports__scaleFloatsToBigints = __webpack_exports__.D9;
var __webpack_exports__scaleFloatsToInts = __webpack_exports__.yM;
var __webpack_exports__scaleFloatssToBigintss = __webpack_exports__.Bz;
var __webpack_exports__scaleFloatssToIntss = __webpack_exports__.Rm;
var __webpack_exports__signChanges = __webpack_exports__.bN;
var __webpack_exports__sturmChain = __webpack_exports__.SW;
var __webpack_exports__subtract = __webpack_exports__.$X;
var __webpack_exports__toCasStr = __webpack_exports__.yd;
var __webpack_exports___ = __webpack_exports__.H8;
var __webpack_exports___ = __webpack_exports__.Uv;
export { __webpack_exports__AbsHorner as AbsHorner, __webpack_exports__CompHornerK as CompHornerK, __webpack_exports__EFTHorner as EFTHorner, __webpack_exports__Horner as Horner, __webpack_exports__absCoeff as absCoeff, __webpack_exports__add as add, __webpack_exports__allRoots as allRoots, __webpack_exports__allRootsCertified as allRootsCertified, __webpack_exports__allRootsCertifiedSimplified as allRootsCertifiedSimplified, __webpack_exports__bAbsCoeff as bAbsCoeff, __webpack_exports__bAdd as bAdd, __webpack_exports__bChangeVariablesLinear as bChangeVariablesLinear, __webpack_exports__bChangeVariablesScale as bChangeVariablesScale, __webpack_exports__bChangeVariablesTranslateX as bChangeVariablesTranslateX, __webpack_exports__bContent as bContent, __webpack_exports__bDegree as bDegree, __webpack_exports__bDifferentiate as bDifferentiate, __webpack_exports__bDivideByConst as bDivideByConst, __webpack_exports__bEqual as bEqual, __webpack_exports__bEvaluateAt0 as bEvaluateAt0, __webpack_exports__bEvaluateAt1 as bEvaluateAt1, __webpack_exports__bFlatCoefficients as bFlatCoefficients, __webpack_exports__bFlatCoefficientsArr as bFlatCoefficientsArr, __webpack_exports__bFlatRoots as bFlatRoots, __webpack_exports__bFlatRootsArr as bFlatRootsArr, __webpack_exports__bFromRoots as bFromRoots, __webpack_exports__bGcdInt as bGcdInt, __webpack_exports__bGcdInts as bGcdInts, __webpack_exports__bGcdPrs as bGcdPrs, __webpack_exports__bHorner as bHorner, __webpack_exports__bInvert as bInvert, __webpack_exports__bIsRationalMultipleOf as bIsRationalMultipleOf, __webpack_exports__bMultiply as bMultiply, __webpack_exports__bMultiplyByConst as bMultiplyByConst, __webpack_exports__bNegate as bNegate, __webpack_exports__bNumRoots as bNumRoots, __webpack_exports__bNumRootsIn01 as bNumRootsIn01, __webpack_exports__bNumRootsInRange as bNumRootsInRange, __webpack_exports__bP1Norm as bP1Norm, __webpack_exports__bP2NormSquared as bP2NormSquared, __webpack_exports__bPInfNorm as bPInfNorm, __webpack_exports__bPdivTrivial as bPdivTrivial, __webpack_exports__bPremSequencePrimitive as bPremSequencePrimitive, __webpack_exports__bPremSequenceSubresultant as bPremSequenceSubresultant, __webpack_exports__bPremSequenceTrivial as bPremSequenceTrivial, __webpack_exports__bPrimitivePart as bPrimitivePart, __webpack_exports__bReflectAboutYAxis as bReflectAboutYAxis, __webpack_exports__bRemoveLeadingZeros as bRemoveLeadingZeros, __webpack_exports__bSignChanges as bSignChanges, __webpack_exports__bSturmChain as bSturmChain, __webpack_exports__bSubtract as bSubtract, __webpack_exports__bisection as bisection, __webpack_exports__brent as brent, __webpack_exports__brentPoly as brentPoly, __webpack_exports__changeVariablesLinear as changeVariablesLinear, __webpack_exports__changeVariablesScale as changeVariablesScale, __webpack_exports__changeVariablesTranslateX as changeVariablesTranslateX, __webpack_exports__compHorner as compHorner, __webpack_exports__compHornerIsFaithful as compHornerIsFaithful, __webpack_exports__compHornerWithRunningError as compHornerWithRunningError, __webpack_exports__conditionNumber as conditionNumber, __webpack_exports__content as content, __webpack_exports__createRootExact as createRootExact, __webpack_exports__ddDeflate as ddDeflate, __webpack_exports__ddDifferentiate as ddDifferentiate, __webpack_exports__ddDifferentiateWithError as ddDifferentiateWithError, __webpack_exports__ddIntegrate as ddIntegrate, __webpack_exports__deflate as deflate, __webpack_exports__degree as degree, __webpack_exports__differentiate as differentiate, __webpack_exports__divideByConst as divideByConst, __webpack_exports__eAbsCoeff as eAbsCoeff, __webpack_exports__eAdd as eAdd, __webpack_exports__eChangeVariablesLinear as eChangeVariablesLinear, __webpack_exports__eChangeVariablesScale as eChangeVariablesScale, __webpack_exports__eChangeVariablesTranslateX as eChangeVariablesTranslateX, __webpack_exports__eContent as eContent, __webpack_exports__eDegree as eDegree, __webpack_exports__eDifferentiate as eDifferentiate, __webpack_exports__eEqual as eEqual, __webpack_exports__eEvaluateAt0 as eEvaluateAt0, __webpack_exports__eEvaluateAt1 as eEvaluateAt1, __webpack_exports__eFromRoots as eFromRoots, __webpack_exports__eGcdInt as eGcdInt, __webpack_exports__eGcdInts as eGcdInts, __webpack_exports__eHorner as eHorner, __webpack_exports__eInvert as eInvert, __webpack_exports__eIsConstOrZero as eIsConstOrZero, __webpack_exports__eIsRationalMultipleOf as eIsRationalMultipleOf, __webpack_exports__eIsUnit as eIsUnit, __webpack_exports__eMultiply as eMultiply, __webpack_exports__eMultiplyByConst as eMultiplyByConst, __webpack_exports__eNegate as eNegate, __webpack_exports__eNumRoots as eNumRoots, __webpack_exports__eNumRootsIn01 as eNumRootsIn01, __webpack_exports__eNumRootsInRange as eNumRootsInRange, __webpack_exports__eP1Norm as eP1Norm, __webpack_exports__eP2Norm as eP2Norm, __webpack_exports__ePInfNorm as ePInfNorm, __webpack_exports__ePdivTrivial as ePdivTrivial, __webpack_exports__ePremSequencePrimitive as ePremSequencePrimitive, __webpack_exports__ePremSequenceSubresultant as ePremSequenceSubresultant, __webpack_exports__ePrimitivePart as ePrimitivePart, __webpack_exports__eProduct as eProduct, __webpack_exports__eReflectAboutYAxis as eReflectAboutYAxis, __webpack_exports__eRemoveLeadingZeros as eRemoveLeadingZeros, __webpack_exports__eSignChanges as eSignChanges, __webpack_exports__eSturmChain as eSturmChain, __webpack_exports__eSubtract as eSubtract, __webpack_exports__eeHorner as eeHorner, __webpack_exports__equal as equal, __webpack_exports__evalCertified as evalCertified, __webpack_exports__evalCertifiedInclError as evalCertifiedInclError, __webpack_exports__evalK as evalK, __webpack_exports__evaluateAt0 as evaluateAt0, __webpack_exports__evaluateAt1 as evaluateAt1, __webpack_exports__flatCoefficients as flatCoefficients, __webpack_exports__flatCoefficientsArr as flatCoefficientsArr, __webpack_exports__flatRoots as flatRoots, __webpack_exports__flatRootsArr as flatRootsArr, __webpack_exports__fromRoots as fromRoots, __webpack_exports__gcdInt as gcdInt, __webpack_exports__gcdInts as gcdInts, __webpack_exports__hornerWithRunningError as hornerWithRunningError, __webpack_exports__integrate as integrate, __webpack_exports__invert as invert, __webpack_exports__isRationalMultipleOf as isRationalMultipleOf, __webpack_exports__mid as mid, __webpack_exports__multiply as multiply, __webpack_exports__multiplyByConst as multiplyByConst, __webpack_exports__negate as negate, __webpack_exports__negativeRootLowerBound_LMQ as negativeRootLowerBound_LMQ, __webpack_exports__negativeRootUpperBound_LMQ as negativeRootUpperBound_LMQ, __webpack_exports__numRoots as numRoots, __webpack_exports__numRootsIn01 as numRootsIn01, __webpack_exports__numRootsInRange as numRootsInRange, __webpack_exports__operators as operators, __webpack_exports__p1Norm as p1Norm, __webpack_exports__p2Norm as p2Norm, __webpack_exports__pInfNorm as pInfNorm, __webpack_exports__positiveRootLowerBound_LMQ as positiveRootLowerBound_LMQ, __webpack_exports__positiveRootUpperBound_LMQ as positiveRootUpperBound_LMQ, __webpack_exports__predictiveRandom as predictiveRandom, __webpack_exports__premSequenceSubresultant as premSequenceSubresultant, __webpack_exports__primitivePart as primitivePart, __webpack_exports__quadraticRoots as quadraticRoots, __webpack_exports__refineK1 as refineK1, __webpack_exports__reflectAboutYAxis as reflectAboutYAxis, __webpack_exports__removeLeadingZeros as removeLeadingZeros, __webpack_exports__rootIntervalToExp as rootIntervalToExp, __webpack_exports__rootMagnitudeUpperBound_fujiwara as rootMagnitudeUpperBound_fujiwara, __webpack_exports__rootMagnitudeUpperBound_rouche as rootMagnitudeUpperBound_rouche, __webpack_exports__scaleFloatToBigint as scaleFloatToBigint, __webpack_exports__scaleFloatToInt as scaleFloatToInt, __webpack_exports__scaleFloatsToBigints as scaleFloatsToBigints, __webpack_exports__scaleFloatsToInts as scaleFloatsToInts, __webpack_exports__scaleFloatssToBigintss as scaleFloatssToBigintss, __webpack_exports__scaleFloatssToIntss as scaleFloatssToIntss, __webpack_exports__signChanges as signChanges, __webpack_exports__sturmChain as sturmChain, __webpack_exports__subtract as subtract, __webpack_exports__toCasStr as toCasStr, __webpack_exports___ as γ, __webpack_exports___ as γγ };
