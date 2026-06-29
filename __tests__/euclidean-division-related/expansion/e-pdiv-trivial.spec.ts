import { describe, expect, it } from '@jest/globals';
import { ePdivTrivial } from '../../../src/euclidean-division-related/expansion/e-pdiv-trivial.js';


describe('ePdivTrivial', function() {
    it('should correctly perform pseudo division on some polynomials with coefficents given as Shewchuk expansions', 
    function() {
        {
            const ps = [
                [[1],[7],[6]],      // 0
                [[1],[-5],[-6]],    // 1
                [[1],[6]],          // 2
                [[1],[-6]],         // 3
                [[1],[1]],          // 4
                [[1],[7],[6],[4]],  // 5
                [[-1],[6]],         // 6
                [[-1],[-6]],        // 7
            ];

            {
                let r = ePdivTrivial(ps[0], ps[2]);
                let expected: { q: number[][]; r: number[][] } = { q: [[1],[1]], r: [] };
                expect(r).toEqual(expected);
            }
            {
                let r = ePdivTrivial(ps[2], ps[0]);
                let expected: { q: number[][]; r: number[][] } = { q: [], r: ps[2] };
                expect(r).toEqual(expected);
            }


            {
                let r = ePdivTrivial(ps[0], ps[4]);
                let expected: { q: number[][]; r: number[][] } = { q: [[1],[6]], r: [] };
                expect(r).toEqual(expected);
            }


            {
                let r = ePdivTrivial(ps[1], ps[3]);
                let expected: { q: number[][]; r: number[][] } = { q: [[1],[1]], r: [] };
                expect(r).toEqual(expected);
            }


            {
                let r = ePdivTrivial(ps[1], ps[4]);
                let expected: { q: number[][]; r: number[][] } = { q: [[1],[-6]], r: [] };
                expect(r).toEqual(expected);
            }


            {
                let r = ePdivTrivial(ps[2], ps[5]);
                let expected: { q: number[][]; r: number[][] } = { q: [], r: ps[2] };
                expect(r).toEqual(expected);
            }


            // test positiveMultiplier parameter
            {
                let r = ePdivTrivial(ps[6], ps[7], false);
                let expected: { q: number[][]; r: number[][] } = { q: [[-1]], r: [[-12]] };
                expect(r).toEqual(expected);
            }
            {
                let r = ePdivTrivial(ps[7], ps[6], false);
                let expected: { q: number[][]; r: number[][] } = { q: [[-1]], r: [[12]] };
                expect(r).toEqual(expected);
            }
            {
                let r = ePdivTrivial(ps[6], ps[7], true);
                let expected: { q: number[][]; r: number[][] } = { q: [[1]], r: [[12]] };
                expect(r).toEqual(expected);
            }
            {
                let r = ePdivTrivial(ps[7], ps[6], true);
                let expected: { q: number[][]; r: number[][] } = { q: [[1]], r: [[-12]] };
                expect(r).toEqual(expected);
            }
        }

        {
            const ps = [
                [[1],[0],[1],[0],[-3],[-3],[8],[2],[-5]],
                [[3],[0],[5],[0],[-4],[-9],[21]]
            ];

            {
                let r = ePdivTrivial(ps[0], ps[1]);
                expect(r).toEqual({ q: [[9],[0],[-6]], r: [[-15],[0],[3],[0],[-9]] });
            }
        }

        {
            let a = [[1], [-2], [0], [-4]];
            let b = [[1], [-3]];
            
            expect(ePdivTrivial(a,b,false)).toEqual(
                { q: [[1],[1],[3]], r: [[5]] }
            );
        }
        
        {
            let a = [[1e10], [1e5]];
            let b = [[1e10], [1e5]];
            
            expect(ePdivTrivial(a,b,false)).toEqual(
                { q: [[10000000000]], r: [] }
            );
        }
        {
            let a = [[1], [-3]];
            let b = [[5]];
            
            expect(ePdivTrivial(a,b,false)).toEqual(
                { q: [[5],[-15]], r: [] }
            );
        }
    });
});
