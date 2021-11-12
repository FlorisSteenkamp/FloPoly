import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bInvert } from '../../../src/index.js';


describe('bInvert', function() {
	it('should correctly invert some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
		let p3 = [4n,3n,2n,1n];
		assert(bEqual(bInvert(p1), []));
		assert(bEqual(bInvert(p2), [1n]));
		assert(bEqual(bInvert(p3), [1n,2n,3n,4n]));
	});
});