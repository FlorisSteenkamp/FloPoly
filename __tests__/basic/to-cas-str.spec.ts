import { describe, expect, it } from '@jest/globals';

import { toCasStr } from '../../src/basic/to-cas-str.js';


describe('toCasStr', function() {
    const casStr1 = " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1";
    const casStr2 = " - 5*x^4 + 4*x^3 - 3*x^2 + 2*x + 1";
    it('should correctly transform some polynomials into a human/CAS readable form (double precision coefficients)', 
    function() {
        let p1 = [5,4,3,2,1];
        let p2 = [-5,4,-3,2,1];
        expect(toCasStr(p1)).toEqual(casStr1); 
        expect(toCasStr(p2)).toEqual(casStr2); 


        // (large integral doubles are printed exactly)
        const casStr3 = ' + 23333333331231288974114816*x + 31496033330495932076130304';
        const casStr4 = ' - 23333333331231288974114816*x + 31496033330495932076130304';
        let p3 = [23333333331231290809823333.342, 3.149603333049593e+25]
        let p4 = [-23333333331231290809823333.342, 3.149603333049593e+25]
        expect(toCasStr(p3)).toEqual(casStr3);
        expect(toCasStr(p4)).toEqual(casStr4);


        // (tiny non-integers are printed with the shortest round-trip digits)
        const casStr5 = ' + 0.0000000000000000000000000578498571480687*x + 0.00000000000000000000000007138672372071678';
        const casStr6 = ' - 0.0000000000000000000000000578498571480687*x - 0.00000000000000000000000007138672372071678';
        let p5 = [5.78498571480687e-26, 7.138672372071678e-26]
        let p6 = [-5.78498571480687e-26, -7.138672372071678e-26]
        expect(toCasStr(p5)).toEqual(casStr5);
        expect(toCasStr(p6)).toEqual(casStr6);
    });

    it('should print integers exactly and non-integers round-trip exact (never in exponential notation)',
    function() {
        // Regression: integers >= 2^53 and tiny values were rounded / mangled
        expect(toCasStr([2**80, 1e-7])).toEqual(' + 1208925819614629174706176*x + 0.0000001');
        expect(toCasStr([1e21, -1e-7])).toEqual(' + 1000000000000000000000*x - 0.0000001');
        expect(toCasStr([0.1, 123.456, 1e-300])).toEqual(' + 0.1*x^2 + 123.456*x + 0.' + '0'.repeat(299) + '1');
        expect(toCasStr([Number.MAX_VALUE])).toEqual(' + ' + BigInt(Number.MAX_VALUE).toString());
        // round trip
        for (const v of [5.78498571480687e-26, 1e-7, 123.456, 2**80 + 2**30, 1.7976931348623157e308, 5e-324]) {
            const s = toCasStr([v]).slice(3);
            expect(parseFloat(s)).toEqual(v);
            expect(s.includes('e')).toBe(false);
        }
        // expansions with integer components are printed exactly
        expect(toCasStr([[1, 2**80]])).toEqual(' + 1208925819614629174706177');
        expect(toCasStr([[1, 2**80], [-3, -(2**70)]])).toEqual(' + 1208925819614629174706177*x - 1180591620717411303427');
        // ...other expansions are estimated
        expect(toCasStr([[0.5, 2**80]])).toEqual(' + 1208925819614629174706176');
    });

    it('should correctly transform some polynomials into a human/CAS readable form (expansion precision coefficients)', 
    function() {
        let p1 = [[5],[4],[3],[2],[1]];
        let p2 = [[-5],[4],[-3],[2],[1]];
        
        expect(toCasStr(p1)).toEqual(casStr1);
        expect(toCasStr(p2)).toEqual(casStr2);
    });

    it('should correctly transform some polynomials into a human/CAS readable form (bigint coefficients)', 
    function() {
        let p1 = [5n,4n,3n,2n,1n];
        let p2 = [-5n,4n,-3n,2n,1n];
        
        expect(toCasStr(p1)).toEqual(casStr1); 
        expect(toCasStr(p2)).toEqual(casStr2); 
    });
    
});