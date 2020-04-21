
import { expect } from 'chai';
import { describe } from 'mocha';
import { getPrimitivePart } from '../../src/gcd/get-primitive-part';


describe('get polynomial\'s primitive part', function() {
	it('should report the polynomial\'s primitive part', 
	function() {
        {
            let p = [-10,5,5];
            let r = getPrimitivePart(p);
            expect(r).to.deep.equal([2,-1,-1]);
        }

        {
            let p = [10,5,5,2,2,2];
            let r = getPrimitivePart(p);
            expect(r).to.deep.equal([10,5,5,2,2,2]);
        }

        {
            let p = [10,5,5,5,5,15];
            let r = getPrimitivePart(p);
            expect(r).to.deep.equal([2,1,1,1,1,3]);
        }
    })
});