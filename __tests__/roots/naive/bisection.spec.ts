import { describe, expect, it } from '@jest/globals';
import { bisection } from '../../../src/roots/naive/bisection.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { Horner } from '../../../src/evaluate/double/horner.js';
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

        expect(rootAccurateEnough(p, r1)).toEqual(true);
        expect(rootAccurateEnough(p, r2)).toEqual(true);
        expect(rootAccurateEnough(p, r3)).toEqual(true);

        // reversed versions
        let r1r = bisection(f,3.8,2.2); //=> 3ish
        let r2r = bisection(f,3.1,2.2); //=> 3ish
        let r3r = bisection(f,1,-20); //=> -10ish
        expect(rootAccurateEnough(p, r1r)).toEqual(true);
        expect(rootAccurateEnough(p, r2r)).toEqual(true);
        expect(rootAccurateEnough(p, r3r)).toEqual(true);
    });
    
    it('should throw a relevant exception if the root is not bracketed',
    function() {
        let roots = [-10,2,3,4];
        let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        expect(
            () => bisection(f,2.2,2.3)).toThrow('Root not bracketed');

        expect(
            () => bisection(f,2.2,2.2)).toThrow('Root not bracketed');
    });

    
    it('should correctly refine a root interval via bisection even if the interval width is 0',
    function() {
        let roots = [-10,2,3,4];
        let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        let r1 = bisection(f,3,3);
        expect(r1).toEqual(3);
        let r2 = bisection(f,-10,-10);
        expect(r2).toEqual(-10);
    });


    it('should correctly refine a root interval via bisection even if the root is at an interval endpoint',
    function() {
        let roots = [-10,2,3,4];
        let p = fromRoots(roots);  //=> [1, 1, -64, 236, -240]
        let f = (t: number) => Horner(p,t);
        let r1 = bisection(f,3,3.5);
        expect(r1).toEqual(3);
        let r2 = bisection(f,-20,-10);
        expect(r2).toEqual(-10);
    });
});
