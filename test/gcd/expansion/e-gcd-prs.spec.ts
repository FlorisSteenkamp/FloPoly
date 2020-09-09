
/*
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEstimate } from 'big-float-ts';
import { 
    eGcdPrs, eMultiplyByConst, eIsRationalMultipleOf,
    eMultiply, eDifferentiate 
} from '../../../src/index';


describe('eGcdPrs', function() {
	it('should find the GCD of two polynomials correctly', 
	function() {
        {
            let a = [[2], [-2], [1]];
            let b = [[4], [-2]];
            let gcd = eGcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd, 
                [[1]]
            ));
        }
        {
            let a = [[1e10], [1e5]];
            let b = [[1e10], [1e5]];
            let gcd = eGcdPrs(a,b);
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
            let a = [[1], [-2], [0], [-4]];
            let b = [[1], [-3]];
            let gcd = eGcdPrs(a,b);
            //console.log(gcd);
            assert(eIsRationalMultipleOf(
                gcd,
                [[-5]]
            ));
        }
        
        {
            let a = [[1], [-4], [4],  [-3],  [14]];
            let b = [[1], [+8], [12], [+17], [6]];
            let gcd = eGcdPrs(a,b);
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

            let p1 = eMultiply([[1],[-0.5]], [[1],[-0.3]]);
			let p2 = eMultiply([[1],[-0.1]], [[1],[-0.9]]);
			let p3 = eMultiply([[1],[-0.2]], [[1],[-0.99]]);
			let p4 = eMultiply([[1],[-0.01]], [[1],[-0.09]]);
			let p5 = eMultiply(p1, p2);
			let p6 = eMultiply(p3, p4);
            let p7 = eMultiply(p5, p6);
            let gcd = eGcdPrs(p7,eDifferentiate(p7));
            assert(gcd.length === 1)
        }

        {
            // THIS TEST NOT POSSIBLE - INTERMEDIATE COEFFICIENT GROWTH CAUSES
            // EVEN THE PSEUDO REMAINDER SEQUENCE (PRS) COEFFICIENTS TO OVERFLOW

            function mbc(p: number[][]) {
                return eMultiplyByConst([cc], p);
            }

            const cc = 65536;

            let lf1 = [[1],[-0.5]];
            let lf2 = [[1],[-0.5]];
            let lf3 = [[1],[-0.1]];
            let lf4 = [[1],[-0.9]];
            let lf5 = [[1],[-0.2]]; 
            let lf6 = [[1],[-0.99]];
            let lf7 = [[1],[-0.01]];
            let lf8 = [[1],[-0.09]];

            // double root at 0.5
            let p1 = eMultiply(
                mbc(lf1),
                mbc(lf2)
            );

            // roots at 0.1, 0.9
            let p2 = eMultiply(
                mbc(lf3),
                mbc(lf4)
            );

            // roots at 0.2, 0.99
            let p3 = eMultiply(lf5, lf6);
            // roots at 0.01, 0.09
			let p4 = eMultiply(lf7, lf8);
               
            // double root at 0.5, roots at 0.1, 0.9
            let p5 = eMultiply(p1, p2);
            // roots at 0.2, 0.99, 0.01, 0.09
            let p6 = eMultiply(p3, p4);

            // double root at 0.5, roots at 0.1, 0.9, 0.2, 0.99, 0.01, 0.09
            let p  = eMultiply(p5, p6);

            let dp = eDifferentiate(p);

            let gcd = eGcdPrs(p,dp);

            //console.log(gcd);
            console.log(gcd.map(eEstimate));

            //assert(gcd.length === 1)
        }
        *//*
	});
});
*/