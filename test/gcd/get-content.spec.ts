
import { expect } from 'chai';
import { describe } from 'mocha';
import { getContent } from '../../src/gcd/get-content';


describe('get polynomial\'s content', function() {
	it('should report the polynomial\'s content', 
	function() {
        {
            let p = [-10,5,5];
            let r = getContent(p);
            expect(r).to.equal(-5);
        }

        {
            let p = [10,5,5,2,2,2];
            let r = getContent(p);
            expect(r).to.equal(1);
        }
    })
});