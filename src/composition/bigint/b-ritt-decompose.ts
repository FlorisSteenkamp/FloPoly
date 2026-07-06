import { bDegree } from '../../basic/bigint/b-degree.js';
import { bEqual } from '../../basic/bigint/b-equal.js';
import { bMultiply } from '../../basic/bigint/b-multiply.js';
import { bMultiplyByConst } from '../../basic/bigint/b-multiply-by-const.js';
import { bNegate } from '../../basic/bigint/b-negate.js';
import { bRemoveLeadingZeros } from '../../basic/bigint/b-remove-leading-zeros.js';
import { bSubtract } from '../../basic/bigint/b-subtract.js';
import { bCompose } from './b-compose.js';


type BRittStep = {
    g: bigint[];
    h: bigint[];
};


type BRittMemoContext = {
    powCache: Map<string, bigint>;
    divisorsCache: Map<string, bigint[]>;
};


type BRittDecomposeOptions = {
    /**
     * If true (default), enumerate all admissible inner leading coefficients by
     * exact divisor generation of the outer leading coefficient.
     *
     * If false, use a fast heuristic candidate set.
     */
    completeInnerLeadingCoeffSearch?: boolean;
};


const DEFAULT_OPTIONS: Required<BRittDecomposeOptions> = {
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
function bRittDecompose(
        p: bigint[],
        options: BRittDecomposeOptions = {}): bigint[][] {

    const opts = getOptions(options);
    const ctx = newMemoContext();

    return bRittDecomposeInternal(p, opts, ctx);
}


function bRittDecomposeInternal(
        p: bigint[],
        options: Required<BRittDecomposeOptions>,
        ctx: BRittMemoContext): bigint[][] {

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


function findOneStep(
        p: bigint[],
    options: Required<BRittDecomposeOptions>,
    ctx: BRittMemoContext): BRittStep | undefined {

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


function buildInnerCandidate(
        p: bigint[],
        s: number,
        r: number,
        lcOuter: bigint,
    lcInner: bigint,
    ctx: BRittMemoContext): bigint[] | undefined {

    // h(x) = x^s + ... + 0
    const h = new Array<bigint>(s + 1).fill(0n);
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


function candidateInnerLeadingCoeffs(
        lc: bigint,
        r: number,
    options: Required<BRittDecomposeOptions>,
    ctx: BRittMemoContext): bigint[] {

    const absLc = lc < 0n ? -lc : lc;
    if (absLc === 0n) {
        return [1n];
    }

    if (!options.completeInnerLeadingCoeffSearch) {
        // Fast heuristic set.
        return [1n, -1n, 2n, -2n];
    }

    const divisors = allPositiveDivisors(absLc, ctx);

    const candidates: bigint[] = [];
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
        if (aa < bb) { return -1; }
        if (aa > bb) { return 1; }
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });

    return uniqueBigints(candidates);
}


function allPositiveDivisors(n: bigint, ctx: BRittMemoContext): bigint[] {
    if (n <= 0n) {
        return [1n];
    }

    const key = n.toString();
    const cached = ctx.divisorsCache.get(key);
    if (cached !== undefined) {
        return cached;
    }

    const fs = factorizePositiveBigint(n);
    const out: bigint[] = [];
    genDivisors(fs, 0, 1n, out);
    out.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });

    ctx.divisorsCache.set(key, out);
    return out;
}


function factorizePositiveBigint(n: bigint): Array<[bigint, number]> {
    let m = n;
    const factors: Array<[bigint, number]> = [];

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


function genDivisors(
        factors: Array<[bigint, number]>,
        idx: number,
        acc: bigint,
        out: bigint[]): void {

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


function uniqueBigints(ns: bigint[]): bigint[] {
    const seen = new Set<string>();
    const out: bigint[] = [];
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


function powBigInt(a: bigint, n: number, ctx: BRittMemoContext): bigint {
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


function coeffAtHighOffsetPower(
        h: bigint[],
        r: number,
        offset: number): bigint {

    if (offset < 0) {
        return 0n;
    }

    // If h(x) = sum a_i x^(s-i), then h(x)^r = x^(sr) * H(1/x)^r where
    // H(y)=sum a_i y^i. Coefficient at x^(sr-offset) is coefficient of
    // y^offset in H(y)^r.
    const a = new Array<bigint>(offset + 1).fill(0n);
    const m = Math.min(offset, h.length - 1);
    for (let i = 0; i <= m; i++) {
        a[i] = h[i];
    }

    const p = powSeriesTruncLow(a, r, offset);
    return p[offset] ?? 0n;
}


function powSeriesTruncLow(
        a: bigint[],
        n: number,
        maxDeg: number): bigint[] {

    let e = n;
    let base = a.slice(0, maxDeg + 1);
    let acc: bigint[] = [1n];

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


function mulSeriesTruncLow(
        a: bigint[],
        b: bigint[],
        maxDeg: number): bigint[] {

    const out = new Array<bigint>(maxDeg + 1).fill(0n);
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


function getOptions(options: BRittDecomposeOptions): Required<BRittDecomposeOptions> {
    return {
        ...DEFAULT_OPTIONS,
        ...options
    };
}


function newMemoContext(): BRittMemoContext {
    return {
        powCache: new Map<string, bigint>(),
        divisorsCache: new Map<string, bigint[]>()
    };
}


export { bRittDecompose, bRittRecompose }
export type { BRittDecomposeOptions }
