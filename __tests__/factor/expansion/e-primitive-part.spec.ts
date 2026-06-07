import { describe, expect, it } from '@jest/globals';

import { ePrimitivePart } from '../../../src/factor/expansion/e-primitive-part.js';


describe('ePrimitivePart', function() {
	it('should calculate the correct primitive part of some polynomials', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
        let p3 = [[-10], [5], [5]]; //=> pp(p3) = pp(-10x² + 5x + 5) = 2x² - 1x - 1
        let p4 = [[10], [5], [5]];  //=> pp(p4) = pp( 10x² + 5x + 5) = 2x² + 1x + 1
		expect(ePrimitivePart(p1)).toEqual([]);
		expect(ePrimitivePart(p2)).toEqual([[1]]);
        expect(ePrimitivePart(p3)).toEqual([[2],[-1],[-1]]);
        expect(ePrimitivePart(p4)).toEqual([[2],[1],[1]]);
	});
});

