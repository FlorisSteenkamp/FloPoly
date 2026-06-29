import { describe, expect, it } from '@jest/globals';

import { bContent } from '../../../src/factor/bigint/b-content.js';


describe('bContent', function() {
    it('should calculate the correct content of some polynomials', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n];
        let p3 = [-10n, 5n, 5n]; //=> cont(p3) = cont(-10x² + 5x + 5) = -5
        let p4 = [10n, 5n, 5n];  //=> cont(p4) = cont( 10x² + 5x + 5) =  5
        expect(bContent(p1)).toEqual(1n);
        expect(bContent(p2)).toEqual(1n);
        expect(bContent(p3)).toEqual(-5n);
        expect(bContent(p4)).toEqual(5n);
    });
});

