
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { isRationalMultipleOf } from '../../../src/index';


describe('isRationalMultipleOf', function() {
	it('should correctly check if some polynomials are rational multiples of some others', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
        let p3 = [4,3,2,1];
		let p4 = p3.map(c => 7.0001220703125*c);
		let p5 = p3.map(c => -3*c);
		let p6 = [-1];
		let p7 = [5];
        
		// everything is a rational multiple of the empty polynomial
		assert(isRationalMultipleOf(p1, p1), `p1 = ${p1} and p1 = ${p1} should report as rational multiples of each other`);
        assert(isRationalMultipleOf(p1, p2), `p1 = ${p1} and p2 = ${p2} should report as rational multiples of each other`);
        assert(isRationalMultipleOf(p1, p3), `p1 = ${p1} and p3 = ${p3} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p1, p4), `p1 = ${p1} and p4 = ${p4} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p1, p5), `p1 = ${p1} and p5 = ${p5} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p1, p6), `p1 = ${p1} and p6 = ${p6} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p1, p7), `p1 = ${p1} and p7 = ${p7} should report as rational multiples of each other`);

		assert(isRationalMultipleOf(p2, p1), `p2 = ${p2} and p1 = ${p1} should report as rational multiples of each other`);
        assert(isRationalMultipleOf(p3, p1), `p3 = ${p3} and p1 = ${p1} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p4, p1), `p4 = ${p4} and p1 = ${p1} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p5, p1), `p5 = ${p5} and p1 = ${p1} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p6, p1), `p6 = ${p6} and p1 = ${p1} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p7, p1), `p7 = ${p7} and p1 = ${p1} should report as rational multiples of each other`);
		
		// p3, p4 and p5 are rational multiples of each other
		assert(isRationalMultipleOf(p3, p3), `p3 = ${p3} and p3 = ${p3} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p3, p4), `p3 = ${p3} and p4 = ${p4} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p3, p5), `p3 = ${p3} and p5 = ${p5} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p4, p4), `p4 = ${p4} and p4 = ${p4} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p4, p5), `p4 = ${p4} and p5 = ${p5} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p5, p5), `p5 = ${p5} and p5 = ${p5} should report as rational multiples of each other`);

		assert(isRationalMultipleOf(p4, p3), `p4 = ${p4} and p3 = ${p3} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p5, p3), `p5 = ${p5} and p3 = ${p3} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p5, p4), `p5 = ${p5} and p4 = ${p4} should report as rational multiples of each other`);
		
		// p2, p6 and p7 are not rational multiples of p3, p4, p5
		assert(!isRationalMultipleOf(p2, p3), `p2 = ${p2} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p2, p4), `p2 = ${p2} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p2, p5), `p2 = ${p2} and p5 = ${p5} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p6, p3), `p6 = ${p6} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p6, p4), `p6 = ${p6} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p6, p5), `p6 = ${p6} and p5 = ${p5} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p7, p3), `p7 = ${p7} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p7, p4), `p7 = ${p7} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p7, p5), `p7 = ${p7} and p5 = ${p5} should NOT report as rational multiples of each other`);

		assert(!isRationalMultipleOf(p3, p2), `p3 = ${p3} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p4, p2), `p4 = ${p4} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p5, p2), `p5 = ${p5} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p3, p6), `p3 = ${p3} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p4, p6), `p4 = ${p4} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p5, p6), `p5 = ${p5} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p3, p7), `p3 = ${p3} and p7 = ${p7} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p4, p7), `p4 = ${p4} and p7 = ${p7} should NOT report as rational multiples of each other`);
		assert(!isRationalMultipleOf(p5, p7), `p5 = ${p5} and p7 = ${p7} should NOT report as rational multiples of each other`);

		// p2, p6 and p7 are rational multiples of each other
		assert(isRationalMultipleOf(p2, p2), `p2 = ${p2} and p2 = ${p2} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p2, p6), `p2 = ${p2} and p6 = ${p6} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p2, p7), `p2 = ${p2} and p7 = ${p7} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p6, p6), `p6 = ${p6} and p6 = ${p6} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p6, p7), `p6 = ${p6} and p7 = ${p7} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p7, p7), `p7 = ${p7} and p7 = ${p7} should report as rational multiples of each other`);

		assert(isRationalMultipleOf(p6, p2), `p6 = ${p6} and p2 = ${p2} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p7, p2), `p7 = ${p7} and p2 = ${p2} should report as rational multiples of each other`);
		assert(isRationalMultipleOf(p7, p6), `p7 = ${p7} and p6 = ${p6} should report as rational multiples of each other`);

		// close but p8[0] is 1 too big
		let p8 = [34677717130752820, 26008287848064616, 17338858565376410, 8669429282688205];
		assert(!isRationalMultipleOf(p3, p8), `p3 = ${p3} and p8 = ${p8} should NOT report as rational multiples of each other`);

		let p9 = [8,6,4,4];
		assert(!isRationalMultipleOf(p3, p9), `p3 = ${p3} and p9 = ${p9} should NOT report as rational multiples of each other`);
	});
});