
import { expect } from 'chai';
import { describe } from 'mocha';

import { scaleFloatsToBigints } from '../../src/index.js';


describe('scaleFloatsToBigints', function() {
	it('should scale the given array of floats to bigints', 
	function() {
		let p = [0.000000000000000001, 324345345345341.1, 2, 3];
		let res = scaleFloatsToBigints(p);
		expect(res).to.eql([
			1298074214633707n,
      		421024329429252125037909724959982329298589581312n,
      		2596148429267413814265248164610048n,
      		3894222643901120721397872246915072n
		]);

		let p3 = [0, 2];
		let res3 = scaleFloatsToBigints(p3);
		expect(res3).to.eql([
			0n, 1n
		]);

		let p4 = [
			1,
			-3.08,
			3.6491000000000002,
			-2.1202,
			0.6470400000000001,
			-0.103545,
			0.008074890000000001,
			-0.00024057,
			0
		]
		let res4 = scaleFloatsToBigints(p4);
		//console.log(res4);
		expect(res4).to.eql([
			 18446744073709551616n,
			-56815971747025420288n,
			 67314013799373529088n,
			-39110786785078992896n,
 			 11935781285453029376n,
			 -1910068115112255488n,
			   148955429253356544n,
			    -4437733221812307n,
			    0n
		]);


		// the trivial case
		let p5 = [3, 7];
		let res5 = scaleFloatsToBigints(p5);
		expect(res5).to.eql([
			3n, 7n
		]);
	});
});