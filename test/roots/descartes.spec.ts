
import { assert, expect } from 'chai';
import 'mocha';
import { sturmChainExact } from '../../src/remainder-sequences/sturm-chain';
import { findBadPoly } from '../helpers/find-bad-poly';
import { numRootsExact } from '../../src/roots/descartes/num-roots';
import { expDescartes, expDescartesFrom0ToA } from '../../src/roots/descartes/descartes';
import { expReflectAboutYAxis } from '../../src/change-variables/reflect-about-y-axis';
//import { allRootsExact } from '../../src';


describe('descartes', function() {
	it('should Descartes', 
	function() {
        {
            // some 9th order polynomial with a double root
            let { p_, p, _roots } = findBadPoly(9, 0, 0.1, 1, 0, 0);
            //p_[9] = [0];

            let upperNumPositiveRoots = expDescartes(p_);
            let upperNumNegativeRoots = expDescartes(expReflectAboutYAxis(p_));
            //let upperNumRoots0toA = expDescartesFrom0ToA(p_, [0.37793475389480585]);
            //let upperNumRoots0toA = expDescartesFrom0ToA(p_, [0.3779347538948059]);
            let upperNumRoots0toA = expDescartesFrom0ToA(p_, [1]);

            //let roots = allRootsExact(p_, [-0.1], [1.1]);
            //console.log('roots ', roots)

            console.log('upperNumRoots0toA', upperNumRoots0toA);
            console.log('upperNumPositiveRoots', upperNumPositiveRoots);
            console.log('upperNumNegativeRoots', upperNumNegativeRoots);
            console.log('_roots', _roots.sort((a,b) => a-b))
            //console.log('p_', p_)
        }
        /*
        {
            let p = [1,1,-1,-1];
            let p_ = p.map(c => [c]);
            let _roots = [-1,-1,+1];
            
            let upperNumPositiveRoots = expDescartes(p_);
            let upperNumNegativeRoots = expDescartes(expReflectAboutYAxis(p_));
            let upperNumRoots0toA = expDescartesFrom0ToA(p_, [1.00000001]);
            expect(upperNumPositiveRoots).to.eql(1);
            expect(upperNumNegativeRoots).to.eql(2);

            //console.log('upperNumRoots0toA', upperNumRoots0toA);
            //console.log('upperNumPositiveRoots', upperNumPositiveRoots);
            //console.log('upperNumNegativeRoots', upperNumNegativeRoots);
            //console.log('_roots', _roots)
            //console.log('p_', p_)
        }
        */
    });
});

