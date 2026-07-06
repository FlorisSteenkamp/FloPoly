import { squares } from 'squares-rng';
import { bGcdInt } from "./b-integer-gcd.js";
import { bLandauMignotteBound } from "./landau-mignotte-bound.js";
import { bPrimitivePart } from '../../factor/bigint/b-primitive-part.js';
import { bDivides } from "../../basic/bigint/b-divides.js";
import { chineseRemainderAlgorithm } from "./chinese-remainder-algorithm.js";
import { bGcdModP } from "./b-gcd-mod-p.js";
import { bInverseModP } from "../../euclidean-division-related/bigint/b-inverse-mod-p.js";
import { bMod } from "./b-mod.js";
import { primes } from './build-large-prime-pool.js';

const { ceil } = Math;


let primesShuffled: bigint[];


function buildShuffledPrimePool(): bigint[] {
    const pool = primes;
    const arr = pool.slice();

    // Deterministic Fisher-Yates shuffle using squares-rng output as entropy.
    for (let i=arr.length - 1; i>0; i--) {
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
function bGcdModular(
        a: bigint[],
        b: bigint[]): bigint[] {

    if (a.length === 0) { return b; }
    if (b.length === 0) { return a; }

    // (1)
    // d := gcd(lc(a), lc(b));
    // M := 2·d·(Landau Mignotte Bound for a, b);
    const d = bGcdInt(a[0],b[0]);
    const M = 2n*d*BigInt(ceil(bLandauMignotteBound(a,b)));

    let primeIdx = 0;
    let p: bigint;
    let dModP: bigint;
    let g: bigint[];

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
        if (g.length <= 1) { return [1n]; }
        let P = p;

        // (4)
        // while P ≤ M do
        //    p := a new prime not dividing d;
        //    c(p) := gcd(a(p), b(p)); [with lc(c(p)) = 1]
        //    g(p) := (d mod p) · c(p);
        //    if deg(g(p)) < deg(g) then goto (3);
        //    if deg(g(p)) = deg(g) then g := CRA(g, g(p), P, p); P := P·p
        while (P <= M) {
            let g$p: bigint[];
            ({ p, dModP, primeIdx, g: g$p } = getNextGoodGp(a, b, d, primeIdx));

            if (g$p.length < g.length) {
                g = g$p;
                if (g.length <= 1) { return [1n]; }
                P = p;
                continue; // goto (3)
            }

            if (g$p.length === g.length) {
                g = g.map((c, idx) => chineseRemainderAlgorithm(c, g$p[idx], P, p));
                P = P*p;
            }
        }

        // (5)
        // g := pp(g);  (pp -> Primitive Part)
        // if g | a and g | b then return g;
        // goto (2)

        g = bPrimitivePart(fromResidues(g, P));
        if (bDivides(g,a) && bDivides(g,b)) {
            return g;
        }
    }
}


function getNextGoodGp(
        a: bigint[],
        b: bigint[],
        d: bigint,
        primeIdx: number): { p: bigint; dModP: bigint; primeIdx: number; g: bigint[]; } {

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


function getGp(
        a: bigint[],
        b: bigint[],
        dModP: bigint,
        p: bigint): bigint[] | undefined {

    const a$p = a.map(c => bMod(c, p));
    const b$p = b.map(c => bMod(c, p));

    // If `b` reduces to zero modulo `p`, modular division in bGcdModP would
    // be ill-defined for this prime; skip this prime.
    if (b$p.every(c => c === 0n)) {
        return undefined;
    }

    const c$p = makeMonicModP(bGcdModP(a$p, b$p, p), p);

    return c$p.map(c => bMod(dModP*c, p));
}


function makeMonicModP(
        p_: bigint[],
        p: bigint): bigint[] {

    if (p_.length === 0) { return []; }

    const lcInv = bInverseModP(p_[0], p);
    return p_.map(c => bMod(c*lcInv, p));
}


function fromResidues(
        p_: bigint[],
        m: bigint): bigint[] {

    const halfM = m / 2n;
    return p_.map(c => {
        const r = bMod(c, m);
        return r > halfM ? r - m : r;
    });
}


function newPrimeNotDividingD(
        d: bigint,
        primeIdx: number) {

    let p: bigint;
    let dModP: bigint;
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


export { bGcdModular }
