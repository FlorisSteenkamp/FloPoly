import { describe, expect, it } from '@jest/globals';
import { bGcdPrs } from '../../../src/gcd/bigint/b-gcd-prs.js';
import { bGcdModular } from '../../../src/gcd/bigint/b-gcd-modular.js';
import { bIsRationalMultipleOf } from '../../../src/basic/bigint/b-is-rational-multiple-of.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';
import { bDifferentiate } from '../../../src/calculus/bigint/b-differentiate.js';
import { bFromRoots } from '../../../src/roots/from-roots/bigint/b-from-roots.js';
import { squares } from 'squares-rng';


type BenchCase = {
    name: string;
    a: bigint[];
    b: bigint[];
    repeats: number;
};


function randomSigned64(seed: number): bigint {
    const hi = BigInt(squares(seed) >>> 0);
    const lo = BigInt(squares(seed + 1) >>> 0);
    const x = (hi << 32n) + lo;

    // Convert to signed 64-bit range [-2^63, 2^63-1].
    const s = x >= (1n << 63n) ? x - (1n << 64n) : x;

    return s === 0n ? 1n : s;
}


function makeRandomPoly(
        degree: number,
        seedStart: number): bigint[] {

    const p = new Array<bigint>(degree + 1);
    for (let i=0; i<=degree; i++) {
        p[i] = randomSigned64(seedStart + 2*i);
    }

    // Ensure leading coefficient is nonzero.
    if (p[0] === 0n) {
        p[0] = 1n;
    }

    return p;
}


function makeDerivativeCaseFromRoots(
        name: string,
        roots: bigint[],
        repeats: number): BenchCase {

    const p = bFromRoots(roots);
    const dp = bDifferentiate(p);

    return { name, a: p, b: dp, repeats };
}


function makeRepeatedRootWorkload(
        distinctRootCount: number,
        scale: bigint,
        repeats: number): BenchCase {

    const roots: bigint[] = [];
    for (let i=0; i<distinctRootCount; i++) {
        const r = BigInt(i + 2) * scale;
        // Repeat each root twice to create a nontrivial gcd with derivative.
        roots.push(r, r);
    }

    const degree = roots.length;
    return makeDerivativeCaseFromRoots(
        `repeated-roots degree=${degree} scale=${scale.toString()}`,
        roots,
        repeats,
    );
}


describe('benchmark: bGcdPrs vs bGcdModular', function() {
    it('should benchmark bGcdPrs against bGcdModular on the same inputs',
    function() {
        const cases: BenchCase[] = [];

        {
            const p1 = bMultiply([2n, -2n], [3n, -3n]);
            const dp1 = bDifferentiate(p1);
            cases.push({ name: 'double-root-at-1', a: p1, b: dp1, repeats: 300 });
        }

        {
            const p1 = bMultiply([2n, -2n], [3n, -3n]);
            const p4 = bMultiply([100n, -100n], [11n, -11n]);
            const p5 = bMultiply(p1, p4);
            const dp5 = bDifferentiate(p5);
            cases.push({ name: 'quad-root-at-1', a: p5, b: dp5, repeats: 220 });
        }

        {
            const p1 = bFromRoots([7n, 7n, 6n, 7n, 8n, 9n]);
            const dp1 = bDifferentiate(p1);
            cases.push({ name: 'repeated-root-mixed', a: p1, b: dp1, repeats: 160 });
        }

        {
            const p1 = bFromRoots([1n, 5n, 6n, 7n, 8n, 9n]);
            const dp1 = bDifferentiate(p1);
            cases.push({ name: 'many-distinct-roots', a: p1, b: dp1, repeats: 160 });
        }

        // Degree / coefficient-growth sweep.
        cases.push(makeRepeatedRootWorkload(4, 1n, 140));   // degree 8
        cases.push(makeRepeatedRootWorkload(6, 1n, 100));   // degree 12
        cases.push(makeRepeatedRootWorkload(8, 1n, 70));    // degree 16
        cases.push(makeRepeatedRootWorkload(10, 1n, 50));   // degree 20
        cases.push(makeRepeatedRootWorkload(6, 1000n, 70)); // degree 12, larger roots

        // Coefficient-magnitude stress: deterministic pseudo-random coefficients
        // around 64-bit magnitude using squares-rng.
        {
            const g = makeRandomPoly(2, 1_000);
            const q1 = makeRandomPoly(4, 2_000);
            const q2 = makeRandomPoly(4, 3_000);

            cases.push({
                name: 'random-squares-64bit shared-factor degree=2',
                a: bMultiply(g, q1),
                b: bMultiply(g, q2),
                repeats: 24,
            });
        }

        const results: Array<{ name: string; repeats: number; prsMs: number; modMs: number; ratio: number; }> = [];

        for (const tc of cases) {
            // Sanity: both implementations should produce equivalent GCDs.
            const gcdPrs = bGcdPrs(tc.a, tc.b);
            const gcdMod = bGcdModular(tc.a, tc.b);
            expect(bIsRationalMultipleOf(gcdPrs, gcdMod)).toEqual(true);
            expect(bIsRationalMultipleOf(gcdMod, gcdPrs)).toEqual(true);

            // Warmup
            bGcdPrs(tc.a, tc.b);
            bGcdModular(tc.a, tc.b);

            const tPrsStart = performance.now();
            for (let r=0; r<tc.repeats; r++) {
                bGcdPrs(tc.a, tc.b);
            }
            const prsMs = performance.now() - tPrsStart;

            const tModStart = performance.now();
            for (let r=0; r<tc.repeats; r++) {
                bGcdModular(tc.a, tc.b);
            }
            const modMs = performance.now() - tModStart;

            results.push({
                name: tc.name,
                repeats: tc.repeats,
                prsMs,
                modMs,
                ratio: modMs / prsMs,
            });
        }

        const totalPrs = results.reduce((acc, r) => acc + r.prsMs, 0);
        const totalMod = results.reduce((acc, r) => acc + r.modMs, 0);

        console.log('--- bigint gcd benchmark ---');
        for (const r of results) {
            console.log(
                `${r.name} | repeats=${r.repeats} | prs=${r.prsMs.toFixed(2)}ms | modular=${r.modMs.toFixed(2)}ms | mod/prs=${r.ratio.toFixed(2)}x`
            );
        }
        console.log('--- totals ---');
        console.log(`cases: ${results.length}`);
        console.log(`bGcdPrs total ms: ${totalPrs.toFixed(2)}`);
        console.log(`bGcdModular total ms: ${totalMod.toFixed(2)}`);
        console.log(`modular/prs: ${(totalMod / totalPrs).toFixed(2)}x`);
    });
});
