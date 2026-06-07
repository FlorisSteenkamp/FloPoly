import { describe, expect, it } from '@jest/globals';

import { subtract } from '../../../src/basic/double/subtract.js';


describe('subtract', function() {
	it('should correctly subtract some polynomials with double precision coefficients from each other', 
	function() {
		let p1 = [  2,3];
		let p2 = [4,4,4];
		let p3 = [2,1,2];
		let p4: number[] = [];
			
		expect(subtract(p1,p2)).toEqual([-4,-2,-1]);
		expect(subtract(p2,p1)).toEqual([4,2,1]);
		expect(subtract(p2,p3)).toEqual([2,3,2]);
		expect(subtract(p2,p4)).toEqual([4,4,4]);
		expect(subtract(p4,p2)).toEqual([-4,-4,-4]);
	});
});