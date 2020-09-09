
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { brent, fromRoots, Horner } from '../../../src/index';
import { rootAccurateEnough } from './root-accurate-enough';


const eps = Number.EPSILON;


describe('brent', function() {
	it('should correctly refine a root interval via Brent\'s Method', 
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        let r1 = brent(f,2.2,3.8); //=> 3ish
        let r2 = brent(f,2.2,3.1); //=> 3ish
        let r3 = brent(f,-20,1); //=> -10ish

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
