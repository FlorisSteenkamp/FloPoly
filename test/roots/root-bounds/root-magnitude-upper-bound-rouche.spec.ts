
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { rootMagnitudeUpperBound_rouche } from '../../../src/index';


describe('rootMagnitudeUpperBound_rouche', function() {
	it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
	function() {
		let p = [2,-3,6,5,-130];

		expect(rootMagnitudeUpperBound_rouche(p)).to.equal(66);
	});
});