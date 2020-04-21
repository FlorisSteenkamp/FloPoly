
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { hornerErrorBound } from '../../src/index';


describe('hornerErrorBound', function() {
	it('should correctly find error bound for some polynomials at some point', 
	function() {
		let p1 = [1.1,2.2,-3.3];
		let e = hornerErrorBound(p1, 1.5);
		console.log(e)
		expect(e).to.equal(6.0451643690839824e-15);
	});
});
