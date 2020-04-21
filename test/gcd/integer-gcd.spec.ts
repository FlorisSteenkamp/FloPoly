
import { expect } from 'chai';
import { describe } from 'mocha';
import { gcdInt, gcdIntBinary, gcdInts, gcdIntsTree } from '../../src/gcd/integer-gcd';
import { scaleFloatToInt } from '../../src/scale-to-int/scale-float-to-int';
import { performance } from 'perf_hooks';


describe('integer gcd', function() {
	it('should report the correct integer gcds', 
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


        let vals3: number[][] = [];
        for (let i=0; i<1000; i++) {
            let vals = [];
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
                //if (v1 !== 1 && v1 !== 2 && v1 !== 3) { console.log(v1,v2); }
            }
        }

        
        // Naive
        {
            let t0 = performance.now();
            for (let i=0; i<vals3.length; i++) {
                let v = gcdInts(vals3[i]);
                //if (v !== 1) { console.log(v); }
            }
            let t1 = performance.now();
            //console.log("gcd naive took " + ((t1 - t0)/1).toFixed(3) + " milliseconds.");
        }


        // Tree
        {
            let t0 = performance.now();
            for (let i=0; i<vals3.length; i++) {
                let v = gcdIntsTree(vals3[i]);
                //if (v !== 1) { console.log(v); }
            }
            let t1 = performance.now();
            //console.log("gcd tree took " + ((t1 - t0)/1).toFixed(3) + " milliseconds.");
        }
	});
});