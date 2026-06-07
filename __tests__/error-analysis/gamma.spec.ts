import { describe, expect, it } from '@jest/globals';


import { γ, γγ } from '../../src/error-analysis/gamma.js';


const eps = Number.EPSILON;
const u = eps/2;
const uu = u*u;


describe('γ error function', function() {
	it('should correctly calculate the γ and γ squared errors for some positive integers', 
	function() {
        const γ1 = γ(1);
        const γ5 = γ(5);
        const γ500 = γ(500);

        const γγ1 = γγ(1);
        const γγ5 = γγ(5);
        const γγ500 = γγ(500);


        //console.log(γ1, u*(1 - eps*2));
        //console.log(γ1, u*(1 + eps*2));
        //console.log(γ5, 5*u*(1 - eps*5));
        //console.log(γ5, 5*u*(1 + eps*5));
        //console.log(γ500, 500*u*(1 - eps*500));
        //console.log(γ500, 500*u*(1 + eps*500));

        //console.log(γγ1, uu*(1 - eps*2));
        //console.log(γγ1, uu*(1 + eps*2));
        //console.log(γγ5, 5*uu*(1 - eps*5));
        //console.log(γγ5, 5*uu*(1 + eps*5));
        //console.log(γγ500, 500*uu*(1 - eps*500));
        //console.log(γγ500, 500*uu*(1 + eps*500));


        expect(γ1 > u*(1 - eps*2)).toBeTruthy();
        expect(γ1 < u*(1 + eps*2)).toBeTruthy();
        expect(γ5 > 5*u*(1 - eps*5)).toBeTruthy();
        expect(γ5 < 5*u*(1 + eps*5)).toBeTruthy();
        expect(γ500 > 500*u*(1 - eps*500)).toBeTruthy();
        expect(γ500 < 500*u*(1 + eps*500)).toBeTruthy();

        expect(γγ1 > uu*(1 - eps*2)).toBeTruthy();
        expect(γγ1 < uu*(1 + eps*2)).toBeTruthy();
        expect(γγ5 > 5*uu*(1 - eps*5)).toBeTruthy();
        expect(γγ5 < 5*uu*(1 + eps*5)).toBeTruthy();
        expect(γγ500 > 500*uu*(1 - eps*500)).toBeTruthy();
        expect(γγ500 < 500*uu*(1 + eps*500)).toBeTruthy();
	});
});
