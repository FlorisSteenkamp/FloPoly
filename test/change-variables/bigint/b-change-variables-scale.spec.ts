
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bChangeVariablesScale } from '../../../src/index.js';


describe('bChangeVariablesScale', function() {
	it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,7n];
		assert(bEqual(bChangeVariablesScale(p1, 3n), []));
		assert(bEqual(bChangeVariablesScale(p2, 3n), [9n,6n,7n]));
	});
});