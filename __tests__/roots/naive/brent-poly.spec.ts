import { describe, expect, it } from '@jest/globals';
import { brentPoly } from '../../../src/roots/naive/brent-poly.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { Horner } from '../../../src/evaluate/double/horner.js';
import { rootAccurateEnough } from '../../helpers/root-accurate-enough.js';


const eps = Number.EPSILON;


describe('brentPoly', function() {
    it('should correctly refine a root interval via bisection', 
    function() {
        let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
        let r1 = brentPoly(p,2.2,3.8); //=> 3ish
        let r2 = brentPoly(p,2.2,3.1); //=> 3ish
        let r3 = brentPoly(p,-20,1); //=> -10ish

        expect(rootAccurateEnough(p, r1)).toEqual(true);
        expect(rootAccurateEnough(p, r2)).toEqual(true);
        expect(rootAccurateEnough(p, r3)).toEqual(true);
    });
});
