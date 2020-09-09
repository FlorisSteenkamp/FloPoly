
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { ePremSequencePrimitive } from '../../../src/index';


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
	});
});
