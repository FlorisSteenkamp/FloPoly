import { describe, expect, it } from '@jest/globals';
import { testIt_General } from './test-it-general.js';
import { testIt_Mignotte } from './test-it-mignotte.js';


describe('find all roots benchmark; allRootsCertified vs Descartes', 
function() {
    it('should find roots correctly, and fast',
    function() {
        testIt_General(true);  // log results
        // testIt_General(false);   // don't log results

        // testIt_Mignotte(true);  // log results
    });
});

