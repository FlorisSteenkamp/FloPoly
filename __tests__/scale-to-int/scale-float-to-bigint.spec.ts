import { describe, expect, it } from '@jest/globals';

import { scaleFloatToBigint } from '../../src/scale-to-int/scale-float-to-bigint.js';


describe('scaleFloatToBigint', function() {
	it('should scale the given float to a bigint', 
	function() {
		let p = 0.000000000000000004;
		let res = scaleFloatToBigint(p);
		expect(res === 1298074214633707n).toBeTruthy();

		let p2 = 0;
		let res2 = scaleFloatToBigint(p2);
		expect(res2 === 0n).toBeTruthy();
	});
});