import { describe, expect, it } from '@jest/globals';
import { bMultiply } from '../../../../src/basic/bigint/b-multiply.js';
import { bYunsAlgorithm } from '../../../../src/roots/yun/bigint/b-yun-algorithm.js';


function powFactor(f: bigint[], n: number): bigint[] {
    let r = [1n];
    for (let i=0; i<n; i++) {
        r = bMultiply(r, f);
    }

    return r;
}


describe('bYunsAlgorithm', function() {
    it('should return square-free factors with multiplicities', function() {
        const a = [1n, -1n];
        const b = [1n, 2n];
        const p = bMultiply(powFactor(a, 2), powFactor(b, 3));

        const r = bYunsAlgorithm(p);

        expect(r).toEqual([
            { factor: [1n, -1n], multiplicity: 2 },
            { factor: [1n, 2n], multiplicity: 3 }
        ]);
    });

    it('should return a single multiplicity-1 factor for a square-free polynomial', function() {
        const p = [1n, -2n, -3n]; // (x - 3)(x + 1)

        const r = bYunsAlgorithm(p);

        expect(r).toEqual([
            { factor: [1n, -2n, -3n], multiplicity: 1 }
        ]);
    });

    it('should ignore content and handle constants', function() {
        expect(bYunsAlgorithm([7n])).toEqual([]);

        const p = [2n, -4n, 2n]; // 2(x - 1)^2
        const r = bYunsAlgorithm(p);

        expect(r).toEqual([
            { factor: [1n, -1n], multiplicity: 2 }
        ]);
    });
});
