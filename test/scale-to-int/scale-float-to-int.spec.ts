
import { expect } from 'chai';
import { describe } from 'mocha';

import { scaleFloatToInt } from '../../src/index';


describe('scaleFloatToInt', function() {
	it('should scale the given float to a double precision integer value', 
	function() {
		let p1 = 0.000000000000000001;
		let res1 = scaleFloatToInt(p1);
		expect(res1).to.eql(1298074214633707);

		let p2 = 0;
		let res2 = scaleFloatToInt(p2);
		expect(res2).to.eql(0);
	});
});