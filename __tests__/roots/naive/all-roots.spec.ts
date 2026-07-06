import { describe, expect, it } from '@jest/globals';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { flatRootsArr, flatCoefficientsArr, flatCoefficients } from '../../../src/predictive-random/double/random.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { multiply } from '../../../src/basic/double/multiply.js';
import { rootAccurateEnough } from '../../helpers/root-accurate-enough.js';
import { roots } from '../../../src/roots/descartes/roots.js';


const negInf = -Infinity;
const posInf = Infinity;
const { abs } = Math;


describe('allRoots', function() {
    it('should return the correct roots of [1,2,0]', 
    function() {
        let p: number[] = [1,2,0];
        let rs = allRoots(p);

        expect(rs.length).toEqual(2);
        expect(rs[0]).toEqual(-2);
        expect(rs[1]).toEqual(0);
    });
    it('should return the correct roots by removing leading and trailing zeros (i.e. zero roots) (special cases)', 
    function() {
        let p: number[] = [0,0,0,0];
        let rs = allRoots(p);
        expect(rs.length === 0).toEqual(true);
    });
    it('should return the correct roots by removing trailing zeros (i.e. zero roots)', 
    function() {
        let p: number[] = [0,-6,0];
        let rs = allRoots(p);
        expect(rs.length === 1).toEqual(true);
        expect(rs[0]).toEqual(0);
    });

    it('should return the correct roots by removing trailing zeros (i.e. zero roots)', 
    function() {
        let p: number[] = [0,-9,5,0];
        let rs = allRoots(p);
        expect(rs.length === 2).toEqual(true);
        expect(rs[0]).toEqual(0);
        expect(rs[1]).toEqual(5/9);
    });

    it('should return the correct roots by removing leading zeros', 
    function() {
        let p: number[] = [0,-9,5];
        let rs = allRoots(p);
        expect(rs.length === 1).toEqual(true);
        expect(rs[0]).toEqual(5/9);
    });

    it('should  return roots for the zero or a constant polynomial', 
    function() {
        let p1: number[] = [];
        let p2 = [3];
        let p3 = [0,0];
        let roots1 = allRoots(p1);
        let roots2 = allRoots(p2);
        let roots3 = allRoots(p3);
        expect(roots1.length === 0).toEqual(true);
        expect(roots2.length === 0).toEqual(true);
        expect(roots3.length === 0).toEqual(true);
    });


    it('should return sorted roots when there are roots at zero',
    function() {
        // rs at -1, 1
        let p: number[] = multiply([1,1], [1,-1]);
        // add 3 more at 0
        p.push(0,0,0);

        let rs = allRoots(p);
        
        expect(rs).toEqual([-1,0,0,0,1]);
    });


    it('should return roots correctly if a root is very close to the lower bound',
    function() {
        // rs at -1, 1
        let p: number[] = multiply([1,-1.07], [1,-1.000000000000001]);
        // add 2 more at 0
        p.push(0,0);

        let rs = allRoots(p,1,5);
        
        //console.log(rs);
        //console.log(toCasStr(p));
        expect(rs).toEqual([1, 1.0700000000000023]);
    });


    it('should return roots correctly if a root is very close to the upper bound',
    function() {
        // rs at -1, 1
        let p: number[] = multiply([1,-1.07], [1,-1.000000000000001]);
        // add 2 more at 0
        p.push(0,0);

        let rs = allRoots(p,-5,1);
        
        //console.log(rs);
        //console.log(toCasStr(p));
        expect(rs).toEqual([0, 0, 1]);
    });


    it('should only return roots in the given left half-open range', 
    function() {
        let p = [1, 0.7, -0.28, 0.02];
        // rs at -1, 0.1, 0.2
        let rs = allRoots(p, negInf, 0);
        expect(rs.length === 1 &&
            numsWithin(rs, negInf, 0)).toEqual(true);
    });
    
    
    it('should only return roots in the given right half-open range', 
    function() {
        let p = [1, 0.7, -0.28, 0.02];
        // rs at -1, 0.1, 0.2
        let rs = allRoots(p, 0, posInf);
        expect(rs.length === 2 &&
            numsWithin(rs, 0, posInf)).toEqual(true);
    });
    
    it('should not return roots that doesn\'t fall in the given closed range', 
    function() {
        let p = [1, 0.7, -0.28, 0.02];
        // roots at -1, 0.1, 0.2
        let rs = allRoots(p,0,2);
        expect(rs.length === 2 &&
            numsWithin(rs, 0, 2)).toEqual(true);
    });
    
    it('should return no roots for a zero polynomial', 
    function() {
        let p: number[] = [];
        let rs = allRoots(p);
        expect(rs).toEqual([]);
    });
    
    it('should return no roots for a non-zero constant polynomial', 
    function() {
        let p = [2.2];
        let rs = allRoots(p);
        expect(rs).toEqual([]);
    });
    
    it('should calculate some simple linear polynomial roots accurately', 
    function() {
        let p = [0.1,2.2];
        let rs = allRoots(p);
        expect(rootsAccurateEnough(p,[-22])).toEqual(true);
    });
    
    it('should calculate some simple quadratic roots accurately', 
    function() {
        {
            let p = [1,-3,2];
            let rs = allRoots(p);
            expect(rs[0] === 1).toEqual(true);
            expect(rs[1] === 2).toEqual(true);
        }
        
        {
            let p = [1, -1.1, 0.3];
            let rs = allRoots(p);

            expect(rs[0] === 0.49999999999999944).toEqual(true);
            expect(rs[1] === 0.6000000000000005).toEqual(true);
        }
    });
    
    it('should calculate some simple cubic roots accurately', 
    function() {
        let p = [1, 0.7, -0.28, 0.02];
        let rs = allRoots(p);
        expect(rs.length === 3).toEqual(true);
        expect(rootsAccurateEnough(p,rs)).toEqual(true);
    });
    
    it(
    `should calculate the roots correctly for hundreds of polynomials each
    with reproducable random roots (in a flat distribution from -10 to 
    10) of order 3,4,7,12,15, and 20 that only have real roots`, 
    function() {
        const N = 50;
        const orders = [3,4,7,12,15,20];
        let pss = [
            flatRootsArr(N, orders[0], -10, 10, 11111),
            flatRootsArr(N, orders[1], -10, 10, 22222),
            flatRootsArr(N, orders[2], -10, 10, 33333),
            flatRootsArr(N, orders[3], -10, 10, 44444),
            flatRootsArr(N, orders[4], -10, 10, 55555),
            flatRootsArr(N, orders[5], -10, 10, 66666),
        ];
        
        for (let i=0; i<pss.length; i++) {
            for (let j=0; j<pss[i].length; j++) {
                let p = pss[i][j];
                let rs = allRoots(p);

                expect(p.length-1).toEqual(orders[i]);
                let rootsAccurateEnough_ = rootsAccurateEnough(p,rs);
                expect(rootsAccurateEnough_).toEqual(true);
            }
        }
    });

    it(`should calculate the roots correctly for hundreds of polynomials each
        with reproducable random coefficients (in a flat distribution from -10 to 
        10) of order 3,4,7,12,15, and 20`, 
    function() {
        const N = 50;
        const orders = [3,4,7,12,15,20];
        let pss = [
            flatCoefficientsArr(N, orders[0], -10, 10, 11111),
            flatCoefficientsArr(N, orders[1], -10, 10, 22222),
            flatCoefficientsArr(N, orders[2], -10, 10, 33333),
            flatCoefficientsArr(N, orders[3], -10, 10, 44444),
            flatCoefficientsArr(N, orders[4], -10, 10, 55555),
            flatCoefficientsArr(N, orders[5], -10, 10, 66666),
        ];
        
        for (let i=0; i<pss.length; i++) {
            for (let j=0; j<pss[i].length; j++) {
                let p = pss[i][j];
                let rs = allRoots(p);
                //expect(p.length-1).toEqual(orders[i]);
                expect(rootsAccurateEnough(p,rs)).toEqual(true);
            }
        }
    });
    
    
    it(`should not miss a near triple or higher odd degree root for hundreds
        of predictable random polynomials designed to have these kinds of roots`, 
    function() {
        const N = 100;
        const orders = [3,7,19];
        const near = 1;
        const spacing = 1/100;
        
        
        // Get odd polynomial with multiple rs near 1
        let seed = 11111;
        for (let j=0; j<orders.length; j++) {
            let ps = [];
            //let fs = [];
            for (let i=0; i<N; i++) {
                let arr = flatCoefficients(orders[j], 0, 1, seed);
                let froots = arr.p.map(x => (x*spacing) + near);
                seed  = arr.seed;

                ps.push(fromRoots(froots));
                //fs.push(froots);
            }
            
            for (let i=0; i<ps.length; i++) {
                let p = ps[i];
                let rs = allRoots(p);
                //console.log(rs, fs[i])
                expect(rs.length >= 1).toEqual(true);
                expect(rootsAccurateEnough(p,rs)).toEqual(true);
            }
        }
    });
    
    
    it(`should not miss a triple or higher odd degree root for hundreds
        of predictable random polynomials`, 
    function() {
        const N = 100;
        const orders = [3,7,19];
    
        
        // Get odd polynomial with multiple rs near 1
        let seed = 11111;
        for (let j=0; j<orders.length; j++) {
            let ps = [];
            //let fs = [];
            for (let i=0; i<N; i++) {
                // This is just to get a single predictable random value
                let arr = flatCoefficients(1, -1, 1, seed);
                let v = arr.p[0];
                seed = arr.seed;
                
                let froots = new Array(orders[j]).fill(v); 
                //console.log(froots);

                ps.push(fromRoots(froots));
                //fs.push(froots);
            }
            
            for (let i=0; i<ps.length; i++) {
                let p = ps[i];
                let rs = allRoots(p);
                //console.log(rs[0], fs[i][0])
                //console.log(rs[0])
                expect(rs.length >= 1).toEqual(true);
                expect(rootsAccurateEnough(p,rs)).toEqual(true);
            }
        }
    });
});


/**
 * Helper function. Tests if all rs of p is close enough to x to be 
 * considered valid.
 */
function rootsAccurateEnough(p: number[], rs: number[]) {
    for (let i=0; i<rs.length; i++) {
        if (!rootAccurateEnough(p, rs[i])) {
            return false;
        }
    }
    
    return true;
}


/**
 * Helper function. Tests if an array of numbers are all within the 
 * range [a,b] 
 */
function numsWithin(ns: number[], a: number, b: number) {
    for (let n of ns) {
        if (n < a || n > b) {
            return false;
        }
    }

    return true;
}









