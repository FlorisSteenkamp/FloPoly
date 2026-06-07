import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bInvert } from '../../../src/basic/bigint/b-invert.js';


describe('bInvert', function() {
	it('should correctly invert some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
		let p3 = [4n,3n,2n,1n];
		expect(bEqual(bInvert(p1), [])).toBeTruthy();
		expect(bEqual(bInvert(p2), [1n])).toBeTruthy();
		expect(bEqual(bInvert(p3), [1n,2n,3n,4n])).toBeTruthy();
	});
});