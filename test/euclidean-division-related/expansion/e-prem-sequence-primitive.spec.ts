
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { multiply, ePremSequencePrimitive } from '../../../src/index';


describe('ePremSequencePrimitive', function() {
	it('should correctly calculate the primitive pseudo remainder sequence of two polynomials (with Shewchuk expansion coefficients)', 
	function() {
        {
            const ps = [
                [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]],
                [[3], [0], [5], [0], [-4], [-9], [21]]
            ];

            {
                let r = ePremSequencePrimitive(ps[0], ps[1]);
                expect(r).to.deep.equal([
                    [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]],
                    [[3], [0], [5], [0], [-4], [-9], [21]],
                    [[5], [0], [-1], [0], [3]],
                    [[13], [25], [-49]],
                    [[4663], [-6150]],
                    [[1]]
                ]);
            }
        }


        {
            let p1 = [2,-3,6,5,-130];
            let p2 = [3,4,-2];
            let p = multiply(p1,p2);

            let r = ePremSequencePrimitive(p.map(c => [c]), p2.map(c => [c]));

            expect(r).to.deep.equal([
                [[6], [-1], [2], [45], [-382], [-530], [260]],
                [[3], [4], [-2]]
            ]);
        }
	});
});
