

import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { prem } from '../../src/remainder-sequences/pseudo-remainder';
import { 
    subresultantPseudoRemainderSequence
} from '../../src/remainder-sequences/subresultant-pseudo-remainder-sequence';
import { 
    trivialPseudoRemainderSequence
} from '../../src/remainder-sequences/trivial-pseudo-remainder-sequence';
import { sturmChainExact } from '../../src/remainder-sequences/sturm-chain';


describe('pseudo remainder sequence', function() {/*
	it('should calculate the trivial pseudo remainder sequence correctly', 
	function() {
        {
            // This is the Wikipedia (and paper) example
            let a = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            let b = [[3], [0], [5], [0], [-4], [-9], [21]];
            
            let seq = trivialPseudoRemainderSequence(a,b);
            expect(seq).to.eql([
                [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]],
                [[3], [0], [5], [0], [-4], [-9], [21]],
                [[-15], [-0], [3], [0], [-9]],
                [[15795], [30375], [-59535]],
                [[1254542875143750], [-1654608338437500]],
                [[-20, -1086681787637955000, 1.2593338795500744e+34]]
            ]);
        }
    });*/
});

