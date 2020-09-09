
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { ePdivTrivial } from '../../../src/euclidean-division-related/expansion/e-pdiv-trivial';


describe('ePdivTrivial', function() {
	it('should correctly perform pseudo division on some polynomials with coefficents given as Shewchuk expansions', 
	function() {
        {
            const ps = [
                [[1],[7],[6]],
                [[1],[-5],[-6]],
                [[1],[6]],
                [[1],[-6]],
                [[1],[1]]
            ];

            {
                let r = ePdivTrivial(ps[0], ps[2]);  
                expect(r).to.deep.equal({ q: [[1],[1]], r: [] });
            }
            {
                let r = ePdivTrivial(ps[0], ps[4]);
                expect(r).to.deep.equal({ q: [[1],[6]], r: [] });
            }

            {
                let r = ePdivTrivial(ps[1], ps[3]);
                expect(r).to.deep.equal({ q: [[1],[1]], r: [] });
            }

            {
                let r = ePdivTrivial(ps[1], ps[4]);
                expect(r).to.deep.equal({ q: [[1],[-6]], r: [] });
            }
        }

        {
            const ps = [
                [[1],[0],[1],[0],[-3],[-3],[8],[2],[-5]],
                [[3],[0],[5],[0],[-4],[-9],[21]]
            ];

            {
                let r = ePdivTrivial(ps[0], ps[1]);
                expect(r).to.deep.equal({ q: [[9],[0],[-6]], r: [[-15],[0],[3],[0],[-9]] });
            }
        }

        {
            let a = [[1], [-2], [0], [-4]];
            let b = [[1], [-3]];
            
            expect(ePdivTrivial(a,b,false)).to.eql(
                { q: [[1],[1],[3]], r: [[5]] }
            );
        }
        
        {
            let a = [[1e10], [1e5]];
            let b = [[1e10], [1e5]];
            
            expect(ePdivTrivial(a,b,false)).to.eql(
                { q: [[10000000000]], r: [] }
            );
        }
        {
            let a = [[1], [-3]];
            let b = [[5]];
            
            expect(ePdivTrivial(a,b,false)).to.eql(
                { q: [[5],[-15]], r: [] }
            );
        }
    });
});
