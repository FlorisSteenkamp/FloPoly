import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bReflectAboutYAxis } from '../../../src/change-variables/bigint/b-reflect-about-y-axis.js';


describe('bReflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with bigint coefficients about the y axis', 
	function() {
		let p1: bigint[] = [];
		let p2 = [5n,4n,3n,2n,1n];
		expect(bEqual(bReflectAboutYAxis(p1), [])).toBeTruthy();
		expect(bEqual(bReflectAboutYAxis(p2), [5n,-4n,3n,-2n,1n])).toBeTruthy();
	});
});