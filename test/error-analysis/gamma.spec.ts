

import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { γ, γγ } from '../../src/index';


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


        assert(γ1 > u*(1 - eps*2));
        assert(γ1 < u*(1 + eps*2));
        assert(γ5 > 5*u*(1 - eps*5));
        assert(γ5 < 5*u*(1 + eps*5));
        assert(γ500 > 500*u*(1 - eps*500));
        assert(γ500 < 500*u*(1 + eps*500));

        assert(γγ1 > uu*(1 - eps*2));
        assert(γγ1 < uu*(1 + eps*2));
        assert(γγ5 > 5*uu*(1 - eps*5));
        assert(γγ5 < 5*uu*(1 + eps*5));
        assert(γγ500 > 500*uu*(1 - eps*500));
        assert(γγ500 < 500*uu*(1 + eps*500));
	});
});
