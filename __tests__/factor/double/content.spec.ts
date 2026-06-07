import { describe, expect, it } from '@jest/globals';

import { content } from '../../../src/factor/double/content.js';


describe('content', function() {
	it('should calculate the correct content of some polynomials', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
        let p3 = [-10, 5, 5]; //=> cont(p3) = cont(-10x² + 5x + 5) = -5
        let p4 = [10, 5, 5];  //=> cont(p4) = cont( 10x² + 5x + 5) =  5
		expect(content(p1)).toEqual(1);
		expect(content(p2)).toEqual(1);
        expect(content(p3)).toEqual(-5);
        expect(content(p4)).toEqual(5);
	});
});

