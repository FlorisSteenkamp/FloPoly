
import { expect } from 'chai';
import { describe } from 'mocha';

import { add, scalePolyToIntsExp } from '../../src/index';

describe('scale poly to integer coefficients', function() {
	it('should scale poly to integer coefficients correctly', 
	function() {
		let p = [[0.000000000000000001, 324345345345341.1],[2],[3]];
		let res = scalePolyToIntsExp(p);
		expect(res).to.eql([
			[1298074214633707, 4.210243294292521e+47],
			[2.596148429267414e+33],
			[3.894222643901121e+33]
		]);
	});
});