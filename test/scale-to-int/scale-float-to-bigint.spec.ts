import { expect, assert } from 'chai';
import { describe } from 'mocha';

import { scaleFloatToBigint } from '../../src/index.js';


describe('scaleFloatToBigint', function() {
	it('should scale the given float to a bigint', 
	function() {
		let p = 0.000000000000000004;
		let res = scaleFloatToBigint(p);
		assert(res === 1298074214633707n, `scaleFloatToBigint(${p}) should equal 1298074214633707n, but is ${res}`);

		let p2 = 0;
		let res2 = scaleFloatToBigint(p2);
		assert(res2 === 0n, `scaleFloatToBigint(${p}) should equal ${0}, but is ${res2}`);
	});
});