
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bReflectAboutYAxis } from '../../../src/index.js';


describe('bReflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with bigint coefficients about the y axis', 
	function() {
		let p1: bigint[] = [];
		let p2 = [5n,4n,3n,2n,1n];
		assert(bEqual(bReflectAboutYAxis(p1), []));
		assert(bEqual(bReflectAboutYAxis(p2), [5n,-4n,3n,-2n,1n]));
	});
});