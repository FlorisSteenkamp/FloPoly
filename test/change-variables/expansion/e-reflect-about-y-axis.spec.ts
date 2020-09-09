
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eReflectAboutYAxis } from '../../../src/index';


describe('eReflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with Shewchuk expansion coefficients about the y axis', 
	function() {
		let p1: number[][] = [];
		let p2 = [[5],[4],[3],[2],[1]];
		assert(eEqual(eReflectAboutYAxis(p1), []));
		assert(eEqual(eReflectAboutYAxis(p2), [[5],[-4],[3],[-2],[1]]));
	});
});