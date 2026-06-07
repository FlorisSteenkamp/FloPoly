import { describe, expect, it } from '@jest/globals';
import { bAdd } from '../../../src/basic/bigint/b-add.js';


describe('bAdd', function() {
	it('should add some polynomials with bigint coefficients correctly', 
	function() {
		let p1 = [3n,4n];
		let p2 = [1n,2n,3n];
		let p3 = [3n,2n,1n];
		expect(bAdd(p1,p2)).toEqual([1n,5n,7n]);
		expect(bAdd(p2,p1)).toEqual([1n,5n,7n]);
		expect(bAdd(p3,p2)).toEqual([4n,4n,4n]);
	});
});