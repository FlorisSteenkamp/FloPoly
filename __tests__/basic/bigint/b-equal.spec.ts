import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';


describe('bEqual', function() {
	it('should check some polynomials with bigint coefficients are correctly given as equal or not', 
	function() {
		let p1 = [10n, 5n];
		let p2 = [10n, 5n];
		let p3 = [10n, 6n];
		let p4 = [1n, 10n, 6n];
		let p5: bigint[] = [];
		let p6: bigint[] = [];
		
		expect(bEqual(p1,p2)).toBeTruthy(); 
		expect(!bEqual(p1,p3)).toBeTruthy();
		expect(!bEqual(p3,p4)).toBeTruthy();
		expect(bEqual(p5,p6)).toBeTruthy();
		expect(!bEqual(p1,p6)).toBeTruthy();
	});
});
