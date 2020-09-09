
import { expect } from 'chai';
import { describe } from 'mocha';
import { bGcdInt, bGcdInts, scaleFloatToInt } from '../../../src/index';
import { performance } from 'perf_hooks';


describe('integer gcd', function() {
	it('should calculate the correct integer gcds of some bigints', 
	function() {
        let a = 1071n;
        let b = 462n; 

        let vals1: [bigint, bigint][] = [
            [a,b],[-a,b],[a,-b],[-a,-b],
            [b,a],[-b,a],[b,-a],[-b,-a],
        ];

        for (let val of vals1) {
            {
                let r = bGcdInt(...val);
                expect(r).to.equal(21n);
            }
            {
                let r = bGcdInts(val);
                expect(r).to.equal(21n);
            }
        }

        let c = 21n;
        let d = 7n;

        let vals2: bigint[][] = [
            [a,b,c,d], [d,c,b,a], [d,c,a,b]
        ];

        for (let val of vals2) {
            {
                let r = bGcdInts(val);
                expect(r).to.equal(7n);
            }
        }


        // get lots of values
        let vals3: bigint[][] = [];
        for (let i=0; i<1000; i++) {
            let vals: bigint[] = [];
            for (let i=0; i<9; i++) {
                let v = scaleFloatToInt(Math.random());
                if (Math.random() > 0.5) { v *= 2; }
                vals.push(BigInt(v));
            }
            vals3.push(vals);
        }

        // Benchmark - Naive
        {
            let t0 = performance.now();
            for (let i=0; i<vals3.length; i++) {
                let v = bGcdInts(vals3[i]);
            }
            let t1 = performance.now();
            //console.log("gcd naive took " + ((t1 - t0)).toFixed(3) + " milliseconds.");
        }
	});
});