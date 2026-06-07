import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { changeVariablesTranslateX } from '../../../src/change-variables/double/change-variables-translate-x.js';


describe('changeVariablesTranslateX', function() {
	it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1,2,7];
		expect(equal(changeVariablesTranslateX(p1, 3), [])).toBeTruthy();
		expect(equal(changeVariablesTranslateX(p2, 3), [1,8,22])).toBeTruthy();
	});
});