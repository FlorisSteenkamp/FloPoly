
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bChangeVariablesLinear } from '../../../src/index';


describe('bChangeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,7n];
		assert(bEqual(bChangeVariablesLinear(p1, 3n, 4n), []));
		assert(bEqual(bChangeVariablesLinear(p2, 3n, 4n), [9n,30n,31n]));
	});
});