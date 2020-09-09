
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, changeVariablesScale } from '../../../src/index';


describe('changeVariablesScale', function() {
	it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1,2,7];
		assert(equal(changeVariablesScale(p1, 3), []));
		assert(equal(changeVariablesScale(p2, 3), [9,6,7]));
	});
});