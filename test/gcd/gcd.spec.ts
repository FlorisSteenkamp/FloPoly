
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { gcdExact } from '../../src';
import { multiplyExact } from '../../src/basic/multiply';
import { differentiateExact } from '../../src/calculus/differentiate';
import { multiplyByConst, isConstMultipleOf } from '../../src/index';
import { expMultiplyByConst } from '../../src/basic/multiply-by-const';
import { estimate } from 'flo-numerical';


describe('gcd', function() {
	it('should do gcd correctly', 
	function() {
        /*
        {
            let a = [[2], [-2], [1]];
            let b = [[4], [-2]];
            let gcd = gcdExact(a,b);
            console.log(gcd);
            assert(isConstMultipleOf(
                gcd, 
                [[10000000000], [100000]]
            ));
        }*//*
        {
            let a = [[1e10], [1e5]];
            let b = [[1e10], [1e5]];
            let gcd = gcdExact(a,b);
            //console.log(gcd);
            assert(isConstMultipleOf(
                gcd, 
                [[10000000000], [100000]]
            ));
        }

        {
            let a = [[1], [-2], [0], [-4]];
            let b = [[1], [-3]];
            let gcd = gcdExact(a,b);
            //console.log(gcd);
            assert(isConstMultipleOf(
                gcd,
                [[-5]]
            ));
        }
        
        {
            let a = [[1], [-4], [4],  [-3],  [14]];
            let b = [[1], [+8], [12], [+17], [6]];
            let gcd = gcdExact(a,b);
            //console.log(gcd);
            assert(isConstMultipleOf(
                gcd,
                [[1], [1], [2]]
            ));
        }

        {
            let p1 = multiplyExact([[[1],[-0.5]], [[1],[-0.3]]]);
			let p2 = multiplyExact([[[1],[-0.1]], [[1],[-0.9]]]);
			let p3 = multiplyExact([[[1],[-0.2]], [[1],[-0.99]]]);
			let p4 = multiplyExact([[[1],[-0.01]], [[1],[-0.09]]]);
			let p5 = multiplyExact([p1, p2]);
			let p6 = multiplyExact([p3, p4]);
            let p7 = multiplyExact([p5, p6]);
            let gcd = gcdExact(p7,differentiateExact(p7));
            assert(gcd.length === 1)
        }

        {
            function trans(p: number[][]) {
                return expMultiplyByConst([cc], p);
            }

            //let cc = 65536;
            let cc = 1;

            let lf1 = [[1],[-0.5]];
            let lf2 = [[1],[-0.5]];
            let lf3 = [[1],[-0.1]];
            let lf4 = [[1],[-0.9]];
            let lf5 = [[1],[-0.2]]; 
            let lf6 = [[1],[-0.99]];
            let lf7 = [[1],[-0.01]];
            let lf8 = [[1],[-0.09]];

            let p1 = multiplyExact([
                trans(lf1),
                trans(lf2)
            ]);

            let p2 = multiplyExact([
                //trans([[1],[-0.8999999985098839]]),
                //trans([[1],[-0.09375]])
                //trans([[1],[-0.09999999999854481]]),
                //trans([[1],[-0.8999999999941792]])
                
                //trans([[1],[-0.09999999999999987]]),
                //trans([[1],[-0.8999999999999999]])
                
                trans(lf3),
                trans(lf4)
            ]);

            let p3 = multiplyExact([lf5, lf6]);
			let p4 = multiplyExact([lf7, lf8]);
               
            let p5 = multiplyExact([p1, p2]);
            let p6 = multiplyExact([p3, p4]);
            let p  = multiplyExact([p5, p6]);
            // let p5 = multiplyExact(p1, trans([[1],[-0.1]]))

            let dp = differentiateExact(p);
            /*
            console.log(dp);
            console.log('---------------');
            console.log(p5);
            console.log('===============');
            *//*
            let gcd = gcdExact(p,dp);
            //console.log(gcd);
            console.log(gcd.map(estimate));
            //assert(gcd.length === 1)
        }
/*
        {
            let p1 = multiplyExact([[1],[-0.5]], [[1],[-0.5]]);
			let p2 = multiplyExact([[1],[-0.1]], [[1],[-0.9]]);
			let p3 = multiplyExact([[1],[-0.2]], [[1],[-0.99]]);
			let p4 = multiplyExact([[1],[-0.01]], [[1],[-0.09]]);
			let p5 = multiplyExact(p1, p2);
			let p6 = multiplyExact(p3, p4);
            let p7 = multiplyExact(p5, p6);
            let gcd = gcdExact(p7,differentiateExact(p7));
            //console.log(gcd);
            //assert(gcd.length === 1)
        }*/
	});
});
