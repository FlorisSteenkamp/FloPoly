
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eChangeVariablesScale } from '../../../src/index';


describe('eChangeVariablesScale', function() {
	it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1],[2],[7]];
		assert(eEqual(eChangeVariablesScale(p1, 3), []));
		assert(eEqual(eChangeVariablesScale(p2, 3), [[9],[6],[7]]));
	});
});