import { bDegree } from '../../basic/bigint/b-degree.js';
import { bEqual } from '../../basic/bigint/b-equal.js';
import { bMultiply } from '../../basic/bigint/b-multiply.js';
import { bMultiplyByConst } from '../../basic/bigint/b-multiply-by-const.js';
import { bNegate } from '../../basic/bigint/b-negate.js';
import { bRemoveLeadingZeros } from '../../basic/bigint/b-remove-leading-zeros.js';
import { bSubtract } from '../../basic/bigint/b-subtract.js';
import { bGcdInt } from '../../gcd/bigint/b-integer-gcd.js';
import { bCompose } from './b-compose.js';


type BRittStep = {
    g: bigint[];
    h: bigint[];
};


type BRittDecomposeOptions = {
    /**
     * @deprecated has no effect anymore - the search is now always complete
     * *and* fast since the inner polynomial candidate is determined directly
     * (over the rationals) without factorizing the leading coefficient.
     */
    completeInnerLeadingCoeffSearch?: boolean;
};


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
 */
function bRittDecompose(
        p: bigint[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options: BRittDecomposeOptions = {}): bigint[][] {

    return bRittDecomposeInternal(p);
}


function bRittDecomposeInternal(p: bigint[]): bigint[][] {
    const q = bRemoveLeadingZeros(p);
    if (q.length <= 2) {
        return [q];
    }

    const step = findOneStep(q);
    if (!step) {
        return [q];
    }

    const canonical = canonicalizeStep(step.g, step.h);

    return [
        ...bRittDecomposeInternal(canonical.g),
        ...bRittDecomposeInternal(canonical.h)
    ];
}


/** Recompose factors returned by `bRittDecompose`. */
function bRittRecompose(factors: bigint[][]): bigint[] {
    if (factors.length === 0) {
        return [];
    }

    let r = factors[factors.length - 1];
    for (let i = factors.length - 2; i >= 0; i--) {
        r = bCompose(factors[i], r);
    }

    return r;
}


function findOneStep(p: bigint[]): BRittStep | undefined {
    const n = bDegree(p);
    if (n <= 1) {
        return undefined;
    }

    // Without loss of generality the inner polynomial has a zero constant
    // term (`g(h(x)) = g(u + c)(h(x) - c)`), so the constant term of `p` only
    // affects the constant term of `g`.
    const c0 = p[p.length - 1];
    const p0 = c0 === 0n ? p : subConst(p, c0);

    for (const s of properDivisors(n)) {
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
        return { g, h };
    }

    return undefined;
}


//---------------------------------------------------------------------------
// Exact rational arithmetic (minimal)
//---------------------------------------------------------------------------

/** A rational number `num/den` in lowest terms with `den > 0` */
type Frac = { num: bigint; den: bigint; };

function frac(num: bigint, den = 1n): Frac {
    if (den < 0n) { num = -num; den = -den; }
    const g = bGcdInt(num, den);
    return g > 1n ? { num: num/g, den: den/g } : { num, den };
}

const FRAC_ZERO = frac(0n);
const FRAC_ONE = frac(1n);

function fracAdd(a: Frac, b: Frac): Frac { return frac(a.num*b.den + b.num*a.den, a.den*b.den); }
function fracSub(a: Frac, b: Frac): Frac { return frac(a.num*b.den - b.num*a.den, a.den*b.den); }
function fracMul(a: Frac, b: Frac): Frac { return frac(a.num*b.num, a.den*b.den); }
function fracDiv(a: Frac, b: Frac): Frac { return frac(a.num*b.den, a.den*b.num); }

function lcm(a: bigint, b: bigint): bigint {
    return (a / bGcdInt(a, b)) * b;
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
 */
function buildInnerCandidate(
        p: bigint[],
        s: number,
        r: number): bigint[] {

    const lc = p[0];

    // `a[k]` is the coefficient of `x^(s-k)` of the monic inner candidate,
    // i.e. with `H(y) = Σ a[k] y^k` we have `h(x) = x^s H(1/x)` and the
    // coefficient of `x^(sr-k)` of `h(x)^r` equals the coefficient of `y^k`
    // of `H(y)^r`, which must equal `p[k] / lc` (for `k < s`).
    const a: Frac[] = [FRAC_ONE];
    for (let k = 1; k <= s - 1; k++) {
        // the coefficient of `y^k` in `H(y)^r` is `r·a[k] + known` where
        // `known` only depends on `a[0..k-1]`
        const known = fracPowSeriesCoeff(a, r, k);
        const target = frac(coeffAtDegree(p, s*r - k), lc);

        a.push(fracDiv(fracSub(target, known), frac(BigInt(r))));
    }

    // scale to integers by the lcm of the denominators
    let D = 1n;
    for (const ak of a) {
        D = lcm(D, ak.den);
    }

    const h = new Array<bigint>(s + 1);
    for (let k = 0; k < s; k++) {
        h[k] = a[k].num * (D / a[k].den);
    }
    h[s] = 0n;

    return h;
}


/**
 * Returns the coefficient of `y^k` in `A(y)^n` where `A(y) = Σ a[i] y^i`
 * (only `a[0..k-1]` are used, i.e. the coefficient `a[k]` is taken as zero).
 */
function fracPowSeriesCoeff(a: Frac[], n: number, k: number): Frac {
    let base = a.slice(0, k);
    let acc: Frac[] = [FRAC_ONE];

    let e = n;
    while (e > 0) {
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


/** Multiplies two power series truncated to degree `maxDeg` */
function fracMulSeriesTrunc(a: Frac[], b: Frac[], maxDeg: number): Frac[] {
    const out = new Array<Frac>(maxDeg + 1).fill(FRAC_ZERO);
    const la = Math.min(a.length - 1, maxDeg);
    const lb = Math.min(b.length - 1, maxDeg);
    for (let i = 0; i <= la; i++) {
        if (a[i].num === 0n) { continue; }

        const jMax = Math.min(lb, maxDeg - i);
        for (let j = 0; j <= jMax; j++) {
            if (b[j].num === 0n) { continue; }

            out[i + j] = fracAdd(out[i + j], fracMul(a[i], b[j]));
        }
    }

    return out;
}


/**
 * Returns the outer polynomial `g` (if it exists with integer coefficients)
 * such that `p = g(h)` by repeated exact division by `h`, else `undefined`.
 */
function solveOuterFromInner(
        p: bigint[],
        h: bigint[],
        r: number): bigint[] | undefined {

    const hPows: bigint[][] = new Array(r + 1);
    hPows[0] = [1n];
    for (let i = 1; i <= r; i++) {
        hPows[i] = bMultiply(hPows[i - 1], h);
    }

    let rem = p;
    const g = new Array<bigint>(r + 1).fill(0n);
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


function coeffAtDegree(p: bigint[], deg: number): bigint {
    const d = bDegree(p);
    const idx = d - deg;
    if (idx < 0 || idx >= p.length) {
        return 0n;
    }

    return p[idx] ?? 0n;
}


function subConst(p: bigint[], c: bigint): bigint[] {
    const r = p.slice();
    if (r.length === 0) {
        return r;
    }

    r[r.length - 1] -= c;
    return bRemoveLeadingZeros(r);
}


/** Returns the divisors of `n` in `[2, n/2]` in ascending order */
function properDivisors(n: number): number[] {
    const ds: number[] = [];
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


function canonicalizeStep(g: bigint[], h: bigint[]): BRittStep {
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


export { bRittDecompose, bRittRecompose }
export type { BRittDecomposeOptions }
