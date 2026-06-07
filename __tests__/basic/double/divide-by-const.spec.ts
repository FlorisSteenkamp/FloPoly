import { describe, expect, it } from '@jest/globals';

import { divideByConst } from '../../../src/basic/double/divide-by-const.js';


describe('divideByConst', function() {
	it('should correctly divide some polynomials with double precision coefficients by a constant', 
	function() {
		let p1: number[] = [];
        let p2 = [1.1,2.2,3.3,4.4];
        let inf = Number.POSITIVE_INFINITY;
		expect(divideByConst(p1,2)).toEqual([]);
        expect(divideByConst(p2,2)).toEqual([0.55,1.1,1.65,2.2]);
        expect(divideByConst(p2,0)).toEqual([inf,inf,inf,inf]);
	});
});