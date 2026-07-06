import { describe, expect, it } from '@jest/globals';
import { numRootsIn01 } from '../../../../src/roots/sturm/double/num-roots-in-0-1.js';
import { multiply } from '../../../../src/basic/double/multiply.js';
import { toCasStr } from '../../../../src/basic/to-cas-str.js';
import { roots } from '../../../../src/roots/descartes/roots.js';
import { fromRoots } from '../../../../src/roots/from-roots/double/from-roots.js';
import { eHorner } from '../../../../src/evaluate/expansion/e-horner.js';


describe('numRootsIn01', function() {
    it('should correctly calculate the number of roots within the half-open interval (0,1] for some polynomials', 
    function() {
        {
            // 5 distinct roots in (0,1] and 1 root at 0
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1, 1]);
            // roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsIn01(p)).toEqual(5);
        }
        {
            // 4 distinct roots in (0,1] and 1 root at 0
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1]);
            // roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsIn01(p)).toEqual(5);
        }
        {
            const p1 = fromRoots([2*(2**-4), 2*(2**-9), 2*(2**-3), 1]);
            expect(numRootsIn01(p1)).toEqual(4);
            const p2 = fromRoots([2*(2**-4), 2*(2**-9), 2*(2**-3), 1.0000000000000002]);
            // roots(p2);//?
            expect(numRootsIn01(p2)).toEqual(3);
        }
        {
            const p = fromRoots([0.1,0.2,0.33]);
            expect(numRootsIn01(p)).toEqual(3);
        }
        {
            const p = [1, 1, -64, 236, -240];  // roots at: -10, 2, 3, and 4
            // toCasStr(p);//?
            expect(numRootsIn01(p)).toEqual(0);
        }
        {
            const p = [1, 0, 1, 0, -3, -3, 8, 2, -5];  // root at: 0.888636320624499...
            expect(numRootsIn01(p)).toEqual(1);
        }
        {
            const p = [-1, 0, 1, 0, -3, -3, 8, 2, -5];
            expect(numRootsIn01(p)).toEqual(0);
        }
        {
            const p = [-1, 0, -1, 0, +3, -3, 8, 2, -5];
            expect(numRootsIn01(p)).toEqual(1);
        }
        {
            const p1 = multiply([1,-0.5], [1,-0.3]);
            const p2 = multiply([1,-0.1], [1,-0.9]);
            const p3 = multiply([1,-0.2], [1,-0.99]);
            const p4 = multiply([1,-0.0], [1,-0.09]);
            const p5 = multiply(p1, p2);
            const p6 = multiply(p3, p4);
            const p7 = multiply(p5, p6);
            // p7;//?
            // roots(p7);//?
            // eHorner(p7.map(e => [e]), 0);//?

            expect(numRootsIn01(p7)).toEqual(8);
        }
        {
            const k = -0.001;
            const p1 = multiply([1,k*1], [1,k*5]);
            const p2 = multiply([1,k*2], [1,k*6]);
            const p3 = multiply([1,k*3], [1,k*7]);
            const p4 = multiply([1,k*4], [1,k*8]);
            const p5 = multiply(p1, p2);
            const p6 = multiply(p3, p4);
            const p7 = multiply(p5, p6);
            expect(numRootsIn01(p7)).toEqual(8);
        }
    });
});
