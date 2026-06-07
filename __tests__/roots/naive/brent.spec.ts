import { describe, expect, it } from '@jest/globals';
import { brent } from '../../../src/roots/naive/brent.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { Horner } from '../../../src/evaluate/double/horner.js';
import { rootAccurateEnough } from '../../helpers/root-accurate-enough.js';


const eps = Number.EPSILON;


describe('brent', function() {
	it('should correctly refine a root interval via Brent\'s Method', 
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        let r1 = brent(f,2.2,3.8); //=> 3ish
        let r2 = brent(f,2.2,3.1); //=> 3ish
        let r3 = brent(f,-20,1); //=> -10ish

        expect(rootAccurateEnough(p, r1)).toBeTruthy();
        expect(rootAccurateEnough(p, r2)).toBeTruthy();
        expect(rootAccurateEnough(p, r3)).toBeTruthy();
	});
});
