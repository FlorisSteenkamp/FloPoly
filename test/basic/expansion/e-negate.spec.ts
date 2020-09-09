
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eNegate } from '../../../src/index';


describe('eNegate', function() {
	it('should correctly negate some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1 = [[0.1], [-0.2]];
		assert(eEqual(eNegate(p1), [[-0.1], [0.2]]));
	});
});