
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bPdivTrivial } from '../../../src/index';


describe('bPdivTrivial', function() {
	it('should correctly do trivial pseudo division of two polynomials (with bigint coefficients) by keeping coefficients in ℤ',
	function() {
        {
            const ps = [
                [1n,7n,6n],     // 0
                [1n,-5n,-6n],   // 1
                [1n,6n],        // 2
                [1n,-6n],       // 3
                [1n,1n],        // 4
                [1n,7n,6n,4n],  // 5
                [-1n,6n],       // 6
                [-1n,-6n],      // 7
            ];

            {
                let r = bPdivTrivial(ps[0], ps[2]);  
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n], r: [] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }
            {
                let r = bPdivTrivial(ps[2], ps[0]);  
                let expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[2] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }


            {
                let r = bPdivTrivial(ps[0], ps[4]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n,6n], r: [] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }
            {
                let r = bPdivTrivial(ps[4], ps[0]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[4] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }


            {
                let r = bPdivTrivial(ps[1], ps[3]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n], r: [] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }
            {
                let r = bPdivTrivial(ps[3], ps[1]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[3] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }


            {
                let r = bPdivTrivial(ps[1], ps[4]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n,-6n], r: [] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }
            {
                let r = bPdivTrivial(ps[4], ps[1]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[4] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }


            {
                let r = bPdivTrivial(ps[2], ps[5]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[2] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }


            // test positiveMultiplier parameter
            {
                let r = bPdivTrivial(ps[6], ps[7], false);
                let expected: { q: bigint[]; r: bigint[] } = { q: [-1n], r: [-12n] };
                expect(r).to.deep.equal(expected, `result: ${r}, expected: ${expected}`);
            }
            {
                let r = bPdivTrivial(ps[7], ps[6], false);
                let expected: { q: bigint[]; r: bigint[] } = { q: [-1n], r: [12n] };
                expect(r).to.deep.equal(expected, `result: ${r}, expected: ${expected}`);
            }
            {
                let r = bPdivTrivial(ps[6], ps[7], true);
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n], r: [12n] };
                expect(r).to.deep.equal(expected, `result: ${r}, expected: ${expected}`);
            }
            {
                let r = bPdivTrivial(ps[7], ps[6], true);
                let expected: { q: bigint[]; r: bigint[] } = { q: [1n], r: [-12n] };
                expect(r).to.deep.equal(expected, `result: ${r}, expected: ${expected}`);
            }
        }
        {
            const ps = [
                [1n,0n,1n,0n,-3n,-3n,8n,2n,-5n],
                [3n,0n,5n,0n,-4n,-9n,21n]
            ];

            {
                let r = bPdivTrivial(ps[0], ps[1]);
                let expected: { q: bigint[]; r: bigint[] } = { q: [9n,0n,-6n], r: [-15n,0n,3n,0n,-9n] };
                expect(r).to.deep.equal(
                    expected,
                    `result: ${r}, expected: ${expected}`
                );
            }
        }
        {
            let a = [1n, -2n, 0n, -4n];
            let b = [1n, -3n];
            let r = bPdivTrivial(a,b);
            let expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n,3n], r: [5n] };
            expect(r).to.eql(
                expected,
                `result: ${r}, expected: ${expected}`
            );
        }
        {
            let a = [10000000000n, 100000n];
            let b = [10000000000n, 100000n];
            let r = bPdivTrivial(a,b);
            let expected: { q: bigint[]; r: bigint[] } = { q: [10000000000n], r: [] };
            expect(r).to.eql(
                expected,
                `result: ${r}, expected: ${expected}`
            );
        }
        {
            let a = [1n, -3n];
            let b = [5n];
            let r = bPdivTrivial(a,b);
            let expected: { q: bigint[]; r: bigint[] } = { q: [5n,-15n], r: [] };
            expect(r).to.eql(
                expected,
                `result: ${r}, expected: ${expected}`
            );
        }
	});
});
