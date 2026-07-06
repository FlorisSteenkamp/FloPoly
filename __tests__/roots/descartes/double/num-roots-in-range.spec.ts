import { describe, expect, it } from '@jest/globals';
import { numRootsInRange } from '../../../../src/roots/sturm/double/num-roots-in-range.js';
import { toCasStr } from '../../../../src/basic/to-cas-str.js';
import { multiply } from '../../../../src/basic/double/multiply.js';
import { fromRoots } from '../../../../src/roots/from-roots/double/from-roots.js';
import { eHorner } from '../../../../src/evaluate/expansion/e-horner.js';
import { roots } from '../../../../src/roots/descartes/roots.js';


describe('numRootsInRange', function() {
    it('should correctly calculate the number of roots within an interval for some polynomials', 
    function() {
        {
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1, 1])
            .map(e => e*2**2 - 0.5);
            roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsInRange(p, -1, 2)).toEqual(1);
            expect(numRootsInRange(p, -1, 2.2)).toEqual(2);
        }
        {
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1, 1])
            .map(e => e*2**-10);
            // roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsInRange(p, -1, 2)).toEqual(5);
        }
        {
            const p = [1, 1, -64, 236, -240]; // roots at 2, 3, 4, -10
            // toCasStr(p);//?
            expect(numRootsInRange(p,-20,-11)).toEqual(0);
            expect(numRootsInRange(p,-11,-9)).toEqual(1);
            expect(numRootsInRange(p,-11,3.5)).toEqual(3);
            expect(numRootsInRange(p,-11,5)).toEqual(4);
            expect(numRootsInRange(p,-40,40)).toEqual(4);

            expect(numRootsInRange(p,-10.00000000001,-9.99999999999)).toEqual(1);
        }
        {
            // 5 distinct roots in (0,1] and 1 root at 0
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1, 1]);
            // roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsInRange(p, 0, 1)).toEqual(5);
        }
        {
            // 4 distinct roots in (0,1] and 1 root at 0
            const p = fromRoots([0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1]);
            // roots(p);//?
            eHorner(p.map(e => [e]), 0);
            expect(numRootsInRange(p, 0, 1)).toEqual(5);
        }
        {
            const p1 = fromRoots([2*(2**-4), 2*(2**-9), 2*(2**-3), 1]);
            expect(numRootsInRange(p1, 0, 1)).toEqual(4);
            const p2 = fromRoots([2*(2**-4), 2*(2**-9), 2*(2**-3), 1.0000000000000002]);
            // roots(p2);//?
            expect(numRootsInRange(p2, 0, 1)).toEqual(3);
        }
        {
            const p = fromRoots([0.1,0.2,0.33]);
            expect(numRootsInRange(p, 0, 1)).toEqual(3);
        }
        {
            const p = [1, 1, -64, 236, -240];  // roots at: -10, 2, 3, and 4
            // toCasStr(p);//?
            expect(numRootsInRange(p, 0, 1)).toEqual(0);
        }
        {
            const p = [1, 0, 1, 0, -3, -3, 8, 2, -5];  // root at: 0.888636320624499...
            expect(numRootsInRange(p, 0, 1)).toEqual(1);
        }
        {
            const p = [-1, 0, 1, 0, -3, -3, 8, 2, -5];
            expect(numRootsInRange(p, 0, 1)).toEqual(0);
        }
        {
            const p = [-1, 0, -1, 0, +3, -3, 8, 2, -5];
            expect(numRootsInRange(p, 0, 1)).toEqual(1);
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

            expect(numRootsInRange(p7, 0, 1)).toEqual(8);
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
            expect(numRootsInRange(p7, 0, 1)).toEqual(8);
        }
    });
});
