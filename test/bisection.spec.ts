
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { rootAccurateEnough } from './helpers/helper';
import { bisection, evaluate, fromRoots } from '../src/index';


describe('bisection', function() {
	it('should find the root in the interval correctly for some polynomials / intervals', 
	function() {
		let p1 = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
		let f = evaluate(p1);
		assert(
				rootAccurateEnough(p1, bisection(f,2.2,3.8)), 
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p1, bisection(f,2.2,3.1)),
				'Root not found accurately enough'
		);
		
		// Funny intervals
		assert(
				rootAccurateEnough(p1, bisection(f,4,4)),
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p1, bisection(f,3.1,2.2)),
				'Root not found accurately enough'
		);
		
		// Roots at endpoints of intervals
		assert(
				rootAccurateEnough(p1, bisection(f,2,2.5)),
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p1, bisection(f,2.5,3)),
				'Root not found accurately enough'
		);
	});
	
	it('should throw a relevant exception if the root is not bracketed',
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
		let f = evaluate(p);
		expect(() => bisection(f,2.2,2.3)).to.throw(Error, 'Root not bracketed');		
	});
});
