
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, changeVariablesLinear } from '../../../src/index.js';


describe('changeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1,2,7];
		assert(equal(changeVariablesLinear(p1, 3, 4), []));
		assert(equal(changeVariablesLinear(p2, 3, 4), [9,30,31]));
	});
});