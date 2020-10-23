
import { expect } from 'chai';
import { describe } from 'mocha';
import { gcdIntBinary, gcdIntsTree } from '../../../src/gcd/double/integer-gcd';
import { scaleFloatToInt, gcdInt, gcdInts } from '../../../src/index';
import { performance } from 'perf_hooks';


describe('integer gcd', function() {
	it('should calculate the correct integer gcds', 
	function() {
        let a = 1071;
        let b = 462; 

        let vals1: [number, number][] = [
            [a,b],[-a,b],[a,-b],[-a,-b],
            [b,a],[-b,a],[b,-a],[-b,-a],
        ];

        for (let val of vals1) {
            {
                let r = gcdInt(...val);
                expect(r).to.equal(21);
            }
            {
                let r = gcdIntBinary(...val);
                expect(r).to.equal(21);
            }
            {
                let r = gcdInts(val);
                expect(r).to.equal(21);
            }
            {
                let r = gcdIntsTree(val);
                expect(r).to.equal(21);
            }
        }

        let c = 21;
        let d = 7;

        let vals2: number[][] = [
            [a,b,c,d], [d,c,b,a], [d,c,a,b]
        ];

        for (let val of vals2) {
            {
                let r = gcdInts(val);
                expect(r).to.equal(7);
            }
            {
                let r = gcdIntsTree(val);
                expect(r).to.equal(7);
            }
        }


        // get lots of values
        let vals3: number[][] = [];
        for (let i=0; i<1000; i++) {
            let vals: number[] = [];
            for (let i=0; i<9; i++) {
                let v = scaleFloatToInt(Math.random());
                if (Math.random() > 0.5) { v *= 2; }
                vals.push(v);
            }
            vals3.push(vals);
        }

        // Naive === Tree ?
        {
            for (let i=0; i<vals3.length; i++) {
                let v1 = gcdInts(vals3[i]);
                let v2 = gcdIntsTree(vals3[i]);
                expect(v1).to.equal(v2);
            }
        }

        
        // Benchmark - Naive
        {
            let t0 = performance.now();
            for (let i=0; i<vals3.length; i++) {
                let v = gcdInts(vals3[i]);
            }
            let t1 = performance.now();
            //console.log("gcd naive took " + ((t1 - t0)).toFixed(3) + " milliseconds.");
        }


        // Benchmark - Tree
        {
            let t0 = performance.now();
            for (let i=0; i<vals3.length; i++) {
                let v = gcdIntsTree(vals3[i]);
            }
            let t1 = performance.now();
            //console.log("gcd tree took " + ((t1 - t0)).toFixed(3) + " milliseconds.");
        }


        {
            let a = 1072;
            let b = 464; 
            let r = gcdIntBinary(a,b);
            expect(r).to.equal(16);
        }

        {
            let a = 0;
            let b = 464; 
            let r1 = gcdInt(a,b);
            let r2 = gcdInt(b,a);
            let r3 = gcdIntBinary(a,b);
            let r4 = gcdIntBinary(b,a);
            expect(r1).to.equal(b);
            expect(r2).to.equal(b);
            expect(r3).to.equal(b);
            expect(r4).to.equal(b);
        }
	});
});