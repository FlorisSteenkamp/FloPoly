
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bChangeVariablesTranslateX } from '../../../src/index';


describe('bChangeVariablesTranslateX', function() {
	it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,7n];
		assert(bEqual(bChangeVariablesTranslateX(p1, 3n), []));
		assert(bEqual(bChangeVariablesTranslateX(p2, 3n), [1n,8n,22n]));
	});
});