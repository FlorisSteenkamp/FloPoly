
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eChangeVariablesLinear } from '../../../src/index';


describe('eChangeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1],[2],[7]];
		assert(eEqual(eChangeVariablesLinear(p1, 3, 4), []));
		assert(eEqual(eChangeVariablesLinear(p2, 3, 4), [[9],[30],[31]]));
	});
});