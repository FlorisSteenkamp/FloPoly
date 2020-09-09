
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eInvert } from '../../../src/index';


describe('eInvert', function() {
	it('should correctly invert some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[4],[3],[2],[1]];
		assert(eEqual(eInvert(p1), []));
		assert(eEqual(eInvert(p2), [[1]]));
		assert(eEqual(eInvert(p3), [[1],[2],[3],[4]]));
	});
});