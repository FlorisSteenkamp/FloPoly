
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { content } from '../../../src/index.js';


describe('content', function() {
	it('should calculate the correct content of some polynomials', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
        let p3 = [-10, 5, 5]; //=> cont(p3) = cont(-10x² + 5x + 5) = -5
        let p4 = [10, 5, 5];  //=> cont(p4) = cont( 10x² + 5x + 5) =  5
		expect(content(p1)).to.eql(1);
		expect(content(p2)).to.eql(1);
        expect(content(p3)).to.eql(-5);
        expect(content(p4)).to.eql(5);
	});
});

