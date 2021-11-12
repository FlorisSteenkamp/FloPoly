
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { Horner, hornerWithRunningError } from '../../../src/index.js';

// see also the file: e-e-horner.spec.ts

describe('Horner', function() {
	it('should evaluate some polynomials correctly at some values', 
	function() {
		let p1 = [0.1,0.2,0.3,2,3,5,11.11];
        let p2 = [0.1,0.2,0.3,2,3,5,0];
        
        let p11_ = hornerWithRunningError(p1,3);
        let p21_ = hornerWithRunningError(p2,2.2);
        let p12_ = hornerWithRunningError(p1,1.002);
        let p22_ = hornerWithRunningError(p2,1212);
        
		expect(p11_).to.eql([252.91000000000003, 2.4393931319366407e-13]);
		expect(p21_).to.eql([75.4889344, 6.298927033299153e-14]);
		expect(p12_).to.eql([21.749657257644827, 6.821482641739818e-15]);
		expect(p22_).to.eql([317491919306866370, 422.92591894871236]);
	});
});