import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';


describe('multiply', function() {
	it('should correctly multiply some polynomials with bigint coefficients',
	function() {
		let p1 = [2n];
		let p2: bigint[] = [];
		let p3 = [1n,2n,3n];
		let p4 = [4n,4n,5n,6n,7n];
		expect(bEqual(bMultiply(p1,p3), [2n,4n,6n])).toBeTruthy();
		expect(bEqual(bMultiply(p2,p3), [])).toBeTruthy();
		expect(bEqual(bMultiply(p3,p4), [4n, 12n, 25n, 28n, 34n, 32n, 21n])).toBeTruthy();
	});
});