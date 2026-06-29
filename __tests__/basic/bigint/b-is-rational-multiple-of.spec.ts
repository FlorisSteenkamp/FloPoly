import { describe, expect, it } from '@jest/globals';
import { bIsRationalMultipleOf } from '../../../src/basic/bigint/b-is-rational-multiple-of.js';


describe('bIsRationalMultipleOf', function() {
    it('should correctly check if some polynomials are rational multiples of some others', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n];
        let p3 = [4n,3n,2n,1n];
        let p4 = p3.map(c => 7n*c);
        let p5 = p3.map(c => -3n*c);
        let p6 = [-1n];
        let p7 = [5n];
        
        // everything is a rational multiple of the empty polynomial
        expect(bIsRationalMultipleOf(p1, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p2)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p3)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p4)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p5)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p6)).toEqual(true);
        expect(bIsRationalMultipleOf(p1, p7)).toEqual(true);

        expect(bIsRationalMultipleOf(p2, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p3, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p4, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p5, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p6, p1)).toEqual(true);
        expect(bIsRationalMultipleOf(p7, p1)).toEqual(true);
        
        // p3, p4 and p5 are rational multiples of each other
        expect(bIsRationalMultipleOf(p3, p3)).toEqual(true);
        expect(bIsRationalMultipleOf(p3, p4)).toEqual(true);
        expect(bIsRationalMultipleOf(p3, p5)).toEqual(true);
        expect(bIsRationalMultipleOf(p4, p4)).toEqual(true);
        expect(bIsRationalMultipleOf(p4, p5)).toEqual(true);
        expect(bIsRationalMultipleOf(p5, p5)).toEqual(true);

        expect(bIsRationalMultipleOf(p4, p3)).toEqual(true);
        expect(bIsRationalMultipleOf(p5, p3)).toEqual(true);
        expect(bIsRationalMultipleOf(p5, p4)).toEqual(true);
        
        // p2, p6 and p7 are not rational multiples of p3, p4, p5
        expect(!bIsRationalMultipleOf(p2, p3)).toEqual(true);
        expect(!bIsRationalMultipleOf(p2, p4)).toEqual(true);
        expect(!bIsRationalMultipleOf(p2, p5)).toEqual(true);
        expect(!bIsRationalMultipleOf(p6, p3)).toEqual(true);
        expect(!bIsRationalMultipleOf(p6, p4)).toEqual(true);
        expect(!bIsRationalMultipleOf(p6, p5)).toEqual(true);
        expect(!bIsRationalMultipleOf(p7, p3)).toEqual(true);
        expect(!bIsRationalMultipleOf(p7, p4)).toEqual(true);
        expect(!bIsRationalMultipleOf(p7, p5)).toEqual(true);

        expect(!bIsRationalMultipleOf(p3, p2)).toEqual(true);
        expect(!bIsRationalMultipleOf(p4, p2)).toEqual(true);
        expect(!bIsRationalMultipleOf(p5, p2)).toEqual(true);
        expect(!bIsRationalMultipleOf(p3, p6)).toEqual(true);
        expect(!bIsRationalMultipleOf(p4, p6)).toEqual(true);
        expect(!bIsRationalMultipleOf(p5, p6)).toEqual(true);
        expect(!bIsRationalMultipleOf(p3, p7)).toEqual(true);
        expect(!bIsRationalMultipleOf(p4, p7)).toEqual(true);
        expect(!bIsRationalMultipleOf(p5, p7)).toEqual(true);

        // p2, p6 and p7 are rational multiples of each other
        expect(bIsRationalMultipleOf(p2, p2)).toEqual(true);
        expect(bIsRationalMultipleOf(p2, p6)).toEqual(true);
        expect(bIsRationalMultipleOf(p2, p7)).toEqual(true);
        expect(bIsRationalMultipleOf(p6, p6)).toEqual(true);
        expect(bIsRationalMultipleOf(p6, p7)).toEqual(true);
        expect(bIsRationalMultipleOf(p7, p7)).toEqual(true);

        expect(bIsRationalMultipleOf(p6, p2)).toEqual(true);
        expect(bIsRationalMultipleOf(p7, p2)).toEqual(true);
        expect(bIsRationalMultipleOf(p7, p6)).toEqual(true);

        // close but p8[0] is 1 too big
        let p8 = [34677717130752820n, 26008287848064616n, 17338858565376410n, 8669429282688205n];
        expect(!bIsRationalMultipleOf(p3, p8)).toEqual(true);

        let p9 = [8n,6n,4n,4n];
        expect(!bIsRationalMultipleOf(p3, p9)).toEqual(true);
    });
});