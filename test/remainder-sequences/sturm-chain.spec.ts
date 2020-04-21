
import { scaleFloatsToInts } from '../../src/index';
import { assert, expect } from 'chai';
import 'mocha';
import { sturmChainExact } from '../../src/remainder-sequences/sturm-chain';
import { findBadPoly } from '../helpers/find-bad-poly';
import { numRootsExact, numRootsInRangeExact } from '../../src/roots/descartes/num-roots';


describe('pseudo remainder sequence', function() {/*
	it('should calculate the pseudo remainder sequence correctly', 
	function() {
        /*
        {
            // This is the Wikipedia (and paper) example
            // a = x^8 + x^6 - 3x^4 - 3x^3 + 8x^2 + 2x - 5
            let a = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            let seq = sturmChainExact(a);
            expect(seq).to.eql([
                [[1],[0],[1],[0],[-3],[-3],[8],[2],[-5]],
                [[8],[0],[6],[0],[-12],[-9],[16],[2]],
                [[-16],[-0],[96],[120],[-384],[-112],[320]],
                [[-216],[-240],[816],[260],[-704],[-8]],
                [[-2880],[-30600],[56580],[30864],[-58200]],
                [[4491000],[-6811980],[-4566000],[7384200]],
                [[-1487162545],[-114239000],[1712340550]],
                [[-126627790896],[93912590625]],
                [[-5869831203567]]
            ]);
        }
        *//*
        {
            // some 9th order polynomial
            let { p_, p, _roots } = findBadPoly(9, 0, 0.1, 1, 0, 0);
            let seq = sturmChainExact(p_);
            let rootCount = numRootsExact(p_);

            console.log('_roots', _roots)
            //console.log('p_', p_)
            console.log('seq', seq)
            //console.log('rootcount', rootCount)

            //console.log(numRootsInRangeExact(p_, [-2], [2]))
            //console.log(numRootsInRangeExact(p_, [0.6625054487958549], [0.662505448795855]))
            //console.log(numRootsInRangeExact(p_, [0.662505448795855], [0.6625054487958552]))

            // not working due to overflow
            //let _pp = scaleFloatsToInts(p);
            //let pp = _pp.map(c => [c]);
            //let pp = p.map(c => [c]);
            //let seq = sturmChainExact(pp);
        }
        /*
        {
            let p = [1,1,-1,-1];
            let p_ = p.map(c => [c]);
            let _roots = [-1,-1,+1];
            
            let seq = sturmChainExact(p_);
            let rootCount = numRootsExact(p_);

            console.log('_roots', _roots)
            console.log('p_', p_)
            console.log('seq', seq)
            console.log('rootcount', rootCount)
        }
        *//*
    });*/
});

