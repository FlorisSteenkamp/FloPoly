
import { expect } from 'chai';
import { describe } from 'mocha';

import { scaleFloatssToBigintss } from '../../src/index';


describe('scaleFloatssToBigintss', function() {
	it('should scale the given array of array of floats to bigints', 
	function() {
		let p = [[0.000000000000000001, 324345345345341.1],[2],[3]];
		let res = scaleFloatssToBigintss(p);
		expect(res).to.eql([
			[1298074214633707n, 421024329429252125037909724959982329298589581312n],
			[2596148429267413814265248164610048n],
			[3894222643901120721397872246915072n]
		]);

		let p3 = [[0, 2], [0]];
		let res3 = scaleFloatssToBigintss(p3);
		expect(res3).to.eql([
			[0n, 1n], [0n]
		]);
	});
});