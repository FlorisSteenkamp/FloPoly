import { describe, expect, it } from '@jest/globals';

import { add } from '../../../src/basic/double/add.js';


describe('add', function() {
	it('should add some polynomials with double precision coefficients correctly', 
	function() {
		let p1 = [3,4];
		let p2 = [1,2,3];
		let p3 = [3,2,1];
		expect(add(p1,p2)).toEqual([1,5,7]);
		expect(add(p2,p1)).toEqual([1,5,7]);
		expect(add(p3,p2)).toEqual([4,4,4]);
	});
});