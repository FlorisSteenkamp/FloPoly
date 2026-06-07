import { describe, expect, it } from '@jest/globals';


import { scaleFloatToInt } from '../../src/scale-to-int/scale-float-to-int.js';


describe('scaleFloatToInt', function() {
	it('should scale the given float to a double precision integer value', 
	function() {
		let p1 = 0.000000000000000001;
		let res1 = scaleFloatToInt(p1);
		expect(res1).toEqual(1298074214633707);

		let p2 = 0;
		let res2 = scaleFloatToInt(p2);
		expect(res2).toEqual(0);
	});
});