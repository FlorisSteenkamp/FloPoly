import { describe, expect, it } from '@jest/globals';

import { bMultiplyByConst } from '../../../src/basic/bigint/b-multiply-by-const.js';


describe('bMultiplyByConst', function() {
	it('should correctly multiply some polynomials with bigint coefficients by a constant', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,3n,4n];
		expect(bMultiplyByConst(2n,p1)).toEqual([]);
		expect(bMultiplyByConst(2n,p2)).toEqual([2n,4n,6n,8n]);
	});
	
	
	it('should return the zero polynomial if the polynomial was multiplied by 0', 
	function() {
		let p1 = [1n,2n,3n,4n];
		expect(bMultiplyByConst(0n,p1)).toEqual([]);
	});
});