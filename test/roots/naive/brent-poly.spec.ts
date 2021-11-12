
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { brentPoly, fromRoots, Horner } from '../../../src/index.js';
import { rootAccurateEnough } from './root-accurate-enough';


const eps = Number.EPSILON;


describe('brentPoly', function() {
	it('should correctly refine a root interval via bisection', 
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
        let r1 = brentPoly(p,2.2,3.8); //=> 3ish
        let r2 = brentPoly(p,2.2,3.1); //=> 3ish
        let r3 = brentPoly(p,-20,1); //=> -10ish

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
	});
});
