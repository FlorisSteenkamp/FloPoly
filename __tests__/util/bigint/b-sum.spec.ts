import { describe, expect, it } from '@jest/globals';
import { bSum } from '../../../src/util/bigint/b-sum.js';


describe('bSum', function() {
    it('should sum an array of bigints', function() {
        expect(bSum([])).toEqual(0n);
        expect(bSum([5n])).toEqual(5n);
        expect(bSum([1n, 2n, 3n, -4n])).toEqual(2n);
        expect(bSum([10n**30n, 10n**30n])).toEqual(2n*10n**30n);
    });
});
