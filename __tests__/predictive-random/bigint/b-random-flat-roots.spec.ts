import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatRoots } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatRoots', function() {
    it('should predictably generate a polynomial with Roots in a flat random distribution', 
    function() {
        let res: { p: bigint[], seed: number };
        
        res = bFlatRoots(3,0,10); 
        expect(bEqual(res.p, [
            70368744177664n,
            -1227601024122880n,
            6822178387552453n,
            -12112899480573378n
        ])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
        
        res = bFlatRoots(3,0,10); 
        expect(bEqual(res.p, [
            70368744177664n,
            -1227601024122880n,
            6822178387552453n,
            -12112899480573378n
        ])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
        
        res = bFlatRoots(3); // Uses defaults for range
        expect(bEqual(res.p, [
            18014398509481984n,
            -31426586217545728n,
            17464776672134282n,
            -3100902267026785n
        ])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
    });
});