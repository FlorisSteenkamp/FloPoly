
import { expect } from 'chai';
import { describe } from 'mocha';
import { scaleFloatToInt, eGcdInt, eGcdInts } from '../../../src/index.js';
import { performance } from 'perf_hooks';


describe('integer gcd', function() {
	it('should calculate the correct integer gcds of some Shewchuk expansions', 
	function() {
        const a = [1071];
        const b = [462]; 
        const na = [-1071];
        const nb = [-462]; 


        let vals1: [number[], number[]][] = [
            [a,b],[na,b],[a,nb],[na,nb],
            [b,a],[nb,a],[b,na],[nb,na],
        ];

        for (let val of vals1) {
            {
                let r = eGcdInt(...val);
                expect(r).to.eql([21]);
            }
            {
                let r = eGcdInts(val);
                expect(r).to.eql([21]);
            }
        }

        let c = [21];
        let d = [7];

        let vals2: number[][][] = [
            [a,b,c,d], [d,c,b,a], [d,c,a,b]
        ];

        for (let val of vals2) {
            {
                let r = eGcdInts(val);
                expect(r).to.eql([7]);
            }
        }

        {
            let a = [0];
            let b = [464];
            let r1 = eGcdInt(a,b);
            let r2 = eGcdInt(b,a);
            expect(r1).to.deep.equal(b);
            expect(r2).to.deep.equal(b);
        }
	});
});