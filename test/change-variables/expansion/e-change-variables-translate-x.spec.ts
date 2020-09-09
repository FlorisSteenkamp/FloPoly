
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eChangeVariablesTranslateX } from '../../../src/index';


describe('eChangeVariablesTranslateX', function() {
	it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1],[2],[7]];
		assert(eEqual(eChangeVariablesTranslateX(p1, 3), []));
		assert(eEqual(eChangeVariablesTranslateX(p2, 3), [[1],[8],[22]]));
	});
});