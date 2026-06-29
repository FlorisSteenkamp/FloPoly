import { describe, expect, it } from '@jest/globals';
import { bGcdPrs } from '../../../src/gcd/bigint/b-gcd-prs.js';
import { bIsRationalMultipleOf } from '../../../src/basic/bigint/b-is-rational-multiple-of.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';
import { bDifferentiate } from '../../../src/calculus/bigint/b-differentiate.js';
import { bFromRoots } from '../../../src/roots/from-roots/bigint/b-from-roots.js';
import { bPrimitivePart } from '../../../src/factor/bigint/b-primitive-part.js';


describe('bGcdPrs', function() {
    it('should find the GCD of two polynomials with bigint coefficients correctly', 
    function() {
        {
            let a = [2n, -2n, 1n];
            let b = [4n, -2n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            expect(bIsRationalMultipleOf(
                gcd, 
                [1n]
            )).toEqual(true);
        }
        {
            let a = [10000000000n, 100000n];
            let b = [10000000000n, 100000n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            expect(bIsRationalMultipleOf(
                gcd, 
                [10000000000n, 100000n]
            )).toEqual(true);
        }

        {
            let a = [1n, -2n, 0n, -4n];
            let b = [1n, -3n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            expect(bIsRationalMultipleOf(
                gcd,
                [1n]
            )).toEqual(true);
        }
        
        {
            let a = [1n, -4n, 4n, -3n, 14n];
            let b = [1n, 8n, 12n, 17n, 6n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            expect(bIsRationalMultipleOf(
                gcd,
                [1n, 1n, 2n]
            )).toEqual(true);
        }


        {
            // double root at 1
            let p1 = bMultiply([2n,-2n], [3n,-3n]);
            let dp1 = bDifferentiate(p1);

            let gcd = bGcdPrs(p1,dp1);

            expect(bIsRationalMultipleOf(gcd, [1n, -1n])).toEqual(true);
        }


        {
            // double root at 1
            let p1 = bMultiply([2n,-2n], [3n,-3n]);
            // double root at 1
            let p4 = bMultiply([100n,-100n], [11n,-11n]);
            // quad root at 1
            let p5 = bMultiply(p1, p4);

            let dp5 = bDifferentiate(p5);
            let gcd = bGcdPrs(p5,dp5);

            expect(bPrimitivePart(gcd)).toEqual([
                1n, -3n, 3n, -1n
            ])
        }


        {
            let p1 = bFromRoots([1n,5n,6n,7n,8n,9n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            expect(gcd.length === 1).toEqual(true)
        }

        {
            let p1 = bFromRoots([7n,7n,6n,7n,8n,9n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            expect(bIsRationalMultipleOf(gcd, [432n, -6048n, 21168n])).toEqual(true);
        }

        {
            let p1 = bMultiply([1n,0n,1n], [1n,0n,1n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            expect(bIsRationalMultipleOf(gcd, [1n, 0n, 1n])).toEqual(true);
        }


        {
            let p1: bigint[] = [];
            let p2 = bMultiply([1n,0n,1n], [1n,0n,1n]);

            let gcd1 = bGcdPrs(p1,p2);
            let gcd2 = bGcdPrs(p2,p1);

            expect(bIsRationalMultipleOf(gcd1, [])).toEqual(true);
            expect(bIsRationalMultipleOf(gcd2, [])).toEqual(true);
        }
    });
});
