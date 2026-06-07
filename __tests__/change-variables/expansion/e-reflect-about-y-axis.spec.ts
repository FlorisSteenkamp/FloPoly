import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eReflectAboutYAxis } from '../../../src/change-variables/expansion/e-reflect-about-y-axis.js';


describe('eReflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with Shewchuk expansion coefficients about the y axis', 
	function() {
		let p1: number[][] = [];
		let p2 = [[5],[4],[3],[2],[1]];
		expect(eEqual(eReflectAboutYAxis(p1), [])).toBeTruthy();
		expect(eEqual(eReflectAboutYAxis(p2), [[5],[-4],[3],[-2],[1]])).toBeTruthy();
	});
});