
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { hornerErrorBound } from '../src/index';


describe('hornerErrorBound', function() {
	it('should correctly find error bound for some polynomials at some point', 
	function() {
		let p1 = [1.1,2.2,-3.3];
		expect(hornerErrorBound(p1, 1.5)).to.equal(5.1292303737682235e-15);
	});
});
