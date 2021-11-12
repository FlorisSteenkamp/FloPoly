
/*
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { 
    gcdPrs, multiplyByConst, eIsRationalMultipleOf, multiply, 
    differentiate
} from '../../../src/index.js';


describe('gcdPrs', function() {
	it('should find the GCD of two polynomials correctly', 
	function() {
        {
            let a = [2, -2, 1];
            let b = [4, -2];
            let gcd = gcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd, 
                [[1]]
            ));
        }
        
        {
            let a = [1e10, 1e5];
            let b = [1e10, 1e5];
            let gcd = gcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd, 
                [[10_000_000_000], [100_000]]
            ));

            assert(eIsRationalMultipleOf(
                gcd, 
                [[100_000], [1]]
            ));
        }

        {
            let a = [1, -2, 0, -4];
            let b = [1, -3];
            let gcd = gcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd,
                [[1]]
            ));
        }

        {
            let a = [1, -4, 4,  -3,  14];
            let b = [1, +8, 12, +17, 6];
            let gcd = gcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd,
                [[1], [1], [2]]
            ));
        }

        /*
        {
            // THIS TEST NOT POSSIBLE - INTERMEDIATE COEFFICIENT GROWTH CAUSES
            // EVEN THE PSEUDO REMAINDER SEQUENCE (PRS) COEFFICIENTS TO OVERFLOW
            
            let p1 = multiply([1,-0.5], [1,-0.3]);
			let p2 = multiply([1,-0.1], [1,-0.9]);
			let p3 = multiply([1,-0.2], [1,-0.99]);
			let p4 = multiply([1,-0.01], [1,-0.09]);
			let p5 = multiply(p1, p2);
			let p6 = multiply(p3, p4);
            let p7 = multiply(p5, p6);
            let gcd = gcdPrs(p7,differentiate(p7));

            //console.log(gcd);

            //assert();
        }

        {
            // THIS TEST NOT POSSIBLE - INTERMEDIATE COEFFICIENT GROWTH CAUSES
            // EVEN THE PSEUDO REMAINDER SEQUENCE (PRS) COEFFICIENTS TO OVERFLOW

            function mbc(p: number[]) {
                return multiplyByConst(cc, p);
            }

            let cc = 65536;
            //let cc = 1;

            let lf1 = [1,-0.5];
            let lf2 = [1,-0.5];
            let lf3 = [1,-0.1];
            let lf4 = [1,-0.9];
            let lf5 = [1,-0.2]; 
            let lf6 = [1,-0.99];
            let lf7 = [1,-0.01];
            let lf8 = [1,-0.09];

            // double root at 0.5
            let p1 = multiply(
                mbc(lf1),
                mbc(lf2)
            );

            // roots at 0.1, 0.9
            let p2 = multiply(
                mbc(lf3),
                mbc(lf4)
            );

            // roots at 0.2, 0.99
            let p3 = multiply(lf5, lf6);
            // roots at 0.01, 0.09
			let p4 = multiply(lf7, lf8);
               
            // double root at 0.5, roots at 0.1, 0.9
            let p5 = multiply(p1, p2);
            // roots at 0.2, 0.99, 0.01, 0.09
            let p6 = multiply(p3, p4);

            // double root at 0.5, roots at 0.1, 0.9, 0.2, 0.99, 0.01, 0.09
            let p  = multiply(p5, p6);

            let dp = differentiate(p);

            let gcd = gcdPrs(p,dp);

            //assert()
        }
        *//*
	});
});
*/