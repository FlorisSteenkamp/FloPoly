import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bisection, fromRoots, Horner } from '../../../src/index.js';
import { rootAccurateEnough } from '../../helpers/root-accurate-enough.js';


const eps = Number.EPSILON;


describe('bisection', function() {
	it('should correctly refine a root interval via bisection', 
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        let r1 = bisection(f,2.2,3.8); //=> 3ish
        let r2 = bisection(f,2.2,3.1); //=> 3ish
		let r3 = bisection(f,-20,1); //=> -10ish

        assert(
			rootAccurateEnough(p, r1),
			`r1 should be refined to accurately enough`
		);
        assert(
			rootAccurateEnough(p, r2),
			`r2 should be refined to accurately enough`
		);
        assert(
			rootAccurateEnough(p, r3),
			`r3 should be refined to accurately enough`
		);

		// reversed versions
		let r1r = bisection(f,3.8,2.2); //=> 3ish
		let r2r = bisection(f,3.1,2.2); //=> 3ish
		let r3r = bisection(f,1,-20); //=> -10ish
		assert(
			rootAccurateEnough(p, r1r),
			`r1r should be refined to accurately enough`
		);
        assert(
			rootAccurateEnough(p, r2r),
			`r2r should be refined to accurately enough`
		);
        assert(
			rootAccurateEnough(p, r3r),
			`r3r should be refined to accurately enough`
		);
    });
    
	it('should throw a relevant exception if the root is not bracketed',
	function() {
		let roots = [-10,2,3,4];
		let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
		let f = (t: number) => Horner(p,t);
		expect(
			() => bisection(f,2.2,2.3)).to.throw(Error, 'Root not bracketed',
			`No error thrown even though root is not bracketed, p: ${p}, bracket: [2.2,2.3], roots: ${roots}`
		);

		expect(
			() => bisection(f,2.2,2.2)).to.throw(Error, 'Root not bracketed',
			`No error thrown even though root is not bracketed, p: ${p}, bracket: [2.2,2.2], roots: ${roots}`
		);
	});

	
	it('should correctly refine a root interval via bisection even if the interval width is 0',
	function() {
		let roots = [-10,2,3,4];
		let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
		let f = (t: number) => Horner(p,t);
		let r1 = bisection(f,3,3);
		expect(r1).to.eql(3);
		let r2 = bisection(f,-10,-10);
		expect(r2).to.eql(-10);
	});


	it('should correctly refine a root interval via bisection even if the root is at an interval endpoint',
	function() {
		let roots = [-10,2,3,4];
		let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
		let f = (t: number) => Horner(p,t);
		let r1 = bisection(f,3,3.5);
		expect(r1).to.eql(3);
		let r2 = bisection(f,-20,-10);
		expect(r2).to.eql(-10);
	});
});
