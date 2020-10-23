
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { allRootsCertifiedSimplified } from '../../../src/index';


describe('allRootsCertifiedSimplified - find all roots within an interval of a polynomial such that all roots are guaranteed to be captured in some interval', 
function() {
	it('should find roots correctly',
	function() {
		const p = [
            3.033321234234234,
            31.78342995971597,
            -115.09145437671532,
            -48.18962838294827,
            241.04136127393173,
            -26.63962334942254,
            -81.82713958224285,
            13.96128683321424,
            7.3963444329341455,
            -1.50733058206533,
            -0.0015147128834111722
        ];
        //console.log(toCasStr(p))
        // => 3.033321234234234*x^10 + 31.78342995971597*x^9 - 115.09145437671532*x^8 - 
        //    48.18962838294827*x^7 + 241.04136127393173*x^6 - 26.63962334942254*x^5 - 
        //    81.82713958224285*x^4 + 13.96128683321424*x^3 + 7.3963444329341455*x^2 - 
        //    1.50733058206533*x - 0.0015147128834111722
        const roots = allRootsCertifiedSimplified(p);
        expect(roots).to.eql([
           { tS: -13.222221, tE: -13.222220999999996, multiplicity: 1 },
           { tS: -1.3498348570000003, tE: -1.3498348569999998, multiplicity: 1 },
           { tS: -0.4444777699999987, tE: -0.4444777699999985, multiplicity: 1 },
           { tS: -0.43554300000000135, tE: -0.4355430000000011, multiplicity: 1 },
           { tS: -0.001000000000000222, tE: -0.001, multiplicity: 1 },
           { tS: 0.22999999999999984, tE: 0.23000000000000007, multiplicity: 1 },
           { tS: 0.345347, tE: 0.34534700000000024, multiplicity: 1 },
           { tS: 0.5429999999999989, tE: 0.5429999999999993, multiplicity: 1 },
           { tS: 1.3221000000000016, tE: 1.322100000000002, multiplicity: 1 },
           { tS: 2.534533999999997, tE: 2.534533999999998, multiplicity: 1 }
        ]);
	});
});
