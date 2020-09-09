
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { 
    bGcdPrs, multiplyByConst, bIsRationalMultipleOf, bMultiply, 
    bDifferentiate,
    bMultiplyByConst,
    bFromRoots
} from '../../../src/index';
import { bPrimitivePart } from '../../../src/factor/bigint/b-primitive-part';


describe('bGcdPrs', function() {
	it('should find the GCD of two polynomials with bigint coefficients correctly', 
	function() {
        {
            let a = [2n, -2n, 1n];
            let b = [4n, -2n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            assert(bIsRationalMultipleOf(
                gcd, 
                [1n]
            ));
        }
        {
            let a = [10000000000n, 100000n];
            let b = [10000000000n, 100000n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            assert(bIsRationalMultipleOf(
                gcd, 
                [10000000000n, 100000n]
            ));
        }

        {
            let a = [1n, -2n, 0n, -4n];
            let b = [1n, -3n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            assert(bIsRationalMultipleOf(
                gcd,
                [1n]
            ));
        }
        
        {
            let a = [1n, -4n, 4n, -3n, 14n];
            let b = [1n, 8n, 12n, 17n, 6n];
            let gcd = bGcdPrs(a,b);
            //console.log(gcd);
            assert(bIsRationalMultipleOf(
                gcd,
                [1n, 1n, 2n]
            ));
        }


        {
            // double root at 1
            let p1 = bMultiply([2n,-2n], [3n,-3n]);
            let dp1 = bDifferentiate(p1);

            let gcd = bGcdPrs(p1,dp1);

            assert(bIsRationalMultipleOf(gcd, [1n, -1n]));
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

            expect(bPrimitivePart(gcd)).to.eql([
                1n, -3n, 3n, -1n
            ])
        }


        {
            let p1 = bFromRoots([1n,5n,6n,7n,8n,9n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            assert(gcd.length === 1)
        }

        {
            let p1 = bFromRoots([7n,7n,6n,7n,8n,9n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            assert(bIsRationalMultipleOf(gcd, [432n, -6048n, 21168n]));
        }

        {
            let p1 = bMultiply([1n,0n,1n], [1n,0n,1n]);

            let dp1 = bDifferentiate(p1)
            let gcd = bGcdPrs(p1,dp1);

            assert(bIsRationalMultipleOf(gcd, [1n, 0n, 1n]));
        }
	});
});
