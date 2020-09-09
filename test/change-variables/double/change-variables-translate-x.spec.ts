
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, changeVariablesTranslateX } from '../../../src/index';


describe('changeVariablesTranslateX', function() {
	it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1,2,7];
		assert(equal(changeVariablesTranslateX(p1, 3), []));
		assert(equal(changeVariablesTranslateX(p2, 3), [1,8,22]));
	});
});