import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bIsRationalMultipleOf } from '../../../src/index.js';


describe('bIsRationalMultipleOf', function() {
	it('should correctly check if some polynomials are rational multiples of some others', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
        let p3 = [4n,3n,2n,1n];
		let p4 = p3.map(c => 7n*c);
		let p5 = p3.map(c => -3n*c);
		let p6 = [-1n];
		let p7 = [5n];
        
		// everything is a rational multiple of the empty polynomial
		assert(bIsRationalMultipleOf(p1, p1), `p1 = ${p1} and p1 = ${p1} should report as rational multiples of each other`);
        assert(bIsRationalMultipleOf(p1, p2), `p1 = ${p1} and p2 = ${p2} should report as rational multiples of each other`);
        assert(bIsRationalMultipleOf(p1, p3), `p1 = ${p1} and p3 = ${p3} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p1, p4), `p1 = ${p1} and p4 = ${p4} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p1, p5), `p1 = ${p1} and p5 = ${p5} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p1, p6), `p1 = ${p1} and p6 = ${p6} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p1, p7), `p1 = ${p1} and p7 = ${p7} should report as rational multiples of each other`);

		assert(bIsRationalMultipleOf(p2, p1), `p2 = ${p2} and p1 = ${p1} should report as rational multiples of each other`);
        assert(bIsRationalMultipleOf(p3, p1), `p3 = ${p3} and p1 = ${p1} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p4, p1), `p4 = ${p4} and p1 = ${p1} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p5, p1), `p5 = ${p5} and p1 = ${p1} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p6, p1), `p6 = ${p6} and p1 = ${p1} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p7, p1), `p7 = ${p7} and p1 = ${p1} should report as rational multiples of each other`);
		
		// p3, p4 and p5 are rational multiples of each other
		assert(bIsRationalMultipleOf(p3, p3), `p3 = ${p3} and p3 = ${p3} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p3, p4), `p3 = ${p3} and p4 = ${p4} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p3, p5), `p3 = ${p3} and p5 = ${p5} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p4, p4), `p4 = ${p4} and p4 = ${p4} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p4, p5), `p4 = ${p4} and p5 = ${p5} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p5, p5), `p5 = ${p5} and p5 = ${p5} should report as rational multiples of each other`);

		assert(bIsRationalMultipleOf(p4, p3), `p4 = ${p4} and p3 = ${p3} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p5, p3), `p5 = ${p5} and p3 = ${p3} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p5, p4), `p5 = ${p5} and p4 = ${p4} should report as rational multiples of each other`);
		
		// p2, p6 and p7 are not rational multiples of p3, p4, p5
		assert(!bIsRationalMultipleOf(p2, p3), `p2 = ${p2} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p2, p4), `p2 = ${p2} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p2, p5), `p2 = ${p2} and p5 = ${p5} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p6, p3), `p6 = ${p6} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p6, p4), `p6 = ${p6} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p6, p5), `p6 = ${p6} and p5 = ${p5} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p7, p3), `p7 = ${p7} and p3 = ${p3} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p7, p4), `p7 = ${p7} and p4 = ${p4} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p7, p5), `p7 = ${p7} and p5 = ${p5} should NOT report as rational multiples of each other`);

		assert(!bIsRationalMultipleOf(p3, p2), `p3 = ${p3} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p4, p2), `p4 = ${p4} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p5, p2), `p5 = ${p5} and p2 = ${p2} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p3, p6), `p3 = ${p3} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p4, p6), `p4 = ${p4} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p5, p6), `p5 = ${p5} and p6 = ${p6} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p3, p7), `p3 = ${p3} and p7 = ${p7} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p4, p7), `p4 = ${p4} and p7 = ${p7} should NOT report as rational multiples of each other`);
		assert(!bIsRationalMultipleOf(p5, p7), `p5 = ${p5} and p7 = ${p7} should NOT report as rational multiples of each other`);

		// p2, p6 and p7 are rational multiples of each other
		assert(bIsRationalMultipleOf(p2, p2), `p2 = ${p2} and p2 = ${p2} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p2, p6), `p2 = ${p2} and p6 = ${p6} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p2, p7), `p2 = ${p2} and p7 = ${p7} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p6, p6), `p6 = ${p6} and p6 = ${p6} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p6, p7), `p6 = ${p6} and p7 = ${p7} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p7, p7), `p7 = ${p7} and p7 = ${p7} should report as rational multiples of each other`);

		assert(bIsRationalMultipleOf(p6, p2), `p6 = ${p6} and p2 = ${p2} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p7, p2), `p7 = ${p7} and p2 = ${p2} should report as rational multiples of each other`);
		assert(bIsRationalMultipleOf(p7, p6), `p7 = ${p7} and p6 = ${p6} should report as rational multiples of each other`);

		// close but p8[0] is 1 too big
		let p8 = [34677717130752820n, 26008287848064616n, 17338858565376410n, 8669429282688205n];
		assert(!bIsRationalMultipleOf(p3, p8), `p3 = ${p3} and p8 = ${p8} should NOT report as rational multiples of each other`);

		let p9 = [8n,6n,4n,4n];
		assert(!bIsRationalMultipleOf(p3, p9), `p3 = ${p3} and p9 = ${p9} should NOT report as rational multiples of each other`);
	});
});